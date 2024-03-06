import React from 'react';
import SnakeGame from './AddShopForm/AddShopForm';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // 在此處設定標題
    document.title = 'Guide App';
  }, []);
  return (
    <div>
      <SnakeGame />
    </div>
  );
}

export default App;
