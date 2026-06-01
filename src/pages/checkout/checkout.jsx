import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handlePayment = async () => {
    if (
      !paymentDetails.cardName ||
      !paymentDetails.cardNumber ||
      !paymentDetails.expiry ||
      !paymentDetails.cvv
    ) {
      return;
    }

    await captureEvent(
      "PAYMENT_SUBMITTED"
    );

    navigate(
      `/order-success${window.location.search}`
    );
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

          <div className="inputGroup" style={{ marginTop: "20px",  }}>
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
              key={item.id}
            >
              <span>
                {item.name} ×{" "}
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