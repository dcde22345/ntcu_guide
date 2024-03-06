// 載入翻譯套件
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

// 載入.env檔中的credential
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// 建立翻譯客戶端
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

// 定義要翻譯的文字和目標語言
const text = 'Hello, world!'; // 要翻譯的文字
const targetLanguage = 'zh-TW'; // 目標語言代碼，例如中文繁體（'zh-TW'）

// 執行翻譯
async function translateText() {
  try {
    const [translation] = await translate.translate(text, targetLanguage);
    console.log(`翻譯結果：${translation}`);
  } catch (error) {
    console.error('翻譯時發生錯誤：', error);
  }
}

// 呼叫翻譯函式
translateText();