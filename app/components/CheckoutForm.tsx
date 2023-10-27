'use client'

import React, { useState, useEffect, useCallback, ChangeEvent } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"

//styles variables
const payButton = `py-2 mt-4  w-full bg-teal-700 rounded-md text-white disabled:opacity-25`
const input = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`

const initialUserData = {
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  city: "",
  state: "", 
  address: "",
}

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(initialUserData);
  // const [error, setError] = useState(false)

  const cartStore = useCartStore()

  //update form data 
  const updateUserDataHandler = useCallback(
    (type: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [type]: event.target.value });
    },
    [userData]
  );

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)

  const formattedPrice = formatPrice(totalPrice)

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return
    }
  }, [stripe])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setIsLoading(true)

    console.log('User:',userData)
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          cartStore.setCheckout('success')
        }
        setIsLoading(false)
      })
  }


  // name: "",
  // email: "",
  // phoneNumber:"",
  // city: "",
  // state:"",
  // address: "",
  // SmokeClean Sup

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="form-group">
          <input className={input}
            type="name"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={updateUserDataHandler("name")}
            required
          />
          <div className="error" id="usernameError" />
        </div>
        <div className="form-group">
          <input className={input}
            type="lastname"
            name="lastname"
            placeholder="Last name"
            value={userData.lastName}
            onChange={updateUserDataHandler("lastName")}
            required
          />
          <div className="error" id="usernameError" />
        </div>
        <div className="form-group">
          <input
            className={input}
            id="email"
            type="email"
            name="email"
            placeholder="Emails"
            value={userData.email}
            onChange={updateUserDataHandler("email")}
            required
          />
          <div className="error" id="usernameError" />
        </div>
        <div className="form-group">
          <input
            className={input}
            id="phone"
            type="phone"
            name="phone"
            placeholder="Phone"
            value={userData.phoneNumber}
            onChange={updateUserDataHandler("phoneNumber")}
            required
          />
          <div className="error" id="usernameError" />
        </div>
        <div className="form-group">
          <input className={input}
            type="city"
            name="city"
            placeholder="City"
            value={userData.city}
            onChange={updateUserDataHandler("city")}
            required />
          <div className="error" id="passwordConfirmError" />
        </div>

        <div className="form-group">
          <input className={input}
            type="state"
            name="state"
            placeholder="Province"
            value={userData.state}
            onChange={updateUserDataHandler("state")}
            required />
          <div className="error" id="passwordConfirmError" />
        </div>
      </div>
      <div className="form-group">
        <input className={input}
          type="address"
          name="address"
          placeholder="Address"
          value={userData.address}
          onChange={updateUserDataHandler("address")}
          pattern=".{5,}"
          required />
        <div className="error" id="passwordError" />
      </div>

      {/* // payment */}

      <PaymentElement />
      <h1 className="py-4 text-sm font-bold ">
        Total: {formattedPrice}
      </h1>
      <button
        className={payButton}
        id="submit" disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text">
          {isLoading ? <span>Processing</span> : <span>Pay now</span>}
        </span>
      </button>
    </form>
  )
}

export default CheckoutForm; 
