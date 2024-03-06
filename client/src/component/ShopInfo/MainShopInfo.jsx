import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const MainShopInfo = () => {
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5175/api/shops")
      .then((response) => response.json())
      .then((data) => {
        setShops(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getImageUrl = (id) => {
    return `http://localhost:5175/api/shops/${id}/picture`;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setSelectedShop(null); //
  };

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
  };

  const filteredShops = shops.filter((shop) => {
    return shop.名稱.includes(searchTerm) || shop.地址.includes(searchTerm);
  });

  const getFilteredShopsByType = (type) => {
    return filteredShops.filter((shop) => shop.類型 === type);
  };

  return (
    <div>
      {selectedShop ? (
        <div>
          <img src={selectedShop.圖片} alt="讀不到圖片" className="shopPhoto" />
          <h2>{selectedShop.名稱}</h2>
          <p>地址 &nbsp; {selectedShop.地址}</p>
          <p>營業時間 &nbsp; {selectedShop.營業時間}</p>
          <p>電話 &nbsp; {selectedShop.電話}</p>
          <p>
            關於 {selectedShop.名稱}
            <br></br>
            {selectedShop.簡介}
          </p>
          <Rating name="評分" value={selectedShop.評分} readOnly />
          <br />
          <a
            href={`https://www.google.com/maps/place/${selectedShop.名稱}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="src/component/ShopInfo/Google_Maps_icon_(2020).png"
              width="30px"
              height="40px"
            ></img>
            &nbsp;View on Google Maps
          </a>
          <br></br>
          <button
            onClick={() => setSelectedShop(null)}
            style={{ width: "10%" }}
            className="btn btn-outline-success"
            type="submit"
          >
            返回店家列表
          </button>
        </div>
      ) : (
        <div>
          <h2>{selectedType}</h2>

          {selectedType ? (
            <div>
              <input
                type="text"
                placeholder="搜尋店家、地址"
                value={searchTerm}
                onChange={handleSearch}
              />
              <p>點擊店家即可查看該店家詳細資訊</p>
              <button
                onClick={() => setSelectedType(null)}
                className="btn btn-outline-success"
              >
                返回店家類型
              </button>
              {getFilteredShopsByType(selectedType).map((shop) => (
                <Box
                  key={shop.店家ID}
                  sx={{ border: "3px solid #ccc", p: 5, mb: 3 }}
                  onClick={() => handleShopClick(shop)}
                >
                  <img src={shop.圖片} alt="讀不到圖片" className="shopPhoto" />
                  <br></br>
                  <h2>{shop.名稱}</h2>
                  <p>{shop.地址}</p>
                  <Rating name="評分" value={shop.評分} readOnly />
                  <p>店家類型 &nbsp; {shop.類型}</p>
                </Box>
              ))}
            </div>
          ) : (
            <div>
              <h2>店家類型</h2>
              <button
                onClick={() => handleTypeClick("美食")}
                className="btn btn-outline-success"
              >
                美食
              </button>
              <button
                onClick={() => handleTypeClick("生活")}
                className="btn btn-outline-success"
              >
                生活
              </button>
              <button
                onClick={() => handleTypeClick("購物")}
                className="btn btn-outline-success"
              >
                購物
              </button>
              <button
                onClick={() => handleTypeClick("其他")}
                className="btn btn-outline-success"
              >
                其他
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainShopInfo;
