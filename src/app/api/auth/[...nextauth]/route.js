import User from "@/models/User";
import connectDB from "@/utils/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connectDB()
        try{
          const user = await User.findOne({email: credentials.email})
          if (user){
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
            if (isPasswordCorrect){
              return user
            } else {
              throw new Error("Password is incorrect")
            }

          } else {
            throw new Error("User not found")
          }
        } catch (err) {
          throw new Error(err);
        }
      }
    })
  ],
  pages:{
    error: "/login"
  }
});

export { handler as GET, handler as POST };
