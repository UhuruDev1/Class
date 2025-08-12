# AI Mastery Academy

A comprehensive full-stack AI learning platform built with Next.js, Supabase, and modern web technologies. Master artificial intelligence through hands-on projects, live sessions, and personalized AI mentorship.

## 🚀 Features

### Core Learning Platform
- **Expert-Led Courses**: Comprehensive AI curriculum from industry professionals
- **Live Classrooms**: Interactive sessions with video conferencing and collaborative whiteboards
- **AI-Powered Help Desk**: 24/7 intelligent support using Groq AI
- **Social Learning Community**: Instagram-like feed for sharing progress and connecting with peers
- **Progress Tracking**: Detailed analytics and learning path recommendations

### Advanced Features
- **Multi-Language Support**: English and Swahili with seamless switching
- **Payment Integration**: Stripe-powered course purchases and subscriptions
- **Admin Panel**: Comprehensive management dashboard with analytics
- **Real-time Features**: Live chat, notifications, and collaborative tools
- **Mobile Responsive**: Optimized for all devices

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **AI Integration**: Groq for intelligent assistance
- **Payments**: Stripe for secure transactions
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project
- Groq API key
- Stripe account (for payments)

## 🚀 Quick Start

### 1. Clone and Install
\`\`\`bash
git clone <your-repo-url>
cd ai-mastery-academy
npm install
\`\`\`

### 2. Environment Setup
Create a `.env.local` file with the following variables:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key

# Stripe Configuration (Optional - for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Application Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### 3. Database Setup
Run the SQL scripts in order to set up your database:

1. **01-create-database-schema.sql** - Core database structure
2. **02-seed-sample-courses.sql** - Sample course data
3. **03-update-profiles-for-stripe.sql** - Stripe integration
4. **04-create-live-sessions-tables.sql** - Live classroom features
5. **05-add-admin-features.sql** - Admin panel functionality
6. **06-create-ai-courses.sql** - AI-focused course content

### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see your application.

## 📚 Course Content

The platform includes comprehensive AI courses covering:

### Beginner Level
- **AI Fundamentals** - Introduction to artificial intelligence concepts
- **Machine Learning Basics** - Core ML algorithms and principles

### Intermediate Level
- **Large Language Models** - Understanding and working with LLMs
- **AI Agents & Automation** - Building intelligent agents
- **RAG Systems** - Retrieval-Augmented Generation implementation

### Advanced Level
- **Multi-Agent Systems** - Complex AI architectures
- **AI in Production** - Deployment and scaling strategies
- **AI Safety & Ethics** - Responsible AI development

## 🌍 Multi-Language Support

The platform supports English and Swahili with:
- Complete UI translation
- Persistent language preferences
- Easy language switching
- Culturally appropriate content

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (#8B5CF6 to #EC4899)
- **Background**: Dark slate (#0F172A, #1E293B)
- **Accent**: Pink (#EC4899), Yellow (#FDE047)
- **Text**: White (#FFFFFF), Gray variants

### Typography
- **Headings**: GeistSans Bold/Semibold
- **Body**: GeistSans Regular
- **Code**: GeistMono

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the provided SQL scripts in order
3. Configure authentication providers if needed
4. Set up Row Level Security (RLS) policies

### Groq Integration
1. Sign up for Groq API access
2. Generate an API key
3. Add to environment variables

### Stripe Setup (Optional)
1. Create Stripe account
2. Get API keys from dashboard
3. Configure webhook endpoints
4. Set up products and pricing

## 📱 Features Overview

### Authentication
- Email/password authentication
- Protected routes with middleware
- User profile management
- Role-based access control

### Course Management
- Course creation and editing
- Lesson organization
- Progress tracking
- Enrollment management

### Live Classrooms
- Video conferencing integration
- Interactive whiteboard
- Real-time chat
- Session recording

### Social Features
- User posts and interactions
- Like and comment system
- User following
- Activity feeds

### AI Help Desk
- Intelligent chat assistance
- Context-aware responses
- Conversation history
- 24/7 availability

### Admin Panel
- User management
- Course analytics
- Revenue tracking
- Content moderation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy to your preferred hosting platform
3. Configure environment variables
4. Set up database connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

## 🔮 Roadmap

- [ ] Mobile app development
- [ ] Advanced AI integrations
- [ ] Blockchain certificates
- [ ] VR/AR learning experiences
- [ ] Additional language support

---

Built with ❤️ using Next.js, Supabase, and modern web technologies.
