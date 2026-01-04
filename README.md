# Musubi - Instagram Campaign Platform

A modern platform that connects campaigners with promoters to facilitate authentic Instagram marketing campaigns. Built with Next.js, featuring real-time campaign management, Instagram integration, and performance-based rewards.

## 🌟 Features

### For Campaigners
- **Create Campaigns**: Set up Instagram marketing campaigns with custom budgets, goals, and participant limits
- **Media Selection**: Choose specific Instagram posts to run campaigns on
- **Budget Management**: Set campaign budgets (multiples of ₹100) with automatic reward calculations
- **Campaign Tracking**: Monitor campaign performance, participant engagement, and budget utilization
- **Payment System**: Integrated wallet system for managing campaign funds and payments

### For Promoters
- **Browse Campaigns**: Discover available campaigns matching your interests and follower count
- **Join Campaigns**: Request participation in campaigns and earn rewards based on performance
- **Performance Tracking**: Monitor your campaign participation, earnings, and engagement metrics
- **Instagram Integration**: Connect your Instagram Business Account to participate in campaigns
- **Reward System**: Earn base rewards and bonus pool distributions based on campaign performance

### Platform Features
- **Instagram OAuth**: Secure authentication via Facebook/Instagram OAuth
- **Real-time Analytics**: Instagram insights integration for account and post analytics
- **Dark Mode UI**: Beautiful, modern dark-themed interface with Japanese-inspired design
- **Responsive Design**: Fully responsive across all devices
- **Secure Payments**: Wallet system with transaction tracking
- **Community Guidelines**: Built-in community standards and reporting system

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Authentication**: Next-Auth v4 with Prisma adapter
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Facebook Developer Account (for Instagram OAuth)
- Instagram Business Account (for testing)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd private
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/musubi?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Facebook/Instagram OAuth
FACEBOOK_CLIENT_ID="your-facebook-app-id"
FACEBOOK_CLIENT_SECRET="your-facebook-app-secret"

# Instagram OAuth (if using separate provider)
INSTAGRAM_CLIENT_ID="your-facebook-app-id"
INSTAGRAM_CLIENT_SECRET="your-facebook-app-secret"
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # NextAuth configuration
│   │   ├── campaigns/          # Campaign CRUD operations
│   │   ├── get-insta-*/       # Instagram data endpoints
│   │   └── profile/           # User profile data
│   ├── auth/                  # Authentication pages
│   ├── campaigns/             # Campaign pages
│   ├── dashboard/             # Main dashboard
│   ├── onboarding/            # Role selection and setup
│   ├── profile/               # User profile page
│   ├── policies/              # Terms, Privacy, Community pages
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── navbar.tsx             # Global navigation
│   └── footer.tsx             # Footer component
├── lib/
│   ├── auth.ts                # NextAuth configuration
│   └── prisma.ts              # Prisma client
└── generated/
    └── prisma/                # Generated Prisma client
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth authentication handlers

### Campaigns
- `GET /api/campaigns` - Get all campaigns for authenticated user
- `POST /api/campaigns` - Create a new campaign
- `GET /api/campaigns/[id]` - Get campaign details
- `GET /api/campaigns/available` - Get available campaigns for promoters
- `POST /api/campaigns/[id]/join` - Join a campaign as promoter

### Instagram
- `GET /api/get-insta-data` - Get Instagram account information
- `GET /api/get-insta-insights` - Get Instagram insights/metrics
- `GET /api/get-insta-recent-post` - Get recent Instagram posts
- `GET /api/get-post-details` - Get details of a specific Instagram post

### Profile
- `GET /api/profile` - Get user profile data (wallet, campaigns, transactions)

## 🔐 Authentication

The application uses Next-Auth with Facebook/Instagram OAuth providers:

1. **Facebook Provider**: Standard Facebook login
2. **Instagram Provider**: Instagram Business Account login

Both providers require:
- `public_profile` scope
- `pages_show_list` scope (for accessing Instagram Business Accounts)

After authentication, users can:
- Connect their Instagram Business Account
- Access Instagram data through Facebook Graph API
- Participate in campaigns

## 💾 Database Schema

### Key Models

- **User**: User accounts with roles (CREATOR, DISTRIBUTOR, ADMIN)
- **Campaign**: Campaign details, budgets, and status
- **CampaignParticipant**: Join table for campaign participation
- **Wallet**: User wallet balances
- **Transaction**: Payment and reward transactions
- **InstagramAccount**: Connected Instagram Business Accounts
- **EffortAction**: Promoter effort tracking
- **EngagementSnapshot**: Engagement metrics snapshots

See `schema.prisma` for complete schema definition.

## 🎨 UI Components

The project uses **shadcn/ui** components built on Radix UI:

- Button, Card, Input, Label
- Slider, Progress, Tabs
- Dropdown Menu, Dialog

All components are located in `src/components/ui/` and can be customized via Tailwind CSS.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Database Migration in Production

```bash
# Run migrations in production
npx prisma migrate deploy
```

## 📝 Key Features Explained

### Campaign Creation
- Campaigners select an Instagram post to promote
- Set budget (must be multiple of ₹100)
- Define campaign duration (1-30 days)
- Set maximum participants
- Choose campaign goal (Likes, Views, Followers)

### Campaign Participation
- Promoters browse available LIVE campaigns
- Filter by budget, goal, or date
- Join campaigns (requires Instagram account)
- Eligibility determined by follower count and campaign rules

### Reward System
- **Base Reward**: Distributed equally among eligible participants
- **Bonus Pool**: Performance-based distribution
- **Wallet System**: Secure transaction tracking
- **Payment Processing**: Automatic reward calculations

### Instagram Integration
- OAuth-based Instagram Business Account connection
- Real-time data fetching via Facebook Graph API
- Post insights and analytics
- Media management

## 🔧 Development

### Code Style
- TypeScript strict mode enabled
- ESLint for code quality
- Prettier (if configured) for formatting

### Database Management
```bash
# Create a new migration
npx prisma migrate dev --name migration-name

# Reset database (development only)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

## 📞 Support

For support, please contact through the application's support channels or create an issue in the repository.

---

**Built with ❤️ using Next.js and modern web technologies**
