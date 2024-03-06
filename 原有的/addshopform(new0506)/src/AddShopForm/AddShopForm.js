import { useState } from "react";
import './AddShopForm.css';
function AddShopForm(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState(null);
  const [openingHours, setOpeningHours] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("picture", picture);
    formData.append("openingHours", openingHours);
    formData.append("category", category);
    formData.append("description", description);
    fetch("http://localhost:3000/api/shops", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((shop) => {
        props.onAddShop(shop);
        setName("");
        setAddress("");
        setPhone("");
        setPicture(null);
        setOpeningHours("");
        setCategory("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      // 使用者取消上傳照片
      return;
    }
  if (!file.type.includes('image')) {
    alert('請上傳店家圖片，不支援其他類型檔案上傳!');
    event.target.value = null; // clear the selected file
    return;
  }
  setPicture(file);
  };

  return (
    <div className="center">
    <form onSubmit={handleSubmit}>
      <label>
        店家名稱:
        <br/>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        地址:
        <br/>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <br />
      <label>
        電話號碼:
        <br/>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <br />
      <label>
        圖片:
        <br/>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      <br />
      <label>
        營業時間:
        <br/>
        <input
          type="text"
          value={openingHours}
          onChange={(e) => setOpeningHours(e.target.value)}
        />
      </label>
      <br />
      <label>
        類型:
        <br/>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <br />
      <label>
        簡介:
        <br/>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">新增</button>
    </form>
    </div>
  );
}
export default AddShopForm;
