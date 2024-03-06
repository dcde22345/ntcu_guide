import { useState } from 'react';

const AddShopForm = () => {
  // 使用 useState 鉤子來管理表單的狀態
  const [shopName, setShopName] = useState('');
  const [shopImage, setShopImage] = useState('');
  const [address, setAddress] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [phone, setPhone] = useState('');

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();
    // 在這裡可以使用表單資訊進行相應的處理，例如發送 API 請求儲存店家資訊到後端資料庫
    console.log('提交表單', {
      shopName,
      shopImage,
      address,
      businessHours,
      phone,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        店名:
        <br></br>
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
      </label>
      <br></br>
      <label>
        店家圖片:
        <br></br>
        <input
          type="file"
          onChange={(e) => setShopImage(e.target.files[0])}
        />
      </label>
      <br></br>
      <label>
        地址:
        <br></br>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <br></br>
      <label>
        營業時間:
        <br></br>
        <input
          type="text"
          value={businessHours}
          onChange={(e) => setBusinessHours(e.target.value)}
        />
      </label>
      <br></br>
      <label>
        電話:
        <br></br>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <br></br>
      <button type="submit">提交</button>
    </form>
  );
};

export default AddShopForm;
