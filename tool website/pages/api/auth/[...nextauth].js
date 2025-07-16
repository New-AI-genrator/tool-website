import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET || 'changeme',
});

// Setup instructions:
// 1. Create OAuth credentials at https://console.developers.google.com/
// 2. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and NEXTAUTH_URL to your .env.local file
// 3. Restart the dev server after adding environment variables 