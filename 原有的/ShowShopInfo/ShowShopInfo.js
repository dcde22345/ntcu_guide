import React, { useState } from 'react';
import ShopInfo from './ShopInfo';
import './App.css';

const App = () => {
  const [shopInfo1, setShopInfo] = useState({
    photo: 'https://lh5.googleusercontent.com/p/AF1QipNo8Mw8egG0ksQzY-n7wMItTsK8FrsA4gPtnvR2=w408-h544-k-no',
    name: '多客多早午餐',
    address: '403台中市西區金山路3-1號',
    openingHours: '一-五、日06:00–13:00',
    phone: '(04) 2225-9088',
    g_map: 'https://goo.gl/maps/aUC4fkCtkMP7LSmE9',
  });
  const [shopInfo2, setShopInfo2] = useState({
    photo: 'https://lh5.googleusercontent.com/p/AF1QipPjbg4wFIvWwLnzjMCjiX28Dky7vM3bNnw5wqM1=w408-h725-k-no',
    name: '順記現炒',
    address: '403台中市西區金山路10之5號',
    openingHours: '一-五、日11:20-20:00',
    phone: '(04) 2221-3131',
    g_map: 'https://goo.gl/maps/cTvbSQ8hmX6GfFsE7',
  });

  return (
    <div>
      
  </div>
  );
};

export default App;
