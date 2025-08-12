# AI Mastery Academy - Deployment Guide

## Environment Variables Setup

1. **Copy the environment template:**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. **Required Environment Variables:**

### Supabase (Database & Auth)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key

### Stripe (Payments)
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

### Groq (AI Features)
- `GROQ_API_KEY`: Your Groq API key for AI assistance

### Application
- `NEXT_PUBLIC_SITE_URL`: Your application URL (http://localhost:3000 for development)

## Database Setup

1. **Run the database scripts in order:**
   \`\`\`sql
   -- 1. Create the main schema
   scripts/01-create-database-schema.sql
   
   -- 2. Seed sample courses
   scripts/02-seed-sample-courses.sql
   
   -- 3. Add Stripe integration
   scripts/03-update-profiles-for-stripe.sql
   
   -- 4. Create live sessions tables
   scripts/04-create-live-sessions-tables.sql
   
   -- 5. Add admin features
   scripts/05-add-admin-features.sql
   
   -- 6. Create AI courses
   scripts/06-create-ai-courses.sql
   
   -- 7. Make superadmin
   scripts/07-make-superadmin.sql
   \`\`\`

## Deployment Steps

### Vercel Deployment (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Manual Deployment

1. **Build the application:**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start the production server:**
   \`\`\`bash
   npm start
   \`\`\`

## Post-Deployment Checklist

- [ ] Database scripts executed successfully
- [ ] Supabase authentication working
- [ ] Stripe payments configured
- [ ] Groq AI assistant responding
- [ ] Language toggle functioning
- [ ] All environment variables set
- [ ] Superadmin user created (uhuruinu@gmail.com)

## Troubleshooting

### Common Issues:

1. **Supabase Connection Issues:**
   - Verify SUPABASE_URL and SUPABASE_ANON_KEY
   - Check if database scripts ran successfully

2. **Stripe Payment Issues:**
   - Ensure webhook endpoint is configured in Stripe dashboard
   - Verify STRIPE_WEBHOOK_SECRET matches

3. **AI Assistant Not Working:**
   - Check GROQ_API_KEY is valid
   - Verify API quota and limits

## Support

For deployment support, contact: hello@aimasteryacademy.com
