import React from 'react';

const ShopInfo = ({ photo, name, address, openingHours, phone, g_map }) => {
  return (
    <table className="table2">
      <tbody>
        <tr>
          <th><img src={photo} alt={"照片下架了!!"} width="150" height="150"></img></th>
          <th className='shopname'>{name}</th>
          <th>{address}</th>
          <th>{openingHours}</th>
          <th>{phone}</th>
          <th><a href={g_map} target="_blank"><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADTklEQVR4AcWUY7AbURxHb23btruoEdYKatt4rG3b5ia1bdu2oyKeF93e7Uw69yHZF/bMnM/nN/+9s8B3YIpCEarahSK+9ywUoZ5QKFI1o2CUaniByG8NK02GaUGoKD7yV/aCkeo5yM8FI1UwocWiNV95040q5AzxZGPeoMYLRKilKKLCg7hFozW2htOMkD/D5FbHn26UByWOAsOQLk/xwlEqWG+K4V8clzfDNCag+PlWHftUHf7c6SleCElP/s3GPDvTOMivuJZHltMIKPPrJjwTb/C1JAdUH/+LjXBpEU3TlwG+ohHQu9EAyPpJVN/Vue8BiMcrjtFxxt3WW7Vju09xlZgugcJONu5WJaDh2G4r/8aLx7Av3jxFMMPIE041VRFMN0WgkCGpeP1lh20kI3UQ2yQFQHJBweF4HHe3bPDVmlN/EyAB/OnWYoIZpm94vOHCW5DcJXeiAZBQSCJ9GbAnyQFi0mKam78n8IBgprmtO9547htI7ewGUdztVl8GXEsUF5Iu67qcZjgZpASegDAFiv/izdJAettgPA4pRnrJlwEPEg4wzcsPbWdSvQcc8Gfq39fePMHJRnEJRvo0+QOE5Ek8ro8tAe1nUrPa4XmQHXig8eRf2eusX6jHw/5eYLM7/qtvOWg/ncY9ADrOpFoBPFB7a/RCPIpL7JIqfLgAPYyN6+RVHbaj6dgwrgs5AV0i9b9PrwSpVhyuvASFnF4GDE/+X1BUo6C2CaGP25MRDyf0FbrGGvvZ1Hufncipq81IrHgwoTTTrizwBcu2bPvZEJea05lgM2WLOG9xUiE7BXwl7mTa8igQ5y1uPpMW9trLYyNepZTyRsAf7KdTT/Y2YPx+mjNOMJLtwF/gMZAOhV4kFV9/qCJnnFRIPxM7O+UGgWA7naYGClrw+KljRSHFEUfaCaW8PggG6LV3cccfn8gN6yja2Tm/u0IyBgQT9B4WfTuZ2d5Q0fY39+llxwEEKUAwYX88zZXN9nM/OumXGkp5HhAKauyQFEMRvZcBjpq7ZA1AKCF3Sbp5GTAOhAP2z5bE6R/g3z2kUIyESjigJiNrCcIJxUhPYAPugXCDvwV0/ggQbmpt75IVxa1IRx2lvBD4HxCMTM5eAgTAH+U/98Xb8bmuAAAAAElFTkSuQmCC'></img>View on Google Maps</a></th>
        </tr>
      </tbody>
    </table>
  );
};

export default ShopInfo;
