import React, { createContext, useState } from "react";
import Header from "../layouts/header/Header";
import ListProduct from "../components/product/ListProduct";
import ProductJson from "../data.json";

// Tạo ngữ cảnh
export const GlobalContext = createContext();

export default function Global() {
  // Lấy dữ liệu carts trên localStorage
  const [carts, setCarts] = useState(() => {
    const cartLocals = JSON.parse(localStorage.getItem("carts")) || [];
    return cartLocals;
  });

  
  /**
   * Hàm lưu và cập nhật dữ liệu
   * @param {*} key Key của dữ liệu trên local
   * @param {*} data Dữ liệu cần lưu
   */
  const handleSaveData = (key, data) => {
    setCarts(data);
    localStorage.setItem(key, JSON.stringify(data));
  };


  // Hàm thêm sản phẩm vào giỏ hàng

  const handleAddToCart = (product) => {

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng
    const findIndexProduct = carts.findIndex(
      (cart) => cart.product.id === product.id
    );

    if (findIndexProduct === -1) {
      const newCart = {
        id: Math.ceil(Math.random() * 10000000),
        product: product,
        quantity: 1,
      };
      // Thêm sản phẩm vào trong giỏ hàng
      const updateCart = [...carts, newCart];
      setCarts(updateCart);
      localStorage.setItem("carts", JSON.stringify(updateCart));
    } else {
      const newCartUpdate = [...carts];
      // Tăng số lượng
      newCartUpdate[findIndexProduct].quantity =
        newCartUpdate[findIndexProduct].quantity + 1;

      setCarts(newCartUpdate);
      localStorage.setItem("carts", JSON.stringify(newCartUpdate));
    }
  };

  const dataGlobal = {
    products: ProductJson.products,
    carts,
    handleAddToCart,
    cartLength: carts.length,
    handleSaveData,
  };

  return (
    <>
      <GlobalContext.Provider value={dataGlobal}>
        <Header />
        <ListProduct />
      </GlobalContext.Provider>
    </>
  );
}
