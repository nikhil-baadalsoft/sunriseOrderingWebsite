import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./checkout.css";

function Checkout({
  cart,
  subtotal,
  selectedBranch,
  captureEvent,
}) {
  const navigate = useNavigate();

  const [paymentDetails, setPaymentDetails] =
    useState({
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });


  const ChangeCartStatus = async () => {
    try {
      const url = "https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/UpdateCartStatus";
      const cartid = sessionStorage.getItem("CartId");
      // debugger;
      console.log("CartId", cartid)
      if (cartid) {
        const payload = {
          "cartItemId": cartid,
          "isCartActive": false
        }
        console.log("Payload", payload)
        const response = await axios.put(url,payload);
        console.log("Response", response)
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  }

  const handlePayment = async () => {
    if (
      !paymentDetails.cardName ||
      !paymentDetails.cardNumber ||
      !paymentDetails.expiry ||
      !paymentDetails.cvv
    ) {
      return;
    }
    // await updateCartStatus()
    await ChangeCartStatus()
    await captureEvent("PAYMENT_SUBMITTED");

    navigate(`/order-success${window.location.search}`);
  };

  return (
    <div className="checkoutPage">

      <div className="checkoutHeader">
        <p className="menuSub">
          SUNRISE BAGELS · CHECKOUT
        </p>

        <h1 className="checkoutTitle">
          Payment Details
        </h1>

        <p className="checkoutDesc">
          Complete your order securely.
        </p>
      </div>

      <div className="checkoutLayout">

        <div className="paymentCard">

          <h2>Payment Information</h2>

          <div className="inputGroup" style={{ marginTop: "20px", }}>
            <label>
              Cardholder Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              value={
                paymentDetails.cardName
              }
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cardName:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="inputGroup">
            <label>
              Card Number
            </label>

            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              value={
                paymentDetails.cardNumber
              }
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cardNumber:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="cardRow">

            <div className="inputGroup">
              <label>
                Expiry Date
              </label>

              <input
                type="text"
                placeholder="MM/YY"
                value={
                  paymentDetails.expiry
                }
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    expiry:
                      e.target.value,
                  })
                }
              />
            </div>

            <div className="inputGroup">
              <label>
                CVV
              </label>

              <input
                type="password"
                placeholder="123"
                maxLength="4"
                value={
                  paymentDetails.cvv
                }
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cvv:
                      e.target.value,
                  })
                }
              />
            </div>

          </div>

          <button
            className="paymentBtn"
            onClick={handlePayment}
          >
            Pay $
            {subtotal.toFixed(2)}
          </button>

        </div>

        <div className="orderSummary">

          <h2>
            Order Summary
          </h2>

          <div className="storeInfoBox">

            <h3>
              {selectedBranch.name}
            </h3>

            <p>
              {
                selectedBranch.address
              }
            </p>

            <span>
              {
                selectedBranch.phone
              }
            </span>

          </div>

          {cart.map((item) => (
            <div
              className="summaryItem"
              key={item.itemId}
            >
              <span>
                {item.itemName} ×{" "}
                {item.quantity}
              </span>

              <span>
                $
                {(
                  item.price *
                  item.quantity
                ).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="summaryDivider"></div>

          <div className="summaryTotal">

            <span>Total</span>

            <strong>
              $
              {subtotal.toFixed(2)}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;