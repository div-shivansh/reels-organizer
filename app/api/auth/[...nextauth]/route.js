import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB()

      const currentUser = await User.findOne({ email: user.email})
      if (!currentUser) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          isProfileComplete: false,
        })
      }
      return true

    },
    async session({ session }) {
      await connectDB()
      const dbUser = await User.findOne({ email: session.user.email })
      session.user.id = dbUser._id.toString()
      session.user.isProfileComplete = dbUser.isProfileComplete || false;
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }