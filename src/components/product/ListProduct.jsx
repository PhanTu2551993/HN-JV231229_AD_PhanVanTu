import React, { useContext } from "react";
import { GlobalContext } from "../../context/Global";
import ProductItem from "./ProductItem";

export default function ListProduct() {
  const { products } = useContext(GlobalContext);

  return (
    <>
      <main className="px-12">
        <h3 className="text-center uppercase font-semibold py-[24px]">
          Danh sách sản phẩm
        </h3>

        <div className="grid-cols-5 grid gap-3">
          {products.map((pro) => {
            return <ProductItem product={pro} key={pro.id} />;
          })}
        </div>
      </main>
    </>
  );
}
