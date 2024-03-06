// npm i node-fetch dotenv
const fetch = require("node-fetch"); // 載入node-fetch套件，使fetch函式可以在node.js中運行
const fs = require("fs"); // 載入fs套件以寫入txt檔
const database = require("./database");
const { error } = require("console");

// 請在以下變數中填入您的 API 金鑰和搜尋相關資訊
const apiInfo = {
  apiKey: "", // 請將YOUR_API_KEY替換為你的 API 金鑰，不然我的免費額度會被用完TT
  latitude: 24.143367886419497, // 台中教育大學的緯度
  longitude: 120.67222743068577, // 台中教育大學的經度
  radius: 1000, // 搜尋半徑，單位為公尺
  keyword: "五金", // 想要搜尋的店家類型，要搜尋美食、購物、生活、其他四種
};

const fetchGoogleApi = async () => {
  try {
    database.connect();
    await fetchNextPage(null);
    database.disconnect();
  } catch {
    console.error("發生錯誤:", error);
  }
};

let counter = 1;

// 因為一次只能抓20個店家，所以使用page token換頁抓更多店家
const fetchNextPage = async (nextPageToken) => {
  try {
    const url =
      nextPageToken === null
        ? `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pageToken=${nextPageToken}&location=${apiInfo.latitude},${apiInfo.longitude}&radius=${apiInfo.radius}&keyword=${apiInfo.keyword}&key=${apiInfo.apiKey}`
        : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&location=${apiInfo.latitude},${apiInfo.longitude}&radius=${apiInfo.radius}&keyword=${apiInfo.keyword}&key=${apiInfo.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const places = data.results;
    
    for (const place of places) {
      const id = place.place_id;
      console.log(counter, place.name);
      await fetchPlaceDetail(id);
      counter++;
    }

    // api限制一次最多60家
    if (counter < 60) {
      await fetchNextPage(data.next_page_token); // 遞迴呼叫，取得下一頁的結果
    } else {
      console.log("所有頁面的店家資訊已獲取完畢");
    }
  } catch (error) {
    console.error("發生錯誤:", error);
  }
};

const fetchPlaceDetail = async (placeId) => {
  try {
    const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiInfo.apiKey}&language=zh-TW`;

    const response = await fetch(detailUrl);
    const data = await response.json();

    // 在這裡處理回傳的地點詳細資訊
    const place = data.result;
    const photoPath = `../client/uploads/${Date.now() + "-" + Math.round(Math.random() * 1e9)}.jpg`;
    let photoReference = "";
    let weekdayText = "";

    if ("photos" in place) {
      photoReference = place.photos[0].photo_reference;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${apiInfo.apiKey}`;
      await downloadPhoto(photoUrl, photoPath);
    }

    if ("opening_hours" in place) {
      for (const dayText of place.opening_hours.weekday_text) {
        weekdayText += `${dayText}\n`;
      }
    } else {
      weekdayText = "目前未設置營業時間";
    }

    const placeDetail = {
      name: place.name,
      address: place.formatted_address,
      phone:
        "formatted_phone_number" in place
          ? place.formatted_phone_number
          : "目前未設置電話",
      opening_hours: weekdayText,
      rating: place.rating,
      review: "reviews" in place ? place.reviews[0].text : "目前未設置簡介",
      photo: ("photos" in place) ? photoPath.slice(10) : "目前未設置圖片",
      type: "其他",
    };
    database.insertShops(placeDetail);
  } catch (error) {
    console.error(error);
  }
};

const downloadPhoto = async (url, path) => {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFileSync(path, buffer);
    return buffer;
  } catch (error) {
    console.error("下載圖片時發生錯誤:", error);
    throw error;
  }
};

fetchGoogleApi();
