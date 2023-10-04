import { ProductType } from "@/types/ProductType"
import formatPrice from "@/util/PriceFormat"
import Image from "next/image"
import Link from "next/link"

export default function Product({
  id,
  name,
  image,
  unit_amount,
  description,
  metadata }: ProductType) {
  const { features } = metadata;
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div className="text-gray-700">
        <Image
          alt={name}
          src={image}
          width={500}
          height={500}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-700 ">{unit_amount !== null ? formatPrice(unit_amount) : 'N/A'}</h2>
        </div>
      </div>
    </Link>
  )
}
