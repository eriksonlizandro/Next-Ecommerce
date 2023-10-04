'use client'

import { Session } from "next-auth"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Cart from "./Cart"
import { useCartStore } from "@/store"
import { AiFillShopping } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'

const cartStyle = 'bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center'

export default function Nav({ user }: Session) {
  const cartStore = useCartStore()
  return (
    <nav className="items-center flex justify-between py-12">
      <Link href={"/"}>
        <h1>Home</h1>
      </Link>
      <ul className="flex items-center gap-12">
        {/* Toggle Cart */}
        <li onClick={() => cartStore.toggleCart()} className="flex items-center text-3xl relative cursor-pointer  ">
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className={cartStyle}>
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* If user is not signed in */}
        {!user && (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign In</button>
          </li>
        )}
        {user && (
          <>
            <li>
              <Image
                src={user?.image as string}
                alt={user.name as string}
                width={36}
                height={36}
                className="rounded-full"
              />
            </li>
          </>
        )}
      </ul>
      <AnimatePresence>
        {cartStore.isOpen && <Cart />}
      </AnimatePresence>
    </nav>
  )
}
