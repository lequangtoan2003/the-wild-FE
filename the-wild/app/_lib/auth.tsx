import NextAuth, { User } from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-guests';
export const runtime = 'nodejs';

interface Session {
  user: {
    email: string;
    name?: string;
    image?: string;
    guestId?: string;
    nationality?: string;
    country_flag?: string;
    national_id?: string;
  };
  expires: string; // Thêm thuộc tính expires
}

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      try {
        if (!user.email || !user.name) {
          console.error('Missing user email or name:', user);
          return false;
        }
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({ email: user.email, full_name: user.name });
        }
        return true;
      } catch (error) {
        console.error('Sign-in error:', error);
        return false;
      }
    },
    async session({ session }: { session: Session;}) {
      const guest = await getGuest(session.user.email);
      if (guest) {
        session.user.guestId = guest._id;
        session.user.nationality = guest.nationality;
        session.user.country_flag = guest.country_flag;
        session.user.national_id = guest.national_id;
      }
      // Đảm bảo session.expires được đặt (thường được NextAuth xử lý tự động)
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);