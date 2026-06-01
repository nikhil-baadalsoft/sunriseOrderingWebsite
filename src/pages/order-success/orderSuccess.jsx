import { useNavigate } from "react-router-dom";
import "./orderSuccess.css";

function OrderSuccess({
  subtotal,
  selectedBranch,
  captureEvent,
  setCart,
}) {
  const navigate = useNavigate();

  const handleDone = async () => {

    await captureEvent(
      "BACK_TO_MENU"
    );

    localStorage.removeItem(
      "latestOrder"
    );

    setCart([]);

    navigate(
      `/${window.location.search}`
    );
  };

  return (
    <div className="successPage">

      <div className="successCard">

        <div className="successCheck">
          ✓
        </div>

        <h1>
          Order Confirmed
        </h1>

        <p>
          Your Sunrise Bagels order
          has been placed
          successfully.
        </p>

        <div className="successStore">

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

        <div className="successOrderInfo">

          <div className="successRow">
            <span>
              Order Total
            </span>

            <strong>
              $
              {subtotal.toFixed(2)}
            </strong>
          </div>

          <div className="successRow">
            <span>
              Pickup Type
            </span>

            <strong>
              WALK-IN
            </strong>
          </div>

          <div className="successRow">
            <span>
              Status
            </span>

            <strong>
              Confirmed
            </strong>
          </div>

        </div>

        <button
          className="doneBtn"
          onClick={handleDone}
        >
          Back To Menu
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;