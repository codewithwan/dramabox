# DramaBox

A modern Netflix-inspired streaming web application built with Next.js 16, featuring drama series from the DramaBox API. This project showcases a premium user experience with smooth animations, interactive previews, and a responsive design.

## Features

- **Netflix-Style Interface**: Clean, modern UI inspired by Netflix's design language
- **Auto-Rotating Hero Banner**: Featured dramas carousel with smooth transitions
- **Interactive Card Previews**: 5-second hover preview with detailed information dialog
- **Video Player**: Custom video player with episode selection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Full dark theme implementation
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Loading States**: Skeleton loaders for better UX during data fetching
- **Data Filtering**: Automatic filtering of invalid or incomplete data

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **API**: DramaBox API (https://dramabox.sansekai.my.id)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/codewithwan/dramabox.git
cd dramabox
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dramabox/
├── app/
│   ├── browse/          # Browse pages (trending, latest, foryou)
│   ├── drama/[id]/      # Drama detail and video player page
│   ├── search/          # Search results page
│   ├── layout.tsx       # Root layout with theme provider
│   ├── page.tsx         # Home page with hero and sections
│   └── globals.css      # Global styles and theme variables
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── drama-card.tsx   # Drama card with hover preview
│   ├── drama-section.tsx # Section layout (grid/horizontal)
│   ├── drama-player-ui.tsx # Video player interface
│   ├── header.tsx       # Navigation header
│   ├── hero-carousel.tsx # Auto-rotating hero banner
│   ├── hero-drama.tsx   # Individual hero slide
│   └── skeletons.tsx    # Loading skeleton components
├── lib/
│   ├── api.ts           # API client functions
│   ├── types.ts         # TypeScript interfaces
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## API Integration

This project uses the DramaBox API to fetch drama content. Available endpoints:

- `/api/dramabox/foryou` - Recommended dramas
- `/api/dramabox/latest` - Latest releases
- `/api/dramabox/trending` - Trending dramas
- `/api/dramabox/search?q={query}` - Search dramas
- `/api/dramabox/allepisode?bookId={id}` - Get all episodes for a drama

## Key Features Implementation

### Interactive Card Preview

- Hover over a drama card for 5 seconds to trigger a detailed preview dialog
- Preview includes drama info, metadata, description, and action buttons
- Dialog remains open until manually closed by user

### Hero Carousel

- Auto-rotates through featured dramas every 8 seconds
- Smooth fade transitions between slides
- Filters out invalid or incomplete data automatically

### Video Player

- Episode grid with thumbnails
- Episode numbers and titles on hover
- Active episode indicator
- Premium episode badges
- Responsive grid layout (3-8 columns based on screen size)

### Performance Optimizations

- Image lazy loading
- Skeleton loading states
- Data validation and filtering
- Efficient re-renders with React hooks
- Optimized animations with Framer Motion

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Coding Conventions

This project follows conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation updates
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Testing updates

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- DramaBox API for providing the drama content
- shadcn/ui for the beautiful component library
- Next.js team for the amazing framework
- Vercel for hosting and deployment platform

## Contact

For questions or feedback, please open an issue on GitHub.

---

Built with Next.js and TypeScript
