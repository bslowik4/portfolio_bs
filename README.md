# 🚀 Bartłomiej Słowik - Portfolio

A modern, newspaper-inspired portfolio website showcasing my work as a Full Stack Developer. Built with Next.js 15, TypeScript, and styled with Tailwind CSS.

**Live Demo:** [portfolio-bs-pink.vercel.app](https://portfolio-bs-pink.vercel.app/)

## ✨ Features

- 📰 **Newspaper-Style CV** - Unique vintage newspaper design for CV presentation
- 🎨 **Interactive Face Animation** - Engaging 3D face animation on the homepage with eye-tracking
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🎯 **Project Showcase** - Detailed project gallery with images and descriptions
- 🛠️ **Skills Overview** - Comprehensive display of technical skills and expertise
- 📧 **Contact Form** - Easy-to-use contact section for inquiries
- ⚡ **Performance Optimized** - Built with Next.js 15 and modern best practices
- 🧪 **Tested** - Unit tests with Jest and React Testing Library
- 🎨 **Print-Friendly CV** - CV page optimized for printing and PDF export

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [Prisma](https://www.prisma.io/) with [Neon](https://neon.tech/) (PostgreSQL)
- **Animation:** [Anime.js](https://animejs.com/)
- **Testing:** [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/react)
- **Code Quality:** ESLint, Prettier, Husky, lint-staged
- **Deployment:** [Vercel](https://vercel.com/)

## 📋 Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- PostgreSQL database (or Neon account for cloud database)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bslowik4/portfolio_bs.git
cd portfolio_bs
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your-postgresql-connection-string"
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run prettier` - Format code with Prettier
- `npm run prettier:check` - Check code formatting
- `npm test` - Run Jest tests

## 📁 Project Structure

```
portfolio_bs/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── contact/        # Contact page
│   │   ├── cv/             # CV page
│   │   ├── projects/       # Projects pages
│   │   └── skills/         # Skills page
│   ├── components/          # React components
│   │   ├── contact/        # Contact components
│   │   ├── cv/             # CV components
│   │   ├── home/           # Homepage components
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   ├── projects/       # Project components
│   │   └── skills/         # Skills components
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
│   ├── icons/             # Technology icons
│   └── images/            # Project images and profile photo
└── tests/                  # Test files

```

## 🎨 Key Features

### Newspaper CV

A unique, vintage newspaper-inspired design for the CV page with:

- Classic newspaper typography
- Print-optimized layout
- Professional sections (Employment, Education, Skills, Languages)

### Interactive Homepage

- 3D animated face with eye-tracking
- Smooth animations using Anime.js
- Modern introduction section

### Project Showcase

- Dynamic project cards
- Detailed project pages with slug-based routing
- Image galleries
- Technology stack display

### Skills Section

- Visual skill cards with icons
- Categorized by proficiency level
- Links to relevant technologies

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Tests are located alongside components with the `.test.tsx` extension.

## 🚀 Deployment

The portfolio is deployed on [Vercel](https://vercel.com/). To deploy your own version:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy!

Alternatively, use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## 📧 Contact

- **Email:** bslowik4@gmail.com
- **GitHub:** [github.com/bslowik4](https://github.com/bslowik4)
- **Website:** [portfolio-bs-pink.vercel.app](https://portfolio-bs-pink.vercel.app/)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Anime.js](https://animejs.com/)
- Icons from various sources (see `/public/icons/`)

---
