import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
      // console.log(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <Layout>
      <h1>Products</h1>

      <div className="max-w-4xl mx-auto">
        <Link
          className={
            "border-2 border-blue-500  hover:bg-blue-500 rounded-full p-1.5 flex w-min  "
          }
          href={"/products/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>

        {loading && (
          <div className="flex justify-center items-center ">
            <Spinner />
          </div>
        )}

        <div className="flex flex-wrap justify-center">
          {products.map((product) => (
            <>
              <Link href={`/products/edit/${product._id}`}>
                <div
                  className="bg-white flex flex-col items-center justify-center m-4 p-4 rounded-lg shadow-md   cursor-pointer"
                  key={product._id}
                >
                  <Link href={`/products/delete/${product._id}`}></Link>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-52 h-52 object-contain"
                  />
                  <h3 className="text-lg mt-2">{product.name}</h3>
                  <div className="flex justify-between">
                    <button className="bg-red-500 p-2 rounded-3xl m-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <b className="text-2xl font-semibold py-2 font-sans">{`₹${product.price}`}</b>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </Layout>
  );
}
