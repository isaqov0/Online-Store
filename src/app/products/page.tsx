import Cta from "@/components/cta";
import Feature from "@/components/feature";
import Products from "@/components/product";
import { ProductType } from "@/interfaces";
import React from "react";

const ProductsPage = async () => {
  let products: ProductType[] = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    products = await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0">
      <Feature />
      <section className="flex flex-col space-y-12">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
              <Products key={product.id} product={product} />
            ))}
        </div>
      </section>
      <Cta />
    </main>
  );
};

export default ProductsPage;
