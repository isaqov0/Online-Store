import Hero from "@/components/hero";
import Product from "@/components/product";
import { ProductType } from "@/interfaces";

export default async function Home() {
  let products: ProductType[] = [];

  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    products = await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0">
        <section className="text-center mt-52">
          <h1 className="text-5xl font-bold">Error Loading Products</h1>
          <p className="text-lg text-gray-500">
            Unable to fetch products at the moment. Please try again later.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0">
      <Hero />
      <section className="flex flex-col space-y-12">
        <h1 className="text-5xl font-bold text-center">Online Store Detail</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
