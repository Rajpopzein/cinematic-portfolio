# Cinematic Portfolio

Rajkumar's responsive cinematic developer portfolio.

## Core interaction
The portrait uses two perfectly aligned transparent PNGs. The normal portrait stays visible; a cursor/touch-driven mask reveals the robot image locally. The current implementation uses a CSS radial mask as a performant baseline. A WebGL/noise shader can replace the mask for a more organic liquid boundary.

## Run
```bash
npm install
npm run dev
npm run build
```

## Required assets
Add these files:
- `public/images/human.png`
- `public/images/robot.png`
- `public/fonts/Balboa.woff2`
- `public/fonts/Shadow-Light.woff2`

The two portrait PNGs must use the same canvas dimensions and aligned facial/body landmarks.

## Design
- Dark cinematic default: charcoal + champagne/gold
- Light mode: white + electric blue
- Desktop hover and mobile touch/drag reveal
- Responsive mobile-first fallback
