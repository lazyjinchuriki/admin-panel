import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = [
  "rahul.khushalani17@gmail.com",
  "khushalanirahul54321@gmail.com",
];

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return null;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdimn(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.email) {
    return adminEmails.includes(session.user.email);
  } else {
    res.status(401);
    res.end();
    throw "Unauthorized";
  }
}
