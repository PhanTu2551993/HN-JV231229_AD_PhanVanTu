import React, { useContext } from 'react';
import { Avatar, Button, Drawer, InputNumber, List } from 'antd';
import { GlobalContext } from "../../context/Global";
import { handleFormatMoney } from "../../utils/formatData";
import { DeleteOutlined } from '@ant-design/icons';
import '../../App.css';

export default function ShoppingCart({ onClose, open }) {
  const { carts, handleSaveData } = useContext(GlobalContext);

  // Hàm giảm số lượng sản phẩm
  const handleDecreaseQuantity = (id) => {
    const updatedCarts = carts.map(cart => {
      if (cart.id === id) {
        return { ...cart, quantity: cart.quantity - 1 };
      }
      return cart;
    }).filter(cart => cart.quantity > 0);
    handleSaveData('carts', updatedCarts);
  };

  // Hàm tăng số lượng sản phẩm
  const handleIncreaseQuantity = (id) => {
    const updatedCarts = carts.map(cart => {
      if (cart.id === id) {
        return { ...cart, quantity: cart.quantity + 1 };
      }
      return cart;
    });
    handleSaveData('carts', updatedCarts);
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (id) => {
    const updatedCarts = carts.filter(cart => cart.id !== id);
    handleSaveData('carts', updatedCarts);
  };

  // Hàm xử lý thanh toán
  const handleCheckout = () => {
    // Sau khi thanh toán thành công, làm trống giỏ hàng
    handleSaveData('carts', []);
    onClose(); 
  };

  // Tính tổng giá tiền
  const totalAmount = carts.reduce((total, cart) => {
    return total + cart.product.price * cart.quantity;
  }, 0);

  return (
    <>
      <Drawer title="Giỏ hàng" onClose={onClose} open={open} width={500} >
        <div className="drawer-content">
          <div className="list-container">
            <List
              itemLayout="horizontal"
              locale={{ emptyText: 'Không có sản phẩm' }}
              dataSource={carts}
              renderItem={cart => (
                <List.Item
                  actions={[
                    <Button onClick={() => handleDecreaseQuantity(cart.id)}>-</Button>,
                    <InputNumber className='w-[60px]' value={cart.quantity} readOnly />,
                    <Button onClick={() => handleIncreaseQuantity(cart.id)}>+</Button>,
                    <Button onClick={() => handleRemoveFromCart(cart.id)} type="danger"><DeleteOutlined /></Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar size={80} shape='square' src={cart.product.image} />}
                    title={cart.product.name}
                    description={`Giá: ${handleFormatMoney(cart.product.price)}`}
                  />
                </List.Item>
              )}
            />
          </div>
          <div className="footer-container">
            <div className='flex justify-between'>
              <strong>Tổng tiền :</strong>
              <strong>{handleFormatMoney(totalAmount)}</strong>
            </div>
            <div>
              <Button type="primary" onClick={handleCheckout}>Thanh toán</Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
