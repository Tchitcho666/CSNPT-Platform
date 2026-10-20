# CSNPT EditorialHome patch

This patch contains:
- `src/components/EditorialHome.tsx`
- `src/app/page.tsx`

## Apply
Copy the files into the existing Next.js app, replacing `src/app/page.tsx`.

The component uses `next/link` and `lucide-react`. It assumes those packages are already installed. It links to the project's existing route names, but check `/ar` and `/espace-pro` against your actual locale/auth routing before shipping.

## Calm mode
Add the following to `src/app/globals.css` (or your global stylesheet) to hide complex imagery when the root HTML element is in calm mode:

```css
html[data-sensory-mode="calm"] .calm-hidden {
  display: none !important;
}
```

## Notes
- No package files or lockfiles are included.
- External Unsplash images are decorative; the page still has vector shapes if they fail to load.
- The search submits `q` to `/trouver`. If the directory uses a different query parameter, align the input name with the existing implementation.
- This is a source patch only. It has not been built against your local project because the local `C:\Users\...` workspace is not mounted in this session.
