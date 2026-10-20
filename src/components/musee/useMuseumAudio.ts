'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type AudioNodes = {
  context: AudioContext;
  master: GainNode;
  oscillators: [OscillatorNode, OscillatorNode];
  toneGains: [GainNode, GainNode];
  lfo: OscillatorNode;
  lfoDepth: GainNode;
};

export function useMuseumAudio() {
  const nodesRef = useRef<AudioNodes | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startAudio = useCallback(async () => {
    let nodes = nodesRef.current;

    if (!nodes) {
      const context = new window.AudioContext();
      const master = context.createGain();
      master.gain.value = 0;
      master.connect(context.destination);

      const first = context.createOscillator();
      const second = context.createOscillator();
      const firstGain = context.createGain();
      const secondGain = context.createGain();
      first.type = 'sine';
      second.type = 'sine';
      first.frequency.value = 150;
      second.frequency.value = 220;
      firstGain.gain.value = 0.012;
      secondGain.gain.value = 0.009;
      first.connect(firstGain).connect(master);
      second.connect(secondGain).connect(master);

      const lfo = context.createOscillator();
      const lfoDepth = context.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.08;
      lfoDepth.gain.value = 0.003;
      lfo.connect(lfoDepth);
      lfoDepth.connect(firstGain.gain);
      lfoDepth.connect(secondGain.gain);

      first.start();
      second.start();
      lfo.start();

      nodes = { context, master, oscillators: [first, second], toneGains: [firstGain, secondGain], lfo, lfoDepth };
      nodesRef.current = nodes;
    }

    if (nodes.context.state === 'suspended') await nodes.context.resume();
    nodes.master.gain.setTargetAtTime(0.42, nodes.context.currentTime, 0.6);
    setIsPlaying(true);
  }, []);

  const stopAudio = useCallback(async () => {
    const nodes = nodesRef.current;
    nodesRef.current = null;
    setIsPlaying(false);
    if (!nodes) return;

    nodes.master.gain.cancelScheduledValues(nodes.context.currentTime);
    nodes.master.gain.setValueAtTime(0, nodes.context.currentTime);
    nodes.oscillators.forEach((oscillator) => oscillator.stop());
    nodes.lfo.stop();
    await nodes.context.close();
  }, []);

  const updateMovement = useCallback((x: number, y: number, progress: number) => {
    const nodes = nodesRef.current;
    if (!nodes || nodes.context.state !== 'running') return;

    const boundedX = Math.max(-1, Math.min(1, x));
    const boundedY = Math.max(-1, Math.min(1, y));
    const boundedProgress = Math.max(0, Math.min(1, progress));
    const now = nodes.context.currentTime;
    const firstFrequency = 150 + boundedProgress * 36 + boundedX * 4 + boundedY * 2;
    const secondFrequency = 220 + boundedProgress * 52 - boundedX * 5 + boundedY * 3;

    nodes.oscillators[0].frequency.setTargetAtTime(firstFrequency, now, 0.35);
    nodes.oscillators[1].frequency.setTargetAtTime(secondFrequency, now, 0.35);
  }, []);

  useEffect(() => () => {
    const nodes = nodesRef.current;
    nodesRef.current = null;
    if (!nodes) return;
    nodes.oscillators.forEach((oscillator) => oscillator.stop());
    nodes.lfo.stop();
    void nodes.context.close();
  }, []);

  return { startAudio, stopAudio, updateMovement, isPlaying };
}
