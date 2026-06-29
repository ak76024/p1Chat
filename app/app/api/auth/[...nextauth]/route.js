import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/User'
import connectDB from '@/db/connect'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.google_Auth_Id,
      clientSecret: process.env.google_Auth_Secret
    })
  ],
  callbacks: {
    async signIn({ account,user}) {
      if(account.provider === 'google') {
        // connect to the DB
        await connectDB();
        const currentUser = await User.findOne({ email: user.email });
        if(!currentUser) {
          const newuser =await User.create({
            name : user.name,
            email: user.email,
            userName: user.email.split('@')[0],
            profilePicture: user.image
          })
          user.name= newuser.name;
        }else {
          user.name = currentUser.name;
        }
      }
      return true;
    },
    async jwt({token}){
      await connectDB();
      const currentUser = await User.findOne({email: token.email})
      if(currentUser) {
        token.id = currentUser._id;
        token.userName = currentUser.userName;
      }
      return token;
    },
    async session({ session, token }) {
    session.user.id = token.id;
    session.user.userName = token.userName;
    return session;
  },
  }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };