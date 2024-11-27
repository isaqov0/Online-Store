"use client";
import CustomImage from "@/components/image";
import { ProductType } from "@/interfaces";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import ReactStars from "react-stars";

const ShoppingCart = () => {
  const [total, setTotal] = useState<number>(0);

  const [products, setProducts] = useState<ProductType[]>(
    JSON.parse(localStorage.getItem("carts") as string) ?? []
  );

  function removeProduct(id: string) {
    const updatedCarts = products.filter((c) => c.id !== id);

    localStorage.setItem("carts", JSON.stringify(updatedCarts));
    setProducts(updatedCarts);
  }

  function decrement(id: string) {
    const exitProduct = products.find((c) => c.id === id);
    if (exitProduct?.quantity === 1) {
      removeProduct(id);
    } else {
      const updatedQuantity = products.map((c) => {
        if (c.id !== id) {
          return c;
        }
        return {
          ...c,
          quantity: c.quantity - 1,
        };
      });

      localStorage.setItem("carts", JSON.stringify(updatedQuantity));
      setProducts(updatedQuantity);
    }
  }

  function increment(id: string) {
    const updatedQuantity = products.map((c) => {
      if (c.id !== id) {
        return c;
      }
      return {
        ...c,
        quantity: c.quantity + 1,
      };
    });

    localStorage.setItem("carts", JSON.stringify(updatedQuantity));
    setProducts(updatedQuantity);
  }

  useEffect(() => {
    const totalPrice = products.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
    setTotal(totalPrice);
  }, [products]);
  return (
    <>
      {products.length ? (
        <div className="h-screen bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <div className="relative w-52">
                    <CustomImage product={product} fill />
                  </div>
                  <div className="sm:ml-4 sm:flex sm:w-full gap-x-4 sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {product.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center text-sm my-4">
                        <p>{product?.rating.rate}</p>
                        {product?.rating.rate && (
                          <div className="flex items-center ml-2 mr-6">
                            <ReactStars
                              value={product.rating.rate}
                              edit={false}
                            />
                          </div>
                        )}
                        <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                          See all {product?.rating.count} reviews
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() => decrement(product.id)}
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={product.quantity}
                          readOnly
                          min="1"
                        />
                        <span
                          onClick={() => increment(product.id)}
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          {(product.quantity * product.price).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          )}
                        </p>
                        <svg
                          onClick={() => removeProduct(product.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">
                  {(10).toLocaleString("en-US", {
                    style: "currency",
                    currency: "usd",
                  })}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {(total + 10).toLocaleString("en-US", {
                      style: "currency",
                      currency: "usd",
                    })}{" "}
                    USD
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-600 py-3 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen no-file-found flex flex-col items-center justify-center pb-64 py-8 px-4 text-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <svg
            className="w-12 h-12 dark:text-gray-400 text-gray-700"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="200px"
            width="200px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="File_Off">
              <g>
                <path d="M4,3.308a.5.5,0,0,0-.7.71l.76.76v14.67a2.5,2.5,0,0,0,2.5,2.5H17.44a2.476,2.476,0,0,0,2.28-1.51l.28.28c.45.45,1.16-.26.7-.71Zm14.92,16.33a1.492,1.492,0,0,1-1.48,1.31H6.56a1.5,1.5,0,0,1-1.5-1.5V5.778Z"></path>
                <path d="M13.38,3.088v2.92a2.5,2.5,0,0,0,2.5,2.5h3.07l-.01,6.7a.5.5,0,0,0,1,0V8.538a2.057,2.057,0,0,0-.75-1.47c-1.3-1.26-2.59-2.53-3.89-3.8a3.924,3.924,0,0,0-1.41-1.13,6.523,6.523,0,0,0-1.71-.06H6.81a.5.5,0,0,0,0,1Zm4.83,4.42H15.88a1.5,1.5,0,0,1-1.5-1.5V3.768Z"></path>
              </g>
            </g>
          </svg>
          <h3 className="text-xl font-medium mt-4 text-gray-700 dark:text-gray-200">
            Shoping carts is empty
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            The file you are looking for could not be located.
          </p>
          <Link href={"/products"}>
            <button className="button bg-blue-600 mt-4 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
              All Products
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
