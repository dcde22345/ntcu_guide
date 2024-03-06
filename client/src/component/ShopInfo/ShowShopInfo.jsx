import React, { useState } from 'react';



const ShowShopInfo = (props) => {
  const { shops } = props;

  return (
    <div>
      <ShopInfo
        photo={shops.photo}
        name={shops.name}
        address={shops.address}
        openingHours={shops.openingHours}
        phone={shops.phone}
        g_map={shops.g_map}
      />
    </div>
  )
};

export default ShowShopInfo;
