"use client";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between felxed top-0 w-full z-50 shadow bg-white">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt={"logo"} width={85} height={40} />
      </Link>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a href="/" className="mr-5 hover:text-gray-900">Home page</a>
        <a href="/products" className="mr-5 hover:text-gray-900">All products</a>
      </nav>
      <div className="flex items-center space-x-2.5 text-sm">
        <Link href={"/shopping-cart"}>
          <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
            My Bag
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
