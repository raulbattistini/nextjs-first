import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../app/basketSlice";
import { urlFor } from "../config/sanity";
import Currency from "react-currency-formatter";

interface IProps {
  items: Product[];
  id: string;
}

export const CheckoutProduct = ({ id, items }: IProps) => {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} was removed from the basket`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center">
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          fill
          className="object-contain"
          alt="Product's Image"
        />
      </div>
      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96"> {items[0].title}</h4>
            <p className="flex items-end gap-x-1 font-semibold">
              {items.length}
              <ChevronDownIcon className="h-6 w-6 text-blue-500" />
            </p>
          </div>

          <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
            Show Product Details
            <ChevronDownIcon className="h-6 w-6" />
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">
            <Currency
              quantity={items.reduce((total, item) => total + item.price, 0)}
              currency="USD"
            />
          </h4>
          <button
            onClick={removeItemFromBasket}
            className="text-blue-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
      CheckoutProduct
    </div>
  );
};
