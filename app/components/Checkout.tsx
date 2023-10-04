'use client'

import { useState, useEffect } from "react"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useCartStore } from "@/store"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "react-query"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const Checkout = () => {
  const cartStore = useCartStore()
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("")
  
  useEffect(() => {
    const url = '/api/create-payment-intent'
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    const data = {
      items: cartStore.cart,
      payment_intent_id: cartStore.paymentIntent,
    }
    axios.post(url, data, config)
      .then(response => {
        return response.data
      })
      .then(data => {
        setClientSecret(data.paymentIntent.client_secret)
        cartStore.setPaymentIntent(data.paymentIntent.id)
      })
      .catch(err => {
        if (err.response.status === 403) {
          return router.push('/api/auth/signin')
        } else {
          console.log(err)
        }
      })

  }, [])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: "floating"
    }

  }
  return (
    <div>
      {clientSecret && (
        <div>
          <Elements options={options} stripe={stripePromise}>
            <h1>Form</h1>
          </Elements>
        </div>
      )}
    </div>
  )
}

export default Checkout
