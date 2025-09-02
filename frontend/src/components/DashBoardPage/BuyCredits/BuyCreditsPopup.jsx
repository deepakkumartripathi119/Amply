import React, { useState } from "react";
import "../ClaimCredit/EarnCredit/EarnCreditsPopup.css";

const BuyCreditsPopup = (props) => {

  

  const [unit, setUnit] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);

  const handleBuyCredit = ()=>{
    props.handleBuyAmount(buyAmount);
  }



  return (
    // <div className="popup-container earnCreditPopup">
    <>
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
     <div className="popup-title-parent">
     <h2 className="popup-title">Buy Credits</h2>
     </div>
      <div className="input-container">
        <label htmlFor="power-output" className="input-label">
          Enter the amount you want to buy
        </label>
        <div className="input-group">
          <input
            type="number"
            id="power-output"
            placeholder="Enter the amount"
            className="input-field-earn"
             defaultValue=""
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
          />
          <select
            className="input-select"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="CCT">CCT</option>
          </select>
        </div>
        <button className="confirm-button" onClick={handleBuyCredit}>Confirm</button>
      </div>
      
    </>
  );
};

export default BuyCreditsPopup;
