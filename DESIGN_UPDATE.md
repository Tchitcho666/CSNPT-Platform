# CSNPT Platform — Design V2

This iteration implements the first visual foundation from the CSNPT Platform Design Blueprint.

## Main changes
- Removed the traditional Hero from the homepage.
- Added a homepage workbench that starts with useful actions.
- Added the Trace / Pivot / Axis visual language.
- Added responsive compositions for mobile, tablet, desktop and wide screens.
- Added new Understand / Domains / Platform Pulse sections.
- Reworked the navigation around the platform architecture.
- Added subtle semantic motion and reduced-motion / Calm Mode behavior.
- Preserved the existing Observatory functionality as the next major visual refinement target.
- Restored TypeScript domain types and the emergency-kit route so the source type-checks.

## Validation
- TypeScript: passes (`npx tsc --noEmit`)
- ESLint: 0 errors, existing warnings remain
- Production build could not be completed in the offline environment because Next.js attempted to download its SWC binary from npm.

## Next implementation step
Refine the Observatory into the full Trace/Pivot/Axe experience, then build the directory, professional area, training and editorial templates from the same design system.
