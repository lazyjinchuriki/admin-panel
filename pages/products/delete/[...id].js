import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  function goBack() {
    router.push("/products");
  }
  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  return (
    <Layout>
      <h1>
        Do you really want to delete <b> {product?.name}</b>?
      </h1>
      <div className="flex gap-5">
        <button
          className=" bg-red-200 p-2 rounded-xl text-red-950 hover:bg-red-300"
          onClick={deleteProduct}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
        <button
          onClick={goBack}
          className=" bg-blue-200 p-2 rounded-xl text-blue-950 hover:bg-blue-300 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
}
