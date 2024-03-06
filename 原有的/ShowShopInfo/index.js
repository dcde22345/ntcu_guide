import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ShowShopInfo from './ShowShopInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <table>
    <tr  style={{width:'100%'}}>
      <th className='th1'>Photo</th>
      <th className='td2'>Shop</th>
      <th className='td3'>Address</th>
      <th className='td4'> Opening Hours</th>
      <th className='td5'>Phone</th>
      <th className='td6'>Google Maps</th>
    </tr>
    <ShowShopInfo />
  </table>
    
  </React.StrictMode>
);

