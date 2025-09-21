# Juspay Dashboard

Dashboard application built with Next.js for Juspay Technologies assignment. Features interactive charts, order management, and analytics interface.

## Features

- Interactive dashboard with charts and analytics
- Order tracking and management
- Dark/Light theme support
- Responsive design for mobile and desktop

## Tech Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Recharts for charts
- Shad CN components
- Zustand for state management
- Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alen-kuriakose/juspay-dashboard.git
cd juspay-dashboard
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

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable components
│   ├── charts/         # Chart components
│   ├── ui/             # Base UI components
│   └── sections/       # Page sections
├── layouts/            # Layout components
├── hooks/              # Custom hooks
├── states/             # Global state
├── utils/              # Helper functions
└── assets/             # Images and icons
```

## Key Components

- **Charts**: Area chart, pie chart, bar chart, world map
- **Dashboard**: Main analytics dashboard
- **Orders**: Order management interface
- **Navigation**: Sidebar and breadcrumb navigation
- **Themes**: Dark/light mode switcher

## Deployment

The app is optimized for Vercel deployment:

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

## Author

Alen Kuriakose - [GitHub](https://github.com/alen-kuriakose)