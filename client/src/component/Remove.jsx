import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopList = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetchShopData();
  }, []);

  const fetchShopData = async () => {
    try {
      const response = await axios.get('/api/shops'); // 假设API路径为'/api/shops'
      setShops(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shops/${id}`); // 假设删除API路径为'/api/shops/:id'
      setShops(shops.filter((shop) => shop.id !== id));
      alert('商店已删除');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>商店列表</h1>
      <table>
        <thead>
          <tr>
            <th>店家ID</th>
            <th>名稱</th>
            <th>地址</th>
            <th>   </th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.id}>
              <td>{shop.id}</td>
              <td>{shop.Name}</td>
              <td>{shop.address}</td>
              <td>
                <button onClick={() => handleDelete(shop.id)}>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopList;