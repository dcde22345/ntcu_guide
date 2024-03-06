import React, { useState } from 'react';
import './ShowShopInfo.css';
import ShopInfo from './ShopInfo';

  const Search = (props) => {
    const { shops } = props;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showAllShops, setShowAllShops] = useState(false);
  
    const handleSearchChange = (event) => {
      setSearchKeyword(event.target.value);
    };
  
    // 進行搜尋時才過濾店家
    const filteredShops = showAllShops
      ? shops
      : shops.filter((shop) =>
          shop.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
  
    return (
      <>
        <input
          type="text"
          placeholder="Search shop name"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
        <table className="table1">
        <thead>
        <tr>
        <td>Photo</td>
        <td>Shop</td>
        <td>Address</td>
        <td> Opening Hours</td>
        <td>Phone</td>
        <td>Google Maps</td>
        </tr>
        </thead>
        </table>
        {filteredShops.map((shop, index) => (
          <ShopInfo key={index} {...shop} />
        ))}
      </>
    );
  };
  
  export default Search;
  
  