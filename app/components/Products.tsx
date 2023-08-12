import { ProductType } from "@/types/ProductType"
import formatPrice from "@/util/PriceFormat"
import Image from "next/image"

export default function Product({
  name,
  image,
  price }: ProductType) {
  return (
    <div>
      <Image
        alt={name}
        src={image}
        width={400}
        height={400}
      />
      <h1>{name}</h1>
      {price !== null ? formatPrice(price) : 'N/A'}
    </div>
  )
}
