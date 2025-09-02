import React, { useState,useEffect } from "react";
import "./SellCreditPopUp.css";
import "../../ClaimCredit/EarnCredit/EarnCreditsPopup.css";

const SellCreditPopUp = (props) => {

  
  const [amountToSell, setAmountToSell] = useState(null);
  const [unit, setUnit] = useState("CCT");

   const [availableCredits, setAvailableCredits] = useState(0);
      useEffect(() => {
      setAvailableCredits(Number(props.availableCredits)/1e18);
    
      }, [props.availableCredits]);

 async function handleSellCredit() {
  let sellingAmount;
  if (!isNaN(amountToSell) && amountToSell.trim() !== '') {
    // Convert the string to a number
    const num = parseFloat(amountToSell);

    // Find the number of decimal places
    const decimalPlaces = (amountToSell.split('.')[1] || '').length;

    // Convert to integer by truncating based on decimal places
    sellingAmount=Math.floor(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
} else {
    alert("add a valid amount");
}
    props.handleSellCredit(sellingAmount);
    props.popup(2);
}


  return (
    <>
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
      <div className="popup-title-parent">
        <h2 className="popup-title">Sell Credits</h2>
        <p className="popup-subtitle">
          Sell Carbon credit tokens in our marketplace.
        </p>
      </div>
      <div className="credit-details">
        <h2>Available Credits</h2>
        <h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-lightning-fill"
            viewBox="0 0 16 16"
          >
            <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
          </svg>{" "}
          {availableCredits} CCT
        </h2>
      </div>
      <div className="input-container">
        <label htmlFor="power-output" className="input-label">
          How much you want to sell?
        </label>
        <div className="input-group">
          <input
            type="text"
            id="power-output"
            placeholder="Enter the amount"
            className="input-field-sell"
             defaultValue=""
            value={amountToSell}
            onChange={(e) => setAmountToSell(e.target.value)}
          />
          <select
            className="input-select"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="CCT">CCT</option>
          </select>
        </div>
        <button className="confirm-button" onClick={handleSellCredit}>
        Sell
      </button>
      </div>
      
    </>
  );
};
export default SellCreditPopUp;
