'use client'

import { useCartStore } from "@/store"
import { AddCartType } from "@/types/AddCartType"
import { useState } from "react"

const AddCart = ({
  id,
  name,
  image,
  quantity,
  unit_amount,
}: AddCartType) => {
  const cartStore = useCartStore()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    cartStore.addProduct({
      id,
      name,
      image,
      quantity,
      unit_amount,
    })
    setAdded(true)
    setTimeout(()=> {
      setAdded(false)
    }, 500)
  }
  return (
    <>
      <button onClick={()=> cartStore.addProduct({
      id,
      name,
      image,
      quantity,
      unit_amount,
    })} className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700 ">
        Add to cart
      </button>
    </>
  )
}

export default AddCart;
