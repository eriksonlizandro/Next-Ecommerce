import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    //add another provider
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15'
      })

      //create stripe customer
      if (user.name && user.email) {
        const costumer = await stripe.customers.create({
          email: user.email || undefined,
          name: user.name || undefined,
        })

        //update prisma db with the stripecustomerid 
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: costumer.id },
        })
      }
    }
  },
  callbacks: { 
    async session({ session, token, user}) {
      session.user = user
      return session
    }
  },
}

export default NextAuth(authOptions)
