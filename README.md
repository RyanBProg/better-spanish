# Better Spanish - Language Learning Application

A Full stack application designed to help users learn Spanish through interactive games and spaced repetition. Built with Next.js 14.

## 🚀 Live Demo

[View Live Site](https://better-spanish-ryans-projects-197c1757.vercel.app/)

## 🌟 Key Features Implemented

- **Interactive Learning Games**: Flashcards and multiple choice quizzes for engaging practice
- **Spaced Repetition**: Smart algorithm adjusts word frequency based on user performance
- **Authentication**: Secure login with Kinde Auth integration
- **Database Integration**: PostgreSQL database with Drizzle ORM for robust data management
- **Mobile-first Responsive Design**: Fully responsive across all device sizes
- **Progress Tracking**: Track learning progress and review statistics
- **Type Safety**: Full TypeScript integration for robust code quality

## 🛠️ Technologies Used

- **Next.js 14**: Main framework with server components
- **Drizzle ORM**: Database management
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Kinde Auth**: Authentication
- **Shadcn/ui**: UI components

## 🎯 Future Improvements

- [ ] Learning pages with verb conjugation grid for regular verbs
- [ ] Stripe integration with pro tier
- [ ] Enhanced user account management
- [ ] Advanced user statistics
- [ ] Study reminders
- [ ] Animations

## 📁 Project Structure

```bash
.
├── app/
│ ├── actions/ # Server actions
│ ├── api/ # API routes
│ ├── dashboard/ # Dashboard pages
│ │ ├── games/ # Learning games
│ │ ├── learning/ # Learning references
│ │ └── account/ # User account
│ ├── policy/ # Policy pages
│ └── layout.tsx # Root layout
├── components/ # UI components
├── db/
│ ├── drizzle.ts # Database config
│ └── schema.ts # Database schema
├── hooks/ # Custom React hooks
├── lib/ # Utility functions
└── public/ # Static assets
```

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/RyanBProg/better-spanish
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## 📄 License

This project is open source and available under the MIT License.

## 📫 Contact

Feel free to reach out if you have any questions or would like to connect:

- [GitHub](https://github.com/ryanbprog)
- [LinkedIn](https://www.linkedin.com/in/ryan-bowler-601919170)
