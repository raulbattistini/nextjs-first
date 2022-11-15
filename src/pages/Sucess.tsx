import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import randomstring from "randomstring";
import { Button } from "../components/Button";
import Currency from "react-currency-formatter";
import { GetServerSideProps } from "next";
import { fetchLineItems } from "../utils/fetchLineItems";

interface IProps {
  products: StripeProduct[];
}

export const Sucess = ({ products }: IProps) => {
  console.log(products);

  const router = useRouter();

  const { session_id } = router.query;

  const [mounted, setMounted] = useState(false);

  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const subtotal = products.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  );

  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isTabletOrMoble = useMediaQuery({ query: "(max-width: 1024px)" });

  const showOrderSummaryCondition = isTabletOrMoble ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };
  return (
    <div>
      <Head>
        <title>Thank you! - Apple</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <header className="mx-auto max-w-xl">
        {" "}
        <Link href="/">
          <div>
            <Image
              src="/apple.png"
              fill
              className="object-contain"
              alt="Apple Logo"
            />
          </div>
        </Link>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href="/">
            <div className="relative ml-14 hidden h-24 w-12 cursor-pointer transition lg:inline-flex">
              <Image
                src="https://unsplash.com/random"
                alt="image"
                fill
                className="object-container"
              />
            </div>
          </Link>
          <div className="my-8 ml-4 flex space-x-4 lg:ml-14 xl:ml-0">
            <div className="fkex h-11 w-11 items-center justify-center rounded-full border-2 border-black">
              <CheckIcon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg">
                Thank you{session ? session.user?.name?.split(" ")[0] : "Guest"}
              </h4>
            </div>
          </div>
          <div className="mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14">
            <div className="space-y-2 pb-3">
              <p>Your order is confirmed</p>
              <p className="text-sm text-gray-600">
                {" "}
                We have accepted your order and we are getting it ready. <br />{" "}
                Come back to this page later to see updates on your shipment
                status.
              </p>
            </div>
            <div className="pt-3 text-sm">
              <p>Your other tracking number: </p>
              <p>
                {randomstring.generate({
                  length: 10,
                  charset: "alphanumeric",
                })}
              </p>
            </div>
          </div>
          <div className="my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14">
            <p>Order updates:</p>
            <p className="text-sm text-gray-600">
              You are going to receive your delivery updates by email and text.
            </p>
          </div>
          <div className="mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row">
            <p className="hidden lg:inline">
              {" "}
              Need help? Contact us at clients-support@apple.com
            </p>
            {mounted && (
              <Button
                title="Continue shopping"
                onClick={() => router.push("/")}
                width={isTabletOrMoble ? "w-full" : undefined}
                padding="py-4"
              />
            )}
          </div>
        </section>
        {mounted && (
          <section className="overflw-y-scroll border-y border-1 border-gray-300 bg-[#fafafa] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full ${
                showOrderSummaryCondition && "border-b"
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6">
                <button
                  onClick={handleShowOrderSummary}
                  className="flex items-center space-x-2"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <p> Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
                <p className="text-xl font-medium text-black">
                  <Currency quantity={subtotal + 20} />
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div className="mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16">
                <div className="space-y-4 pb-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 text-sm font-medium"
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#f1f1f1] text-xs text-white">
                        <div className="relative h-7 w-7 animate-bounce rounded-md">
                          <Image
                            src="https://unsplash.com/random"
                            alt="random image"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
                          {product.quantity}
                        </div>
                      </div>
                      <p className="flex-1"> {product.description} </p>
                      <p>
                        {" "}
                        <Currency
                          quantity={product.price.unit_amount / 100}
                          currency={product.currency}
                        />{" "}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1 py-4">
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Subtotal</p>
                    <p className="font-medium">
                      {" "}
                      <Currency quantity={subtotal} />
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Discount</p>
                    <p className="text-[gray]"></p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Shipping</p>
                    <p className="font-medium">
                      <Currency quantity={0} currency="USD" />
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p>Total</p>
                  <p className="flex items-center gap-x-2 text-xs text-[gray]">
                    USD
                  </p>
                  <span className="text-xl font-medium text-black">
                    <Currency quantity={subtotal} />
                  </span>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  query,
}) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId);

  return {
    props: {
      products,
    },
  };
};
