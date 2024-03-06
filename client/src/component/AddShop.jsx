import { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import  Axios  from "axios";
import { Navigate } from 'react-router-dom';

Axios.defaults.withCredentials=true;

function AddShop(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState(null);
  const [openingHours, setOpeningHours] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [gotoLogin,setGotoLogin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // 檢查必填項目
    if (
      !name ||
      !address ||
      !phone ||
      !picture ||
      !openingHours ||
      !category ||
      !description
    ) {
      alert("請填寫所有必填項目");
      return;
    }
    let count=0;
    let errormessage='';
    // 使用正則表達式檢查格式是否符合數字且長度為10位數
  const phoneRegex = /^\d{10}$/;
  const regex = /^(04|09)/; // 正則表達式，匹配以「04」或「09」開頭的字串
  const isValidPhone = phoneRegex.test(phone);
  const isRightHead = regex.test(phone);
  if (!isValidPhone) {
    count++;
    errormessage=errormessage+'電話號碼格式錯誤';
  }
  else if(!isRightHead){
    count++;
    errormessage=errormessage+'電話號碼請以04或09開頭';
  }
  if(count!=0){
    alert(errormessage);
    return;
  }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("picture", picture);
    formData.append("openingHours", openingHours);
    formData.append("category", category);
    formData.append("description", description);
    fetch("http://localhost:4000/api/shops", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(
        alert('新增店家成功!')
      )
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
    if (!file.type.includes("image")) {
      alert("請上傳店家圖片，不支援其他類型檔案上傳!");
      event.target.value = null; // clear the selected file
      return;
    }
    setPicture(file);
  };


  useEffect(()=>{
    Axios.get("http://localhost:3001"+"/login")
    .then((response)=>{
        if(response.data.loggedIn===false){
          setGotoLogin(true);
        }
    });
},[]);

if(gotoLogin)
{
  return <Navigate to="/login"/>
}


  return (
    <>
    <div className="col col-lg-6 col-10 mx-auto mb-5 py-5">
      <h2 className="text-center">新增店家</h2>
      <form onSubmit={handleSubmit}  encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">店家名稱:</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">地址:</label>
          <input
            className="form-control"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">電話號碼：</label>
          <input
            className="form-control"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">圖片:</label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">營業時間:</label>
          <input
            className="form-control"
            type="text"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">類型:</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">請選擇</option>
            <option value="美食">美食</option>
            <option value="生活">生活</option>
            <option value="購物">購物</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">簡介:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          新增
        </button>
      </form>
    </div>
    </>
  );
}
export default AddShop;
