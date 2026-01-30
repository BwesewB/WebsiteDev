# TextHoverImage - Next.js Version

A modern React/Next.js conversion of the TextHoverImage project with GSAP animations.

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Navigate to the project folder:
```bash
cd TextHoverImage-NextJS
```

2. Install dependencies:
```bash
npm install
```

3. **Add your media files** to the `public/images/` folder (matching the `assets` array in [components/ClientsSection.tsx](components/ClientsSection.tsx)):
   - Images: `.jpg`, `.png`, `.webp`, `.gif`, `.svg`
   - Videos: `.mp4`, `.webm`, `.ogg`

4. **Add your font file** to `public/fonts/` (e.g., `TWKLausanne-600.otf`)

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- **app/** - Next.js App Router
  - `layout.tsx` - Root layout with metadata
  - `page.tsx` - Home page
  - `globals.css` - Global styles
- **components/** - React components
  - `ClientsSection.tsx` - Main container; manages state
  - `ClientsList.tsx` - List of clickable client names
  - `MediaElement.tsx` - Image/video display with GSAP animations
- **public/** - Static assets
  - `images/` - Place your media files here
  - `fonts/` - Place your font files here

## Customization

### Changing Assets

Edit the `assets` array in [components/ClientsSection.tsx](components/ClientsSection.tsx):
```typescript
const assets = [
  'your-image.jpg',
  'your-video.mp4',
  // ...
];
```

### Adjusting Animations

Modify GSAP tweens in [components/MediaElement.tsx](components/MediaElement.tsx):
```typescript
gsap.to(mediaRef.current, {
  opacity: 1,
  scale: 1,
  duration: 0.5, // Change duration
  ease: 'power2.out', // Change easing
});
```

### Styling

Update [app/globals.css](app/globals.css) for colors, fonts, and responsive behavior.

## Building for Production

```bash
npm run build
npm start
```

## Technologies

- **Next.js 14** - React framework
- **React 18** - UI library
- **GSAP 3** - Animation library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Autoprefixer & PostCSS** - CSS processing

## Notes

- Media files must be placed in the `public/images/` directory
- The order of filenames in the `assets` array must match your `.client-name` elements
- Videos are set to autoplay, loop, muted, and inlinePlay by default
