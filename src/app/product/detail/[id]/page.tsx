import CustomImage from "@/components/image";
import NotFound from "./not-found";

interface Props {
  params: {
    id: string;
  };
}

const DetailPage = async ({ params: { id } }: Props) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      return NotFound();
    }

    const product = await res.json();

    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
        <CustomImage product={product} />
        <div className="divide-2">
          <div className="space-y-3 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
            <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
              ${product.price}
            </h2>
          </div>
          <div>
            <p className="text-xs md:text-sm">{product.description}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    NotFound();
  }
};

export default DetailPage;
