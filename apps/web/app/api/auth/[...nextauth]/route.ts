import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !account) return false;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/callback`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              displayName: user.name || user.email.split('@')[0],
              avatarUrl: user.image || null,
              provider: account.provider,
              providerId: account.providerAccountId,
            }),
          },
        );

        if (!response.ok) return false;

        const data = await response.json();
        (user as Record<string, unknown>).accessToken = data.data.accessToken;
        (user as Record<string, unknown>).backendUser = data.data.user;

        return true;
      } catch {
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as Record<string, unknown>).accessToken;
        token.backendUser = (user as Record<string, unknown>).backendUser;
      }
      return token;
    },

    async session({ session, token }) {
      (session as Record<string, unknown>).accessToken = token.accessToken;
      (session as Record<string, unknown>).backendUser = token.backendUser;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
