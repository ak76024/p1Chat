import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/User'
import connectDB from '@/db/connect'

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.google_Auth_Id,
//       clientSecret: process.env.google_Auth_Secret
//     })
//   ],
//   callbacks: {
//     async signIn({ account,user}) {
//       if(account.provider === 'google') {
//         // connect to the DB
//         await connectDB();
//         const currentUser = await User.findOne({ email: user.email });
//         if(!currentUser) {
//           const newuser =await User.create({
//             name : user.name,
//             email: user.email,
//             userName: user.email.split('@')[0],
//             profilePicture: user.image
//           })
//           user.name= newuser.name;
//         }else {
//           user.name = currentUser.name;
//         }
//       }
//       return true;
//     },
//     async jwt({token}){
//       await connectDB();
//       const currentUser = await User.findOne({email: token.email})
//       if(currentUser) {
//         token.id = currentUser._id;
//         token.name = currentUser.name;
//         token.profilePicture = currentUser.profilePicture;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//     session.user.id = token.id;
//     session.user.username = token.username;
//     session.user.role = token.role;
//     return session;
//   },
//   }
// })
// export {handler as GET, handler as POST}

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
      }
      return token;
    },
    async session({ session, token }) {
    session.user.id = token.id;
    return session;
  },
  }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };