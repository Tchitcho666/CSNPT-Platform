'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useSyncExternalStore,
} from 'react';

import type * as Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, useReducedMotion } from 'framer-motion';
import Supercluster from 'supercluster';
import type { Feature, Point } from 'geojson';
import { toPng } from 'html-to-image';

import {
  Lang,
  PublicPractitioner,
} from '@/lib/types';

declare global {
  interface Window {
    L: typeof import('leaflet');
  }
}

interface ObservatoryMapProps {
  currentLang?: Lang;
  searchQuery?: string;
  practitioners: PublicPractitioner[];
}

type MapPointProperties = Pick<PublicPractitioner, 'id' | 'name' | 'roleOrSpecialty' | 'city' | 'governorate'>;
type PublicMapPoint = PublicPractitioner & { approximateCoordinates?: { lat: number; lng: number } };

function subscribeToSensoryMode(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-sensory-mode', 'data-calm'],
  });
  return () => observer.disconnect();
}

function getCalmModeSnapshot() {
  return document.documentElement.dataset.sensoryMode === 'calm' ||
    document.documentElement.dataset.calm === 'true';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] ?? character);
}

export default function ObservatoryMap({
  currentLang = 'fr',
  searchQuery = '',
  practitioners,
}: ObservatoryMapProps) {
  const prefersReducedMotion = useReducedMotion();
  const isRtl = currentLang === 'ar';
  const calmMode = useSyncExternalStore(subscribeToSensoryMode, getCalmModeSnapshot, () => false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState(false);
  const animationsDisabled = Boolean(prefersReducedMotion) || calmMode;
  const zoomLabels = {
    fr: { group: 'Commandes de zoom de la carte', in: 'Agrandir la carte', out: 'Réduire la carte' },
    ar: { group: 'تحكم في تكبير الخريطة', in: 'تكبير الخريطة', out: 'تصغير الخريطة' },
    en: { group: 'Map zoom controls', in: 'Zoom in', out: 'Zoom out' },
  }[currentLang];
  const mapLabels = {
    fr: { governorates: 'Filtrer par gouvernorat', all: 'Tous les gouvernorats', map: 'Carte interactive des praticiens', loading: 'Chargement de la carte…' },
    ar: { governorates: 'التصفية حسب الولاية', all: 'جميع الولايات', map: 'خريطة تفاعلية للمهنيين', loading: 'جارٍ تحميل الخريطة…' },
    en: { governorates: 'Filter by governorate', all: 'All governorates', map: 'Interactive practitioner map', loading: 'Loading map…' },
  }[currentLang];
  const shareLabels = {
    fr: { button: 'Partager l’impact', busy: 'Préparation…', error: 'La capture de la carte a échoué.', profile: 'Voir la fiche' },
    ar: { button: 'مشاركة الأثر', busy: 'جارٍ التحضير…', error: 'تعذر التقاط صورة الخريطة.', profile: 'عرض الملف' },
    en: { button: 'Share the impact', busy: 'Preparing…', error: 'The map capture failed.', profile: 'View profile' },
  }[currentLang];
  const governorateName = (value: string) => {
    if (value === 'ariana') return currentLang === 'ar' ? 'أريانة' : 'Ariana';
    return value.charAt(0).toLocaleUpperCase(currentLang) + value.slice(1);
  };

  const [selectedGovernorate, setSelectedGovernorate] = useState(() =>
    typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('gov') ?? '',
  );

  const [selectedId, setSelectedId] =
    useState<string>(
      practitioners[0]?.id || ''
    );

  const [isMapReady, setIsMapReady] =
    useState(false);

  const mapContainerRef =
    useRef<HTMLDivElement>(null);

  const captureContainerRef = useRef<HTMLDivElement>(null);

  const mapInstanceRef =
    useRef<Leaflet.Map | null>(null);

  const clusterLayerRef = useRef<Leaflet.LayerGroup | null>(null);

  const mapInitializedRef =
    useRef(false);

  /*
   * Normalize search
   */
  const normalizeText = (
    value: string
  ) => {
    return value
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(
        /[\u0300-\u036f]/g,
        ''
      )
      .trim();
  };

  /*
   * FILTER
   */
  const filteredEntities = useMemo(() => {
    const query =
      normalizeText(searchQuery);

    return practitioners.filter(
      (entity) => {
        const matchesGovernorate =
          !selectedGovernorate || entity.governorate === selectedGovernorate;

        if (!matchesGovernorate) {
          return false;
        }

        if (!query) {
          return true;
        }

        const searchableValues = [
          entity.name,
          entity.roleOrSpecialty.fr,
          entity.roleOrSpecialty.ar,
          entity.roleOrSpecialty.en,

          entity.city.fr,
          entity.city.ar,
          entity.city.en,
        ];

        return searchableValues.some(
          (value) =>
            normalizeText(value).includes(
              query
            )
        );
      }
    );
  }, [
    selectedGovernorate,
    searchQuery,
    practitioners,
  ]);

  const clusterIndex = useMemo(() => {
    const features: Feature<Point, MapPointProperties>[] = (filteredEntities as PublicMapPoint[])
      .flatMap((entity) => {
        const coordinates = entity.approximateCoordinates;
        if (!coordinates || !Number.isFinite(coordinates.lat) || !Number.isFinite(coordinates.lng)) return [];
        if (coordinates.lat < 30 || coordinates.lat > 38 || coordinates.lng < 7 || coordinates.lng > 12) return [];
        return [{
          type: 'Feature' as const,
          geometry: { type: 'Point' as const, coordinates: [coordinates.lng, coordinates.lat] as [number, number] },
          properties: {
            id: entity.id,
            name: entity.name,
            roleOrSpecialty: entity.roleOrSpecialty,
            city: entity.city,
            governorate: entity.governorate,
          },
        }];
      });
    return new Supercluster<MapPointProperties>({ radius: 60, maxZoom: 16 }).load(features);
  }, [filteredEntities]);

  /*
   * Keep selected entity valid
   */
  useEffect(() => {
    if (
      filteredEntities.length === 0
    ) {
      // Clear the selected record when filters produce no results.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId('');
      return;
    }

    const exists =
      filteredEntities.some(
        (entity) =>
          entity.id === selectedId
      );

    if (!exists) {
      setSelectedId(
        filteredEntities[0].id
      );
    }
  }, [
    filteredEntities,
    selectedId,
  ]);

  /*
   * Active entity
   */
  const activeEntity =
    useMemo(() => {
      return (
        filteredEntities.find(
          (entity) =>
            entity.id === selectedId
        ) ||
        filteredEntities[0]
      );
    }, [
      filteredEntities,
      selectedId,
    ]);

  /*
   * LEAFLET INITIALIZATION
   */
  useEffect(() => {
    let cancelled = false;

    const initializeMap = () => {
      if (cancelled) {
        return;
      }

      if (!mapContainerRef.current) {
        return;
      }

      if (!window.L) {
        return;
      }

      /*
       * Prevent duplicate map initialization
       */
      if (mapInitializedRef.current) {
        return;
      }

      mapInitializedRef.current = true;

      /*
       * Create map
       */
      const map = window.L.map(
        mapContainerRef.current,
        {
          center: [34.0, 9.0],
          zoom: 6,
          maxBounds: [
            [30.0, 7.0],
            [38.0, 12.0],
          ],
          maxBoundsViscosity: 1.0,
          zoomControl: false,

          scrollWheelZoom: false,

          attributionControl: true,
        }
      );

      /*
       * OpenStreetMap
       */
      const tileLayer =
        window.L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '&copy; OpenStreetMap contributors',

            maxZoom: 19,

            minZoom: 5,

            crossOrigin: true,

            updateWhenIdle: true,

            keepBuffer: 2,
          }
        );

      tileLayer.addTo(map);

      clusterLayerRef.current = window.L.layerGroup().addTo(map);

      /*
       * Save instance
       */
      mapInstanceRef.current =
        map;

      /*
       * Tell React map is ready
       */
      setIsMapReady(true);

      /*
       * Important:
       * Leaflet sometimes calculates the
       * container dimensions before the
       * browser finishes painting.
       */
      setTimeout(() => {
        if (
          !cancelled &&
          mapInstanceRef.current
        ) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 150);

      setTimeout(() => {
        if (
          !cancelled &&
          mapInstanceRef.current
        ) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 500);
    };

    /*
     * Load Leaflet JS
     */
    const loadLeafletJs = () => {
      /*
       * Already loaded
       */
      if (window.L) {
        initializeMap();
        return;
      }

      /*
       * Script already exists
       */
      const existingScript =
        document.getElementById(
          'leaflet-js'
        ) as HTMLScriptElement | null;

      if (existingScript) {
        existingScript.addEventListener(
          'load',
          initializeMap
        );

        /*
         * Safety fallback in case
         * the script loaded before
         * listener was attached.
         */
        const checkInterval =
          window.setInterval(() => {
            if (
              window.L
            ) {
              window.clearInterval(
                checkInterval
              );

              initializeMap();
            }
          }, 100);

        return;
      }

      /*
       * Create script
       */
      const script =
        document.createElement(
          'script'
        );

      script.id =
        'leaflet-js';

      script.src =
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

      script.async = true;

      script.onload =
        initializeMap;

      document.body.appendChild(
        script
      );
    };

    loadLeafletJs();

    /*
     * Cleanup
     */
    return () => {
      cancelled = true;

      if (
        mapInstanceRef.current
      ) {
        mapInstanceRef.current.remove();

        mapInstanceRef.current =
          null;
      }
      clusterLayerRef.current = null;

      mapInitializedRef.current =
        false;

      setIsMapReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const markerLayer = clusterLayerRef.current;
    if (!isMapReady || !map || !markerLayer || !window.L) return;

    const renderClusters = () => {
      markerLayer.clearLayers();
      const bounds = map.getBounds();
      const visible = clusterIndex.getClusters(
        [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
        Math.round(map.getZoom()),
      );

      visible.forEach((feature) => {
        const [lng, lat] = feature.geometry.coordinates;
        const properties = feature.properties;
        if (!properties) return;
        const staticClass = animationsDisabled ? ' is-static' : '';

        if ('cluster' in properties && properties.cluster) {
          const count = properties.point_count_abbreviated;
          const icon = window.L.divIcon({
            className: 'csnpt-cluster-icon',
            html: `<span class="csnpt-map-cluster${staticClass}">${count}</span>`,
            iconSize: [42, 42],
            iconAnchor: [21, 21],
          });
          window.L.marker([lat, lng], {
            icon,
            title: `${properties.point_count} ${currentLang === 'fr' ? 'praticiens' : currentLang === 'ar' ? 'مهنيون' : 'practitioners'}`,
          })
            .on('click', () => {
              const nextZoom = clusterIndex.getClusterExpansionZoom(properties.cluster_id);
              map.setView([lat, lng], nextZoom, { animate: !animationsDisabled });
            })
            .addTo(markerLayer);
          return;
        }

        const icon = window.L.divIcon({
          className: 'csnpt-practitioner-icon',
          html: `<span class="csnpt-map-marker${staticClass}"><span></span></span>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });
        const profile = properties as MapPointProperties;
        const city = profile.city[currentLang] || profile.city.fr;
        const specialty = profile.roleOrSpecialty[currentLang] || profile.roleOrSpecialty.fr;
        const popup = `<article class="csnpt-map-popup"><strong>${escapeHtml(profile.name)}</strong><p>${escapeHtml(specialty)}</p><p>${escapeHtml(city)}</p><a href="/trouver/praticien/${encodeURIComponent(profile.id)}">${escapeHtml(shareLabels.profile)}</a></article>`;
        window.L.marker([lat, lng], { icon, title: profile.name, alt: profile.name })
          .bindPopup(popup)
          .addTo(markerLayer);
      });
    };

    map.on('moveend zoomend', renderClusters);
    renderClusters();
    return () => {
      map.off('moveend zoomend', renderClusters);
      markerLayer.clearLayers();
    };
  }, [isMapReady, clusterIndex, currentLang, animationsDisabled, shareLabels.profile]);

  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current) {
      return;
    }

    const timeout = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 100);

    return () => clearTimeout(timeout);
  }, [isMapReady]);

  /*
   * Select from quick list
   */
  const handleSelectEntity = (
    entity: PublicPractitioner
  ) => {
    setSelectedId(entity.id);
  };

  const selectGovernorate = (governorate: string) => {
    setSelectedGovernorate(governorate);
    const url = new URL(window.location.href);
    if (governorate) url.searchParams.set('gov', governorate);
    else url.searchParams.delete('gov');
    window.history.replaceState({}, '', url);
    window.dispatchEvent(new CustomEvent('csnpt-governorate-change', { detail: governorate }));
  };

  async function shareMap() {
    const node = captureContainerRef.current;
    if (!node || isSharing) return;
    setIsSharing(true);
    setShareError(false);
    try {
      const image = await toPng(node, { cacheBust: true, pixelRatio: 2 });
      const download = document.createElement('a');
      download.href = image;
      download.download = 'csnpt-map-share.png';
      download.click();
    } catch (error) {
      console.error('Map image export failed:', error);
      setShareError(true);
    } finally {
      setIsSharing(false);
    }
  }

  const hasSearch =
    searchQuery.trim().length >
    0;

  return (
    <section
      id="observatory"
      aria-label={currentLang === 'ar' ? 'المرصد' : currentLang === 'en' ? 'Observatory' : 'Observatoire'}
      dir={
        isRtl
          ? 'rtl'
          : 'ltr'
      }
      className="observatory-section
        relative
        z-10
        bg-[var(--paper)]
        py-16
        sm:py-24
        border-b
        border-[var(--line)]
        scroll-mt-20
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* NO RESULTS */}

        {hasSearch &&
          filteredEntities.length ===
            0 && (
            <div
              className="
                mb-8
                rounded-3xl
                border
                border-[var(--line)]
                bg-[var(--surface-soft)]
                px-6
                py-8
                text-center
              "
            >
<div
                className="
                  text-sm
                  font-semibold
                  text-[var(--ink)]
                "
              >
                {currentLang === 'ar'
                  ? 'لم يتم العثور على نتيجة'
                  : 'Aucun résultat trouvé'}
              </div>

              <p
                className="
                  mt-2
                  text-xs
                  text-[var(--muted)]
                "
              >
                {currentLang === 'ar'
                  ? 'جرّب اسم مدينة أو اختصاص مختلف.'
                  : 'Essayez une ville, un nom ou une spécialité différente.'}
              </p>

            </div>
          )}

        {/* MAP + CARD */}

        {filteredEntities.length >
          0 && (
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-12
              gap-8
              items-start
            "
          >

            {/* MAP */}

            <motion.div
              ref={captureContainerRef}
              initial={animationsDisabled ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: animationsDisabled ? 0 : 0.75, ease: 'easeOut' }}
              className="
                lg:col-span-8
                overflow-hidden
                rounded-3xl
                border
                border-[var(--line)]
                bg-[var(--surface-soft)]
                shadow-sensory-sm
                relative
                h-[440px]
                sm:h-[520px]
              "
            >

                            <div className="absolute inset-x-3 top-3 z-[500] flex flex-wrap gap-2" role="group" aria-label={mapLabels.governorates}>
                <button type="button" aria-pressed={!selectedGovernorate} onClick={() => selectGovernorate('')} className="min-h-10 rounded-full border border-[#0E5A5F] bg-[#FCFCFC] px-3 text-xs font-semibold text-[#14272A]">{mapLabels.all}</button>
                {[...new Set(practitioners.map((person) => person.governorate))].sort().map((governorate) => (
                  <button key={governorate} type="button" aria-pressed={selectedGovernorate === governorate} onClick={() => selectGovernorate(governorate)} className="min-h-10 rounded-full border border-[#0E5A5F] bg-[#FCFCFC] px-3 text-xs font-semibold text-[#14272A]">
                    {governorateName(governorate)}
                  </button>
                ))}
              </div>
              <div className="absolute bottom-3 end-3 z-[500] flex flex-col gap-2" role="group" aria-label={zoomLabels.group}>
                <motion.button
                  type="button"
                  whileHover={animationsDisabled ? undefined : { scale: 1.06 }}
                  whileTap={animationsDisabled ? undefined : { scale: 0.94 }}
                  onClick={() => mapInstanceRef.current?.zoomIn(1, { animate: !animationsDisabled })}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-[#0E5A5F]/30 bg-[#F6F1E9] text-xl font-semibold leading-none text-[#0E5A5F] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E5A5F]"
                  aria-label={zoomLabels.in}
                >+</motion.button>
                <motion.button
                  type="button"
                  whileHover={animationsDisabled ? undefined : { scale: 1.06 }}
                  whileTap={animationsDisabled ? undefined : { scale: 0.94 }}
                  onClick={() => mapInstanceRef.current?.zoomOut(1, { animate: !animationsDisabled })}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-[#0E5A5F]/30 bg-[#F6F1E9] text-xl font-semibold leading-none text-[#0E5A5F] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E5A5F]"
                  aria-label={zoomLabels.out}
                >−</motion.button>
              </div>
              <button
                type="button"
                onClick={() => void shareMap()}
                disabled={isSharing}
                className="absolute bottom-3 end-14 z-[500] min-h-10 rounded-full bg-[#C4623B] px-4 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#a94e2d] disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14272A]"
                aria-label={isSharing ? shareLabels.busy : shareLabels.button}
              >
                {isSharing ? shareLabels.busy : shareLabels.button}
              </button>
              {shareError && <span role="alert" className="absolute bottom-14 end-3 z-[500] max-w-64 rounded-lg bg-[#FCFCFC] px-3 py-2 text-xs text-[#14272A] shadow">{shareLabels.error}</span>}
              <div
                ref={
                  mapContainerRef
                }
                tabIndex={0}
                aria-label={mapLabels.map}
                className="
                  w-full
                  h-full
                  outline-none
                "
              />

              {!isMapReady && (
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-[var(--surface-soft)]
                    text-xs
                    text-[var(--muted)]
                    pointer-events-none
                  "
                >
                  {mapLabels.loading}
                </div>
              )}

            </motion.div>

            {/* RIGHT COLUMN */}

            <div
              className="
                lg:col-span-4
                flex
                flex-col
                gap-4
              "
            >

              {activeEntity && (
                <div
                  className="
                    rounded-3xl
                    border
                    border-[var(--line)]
                    bg-[var(--surface-soft)]
                    p-6
                    shadow-sensory-sm
                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2
                      pb-4
                      border-b
                      border-[var(--line)]
                    "
                  >

                    <span className="text-xs font-semibold text-[var(--muted)]">
                      {activeEntity.city[currentLang]}
                    </span>

                  </div>

                  {/* NAME */}

                  <div
                    className="
                      mt-4
                    "
                  >

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-[var(--ink)]
                        tracking-tight
                      "
                    >
                      {
                        activeEntity.name
                      }
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        font-semibold
                        text-[var(--teal)]
                      "
                    >
                      {
                        activeEntity
                          .roleOrSpecialty[
                          currentLang
                        ]
                      }
                    </p>

                  </div>

                </div>
              )}

              {/* QUICK LIST */}

              <div
                className="
                  rounded-3xl
                  border
                  border-[var(--line)]
                  bg-[var(--surface-soft)]
                  p-4
                  shadow-sensory-sm
                  max-h-[220px]
                  overflow-y-auto
                  space-y-1.5
                "
              >

                <span
                  className="
                    block
                    text-[11px]
                    font-bold
                    text-[var(--muted)]
                    px-2
                    py-1
                    uppercase
                    tracking-wider
                  "
                >
                  {currentLang ===
                  'ar'
                    ? 'قائمة سريعة'
                    : 'Indexation rapide'}
                </span>

                {filteredEntities.map(
                  (entity) => (
                    <button
                      key={
                        entity.id
                      }
                      type="button"
                      onClick={() =>
                        handleSelectEntity(
                          entity
                        )
                      }
                      className={`
                        w-full
                        text-start
                        px-3
                        py-2.5
                        rounded-xl
                        text-xs
                        transition-all
                        flex
                        items-center
                        justify-between
                        min-h-[40px]
                        ${
                          entity.id ===
                          activeEntity?.id
                            ? 'bg-[var(--paper)] text-[var(--teal)] font-bold shadow-sensory-sm border border-[var(--line)]'
                            : 'text-[var(--muted)] hover:bg-[var(--paper)]/60'
                        }
                      `}
                    >

                      <span
                        className="
                          truncate
                          pr-2
                        "
                      >
                        {
                          entity.name
                        }
                      </span>

                      <span
                        className="
                          text-[10px]
                          font-mono
                          text-[var(--muted)]
                          shrink-0
                        "
                      >
                        {
                          entity.city[
                            currentLang
                          ]
                        }
                      </span>

                    </button>
                  )
                )}

              </div>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}

