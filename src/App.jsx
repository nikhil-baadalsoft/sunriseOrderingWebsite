import { useEffect, useState } from "react";
import axios from "axios";

import { Routes, Route, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Locations from "./pages/locations/locations";
import Checkout from "./pages/checkout/checkout";
import OrderSuccess from "./pages/order-success/orderSuccess";
import "./App.css";

const menuItems = [
  {
    id: "1",
    name: "All Day Breakfast",
    price: 12.99,
    description: "",
    image:
      "https://ebcatering.com/usercontent/product_sub_img/f07d08f6-9037-6a2d-8fad953df5bed1ed.jpg",
  },
  {
    id: "2",
    name: "Bagels & Shmear",
    price: 10.49,
    description: "",
    image:
      "https://ebcatering.com/usercontent/product_sub_img/ed9e3f7c-c201-1ad5-79719fa1355f4d58.png",
  },
  {
    id: "3",
    name: "Lunch Classics",
    price: 8.99,
    description: "",
    image:
      "https://ebcatering.com/usercontent/product_sub_img/EBBCatering-Category-Lunch-850x480.jpg",
  },
  {
    id: "4",
    name: "Individual Meals",
    price: 14.5,
    description: "",
    image:
      "https://ebcatering.com/usercontent/product_sub_img/EBBCatering-Category-IndividualMeals-850x480.jpg",
  },
  {
    id: "5",
    name: "Sides & Sweets",
    price: 18.99,
    description: "",
    image:
      "https://ebcatering.com/usercontent/product_sub_img/8_3EBBCatering-Category-Sides&Sweets-2.jpg",
  },
  {
    id: "6",
    name: "Beverages",
    price: 6.99,
    description: "",
    image:
      "https://ebcatering.com/usercontent/product_sub_img/EBBCatering-Category-Beverages-850x480.jpg",
  },
];

function App() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [showPickupModal, setShowPickupModal] = useState(true);

  const [showOrderModal, setShowOrderModal] = useState(false);

  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  const currentPage =
    window.location.pathname === "/"
      ? "HOME"
      : window.location.pathname === "/cart"
        ? "CART"
        : "OTHER";

  // -----------------------------------
  // STORAGE KEYS — SINGLE GLOBAL KEYS
  // (no page suffix — counter flows
  //  continuously across all pages)
  // -----------------------------------

  const EVENT_MAP_KEY = "event-map";

  const EVENT_COUNTER_KEY = "event-counter";

  // -----------------------------------
  // QUERY PARAMS
  // -----------------------------------

  const queryParams = new URLSearchParams(window.location.search);

  const sessionId = queryParams.get("sessionId") || crypto.randomUUID();

  const queryString = window.location.search;

  // -----------------------------------
  // BRANCH DATA
  // -----------------------------------

  const selectedBranch = {
    id: queryParams.get("branchId"),

    name: decodeURIComponent(queryParams.get("branchName") || ""),

    address: decodeURIComponent(queryParams.get("branchAddress") || ""),

    phone: decodeURIComponent(queryParams.get("branchPhone") || ""),

    hours: "9:30 AM to 9:30 PM",
  };

  // -----------------------------------
  // SUGGESTED ITEMS
  // -----------------------------------

  const suggestedItems = menuItems.filter(
    (item) =>
      item.name === "Beverages" ||
      item.name === "Sides & Sweets" ||
      item.name === "Individual Meals",
  );

  // -----------------------------------
  // DELIVERY DETAILS
  // -----------------------------------

  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  // -----------------------------------
  // DEVICE HELPERS
  // -----------------------------------

  const getBrowser = () => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Edg")) return "EDGE";

    if (userAgent.includes("Chrome")) return "CHROME";

    if (userAgent.includes("Firefox")) return "FIREFOX";

    if (userAgent.includes("Safari")) return "SAFARI";

    return "UNKNOWN";
  };

  const getOperatingSystem = () => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Windows")) return "WINDOWS";

    if (userAgent.includes("Mac")) return "MACOS";

    if (userAgent.includes("Android")) return "ANDROID";

    if (userAgent.includes("iPhone") || userAgent.includes("iPad"))
      return "IOS";

    if (userAgent.includes("Linux")) return "LINUX";

    return "UNKNOWN";
  };

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;

    if (/mobile/i.test(userAgent)) {
      return "MOBILE";
    }

    if (/tablet|ipad/i.test(userAgent)) {
      return "TABLET";
    }

    return "DESKTOP";
  };

  // -----------------------------------
  // TRACKING API
  // -----------------------------------

  const captureEvent = async (eventName) => {
    try {

      // GET SAVED EVENT MAP

      const savedEventMap =
        JSON.parse(
          sessionStorage.getItem(EVENT_MAP_KEY)
        ) || {};

      // GET CURRENT COUNTER
      // DEFAULT IS 4 BECAUSE EVENTS 1, 2, 3
      // ALREADY FIRED ON MARKETING + LOCATION SITES

      let currentCounter =
        Number(
          sessionStorage.getItem(EVENT_COUNTER_KEY)
        ) || 4;

      // CHECK IF EVENT ALREADY EXISTS

      let eventSequence;

      if (savedEventMap[eventName] !== undefined) {

        // REUSE OLD SEQUENCE NUMBER

        eventSequence = savedEventMap[eventName];

      } else {

        // ASSIGN CURRENT COUNTER AS SEQUENCE

        eventSequence = currentCounter;

        // SAVE EVENT TO MAP

        savedEventMap[eventName] = eventSequence;

        // INCREMENT COUNTER

        currentCounter++;

        // PERSIST UPDATED DATA

        sessionStorage.setItem(
          EVENT_MAP_KEY,
          JSON.stringify(savedEventMap)
        );

        sessionStorage.setItem(
          EVENT_COUNTER_KEY,
          currentCounter
        );
      }

      // PAYLOAD

      const payload = {
        eventName,

        page: currentPage,

        eventSequence,

        eventTimestamp: new Date().toISOString(),

        // NO LOGIN SYSTEM — customerId IS null

        customerId: null,

        sessionId,

        device: {
          browser: getBrowser(),

          operatingSystem: getOperatingSystem(),

          deviceType: getDeviceType(),
        },

        market: {
          utmSource: queryParams.get("utm_source") || "DIRECT",

          campaign: queryParams.get("utm_campaign") || "UNKNOWN",
        },

        referrer: {
          url: window.location.origin + window.location.pathname,

          referrer: document.referrer || "DIRECT",
        },
      };

      console.log("EVENT PAYLOAD =>", payload);

      await axios.post(
        "https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/Events",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    } catch (error) {

      console.log("Tracking Error =>", error.message);
    }
  };

  // -----------------------------------
  // INITIAL SETUP
  // -----------------------------------

  useEffect(() => {

    // CLEAR OLD SESSION DATA ON EVERY LOAD
    // ENSURES COUNTER ALWAYS STARTS FRESH
    // PREVENTS STALE DATA FROM PREVIOUS TEST RUNS

    sessionStorage.clear();

    // NO customerId — NO LOGIN SYSTEM
    // NO COUNTER INIT — DEFAULT 4 HANDLED
    // INSIDE captureEvent VIA || 4

  }, []);

  // -----------------------------------
  // EXIT TRACKING
  // -----------------------------------

  useEffect(() => {

    const trackExit = () => {

      // PAGE NAME

      const currentPage =
        window.location.pathname === "/"
          ? "HOME"
          : window.location.pathname === "/cart"
            ? "CART"
            : "OTHER";

      // QUERY PARAMS

      const queryParams =
        new URLSearchParams(window.location.search);

      // SINGLE GLOBAL STORAGE KEYS
      // (same as captureEvent — no page suffix)

      const EVENT_MAP_KEY = "event-map";

      const EVENT_COUNTER_KEY = "event-counter";

      // GET SAVED MAP

      const savedEventMap =
        JSON.parse(
          sessionStorage.getItem(EVENT_MAP_KEY)
        ) || {};

      // GET COUNTER — DEFAULT 4

      let currentCounter =
        Number(
          sessionStorage.getItem(EVENT_COUNTER_KEY)
        ) || 4;

      // REUSE OR CREATE EXIT EVENT SEQUENCE

      let eventSequence;

      if (savedEventMap["EXIT_PAGE"] !== undefined) {

        eventSequence = savedEventMap["EXIT_PAGE"];

      } else {

        eventSequence = currentCounter;

        savedEventMap["EXIT_PAGE"] = eventSequence;

        currentCounter++;

        sessionStorage.setItem(
          EVENT_MAP_KEY,
          JSON.stringify(savedEventMap)
        );

        sessionStorage.setItem(
          EVENT_COUNTER_KEY,
          currentCounter
        );
      }

      // FULL PAYLOAD

      const payload = {
        eventName: "EXIT_PAGE",

        page: currentPage,

        eventSequence,

        eventTimestamp: new Date().toISOString(),

        // NO LOGIN SYSTEM — customerId IS null

        customerId: null,

        sessionId,

        device: {
          browser: getBrowser(),

          operatingSystem: getOperatingSystem(),

          deviceType: getDeviceType(),
        },

        market: {
          utmSource: queryParams.get("utm_source") || "DIRECT",

          campaign: queryParams.get("utm_campaign") || "UNKNOWN",
        },

        referrer: {
          url: window.location.origin + window.location.pathname,

          referrer: document.referrer || "DIRECT",
        },
      };

      // SEND BEACON

      navigator.sendBeacon(
        "https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/Events",
        new Blob(
          [JSON.stringify(payload)],
          { type: "application/json" }
        )
      );
    };

    // MOBILE + DESKTOP

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        trackExit();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    window.addEventListener("beforeunload", trackExit);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);

      window.removeEventListener("beforeunload", trackExit);
    };

  }, []);

  // -----------------------------------
  // CART ACTIONS
  // -----------------------------------

  const addToCart = async (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    await captureEvent("ADD_TO_CART");
  };

  // -----------------------------------
  // ADD UPSELL ITEM TO CART
  // SEPARATE FROM addToCart SO IT FIRES
  // "ADD_UPSELL_TO_CART" — EVENT SEQUENCE 6
  // -----------------------------------

  const addUpsellToCart = async (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    await captureEvent("ADD_UPSELL_TO_CART");
  };

  // -----------------------------------
  // INCREASE QUANTITY
  // -----------------------------------

  const increaseQuantity = async (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );

    setCart(updatedCart);

    await captureEvent("INCREASE_QUANTITY");
  };

  // -----------------------------------
  // DECREASE QUANTITY
  // -----------------------------------

  const decreaseQuantity = async (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    await captureEvent("DECREASE_QUANTITY");
  };

  // -----------------------------------
  // REMOVE ITEM
  // -----------------------------------

  const removeItem = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);

    await captureEvent("REMOVE_FROM_CART");
  };

  // -----------------------------------
  // SUBTOTAL
  // -----------------------------------

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // -----------------------------------
  // PAYMENT
  // -----------------------------------

  const handlePayment = async () => {
    if (!deliveryDetails.fullName || !deliveryDetails.phone) {
      return;
    }

    const orderPayload = {
      orderId: crypto.randomUUID(),

      customer: {
        fullName: deliveryDetails.fullName,

        phone: deliveryDetails.phone,
      },

      pickupType: "WALKIN",

      pickupTime: document.querySelector(".modalDropdown")?.value || "ASAP",

      branch: {
        id: selectedBranch.id,

        name: selectedBranch.name,

        address: selectedBranch.address,

        phone: selectedBranch.phone,

        hours: selectedBranch.hours,
      },

      cartItems: cart,

      subtotal,

      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem("latestOrder", JSON.stringify(orderPayload));

    await captureEvent("PROCEED_TO_CHECKOUT");

    navigate(`/checkout${queryString}`);
  };

  return (
    <div className="app">
      {/* ORDER MODAL */}

      {showOrderModal && (
        <div className="orderModalOverlay">
          <div className="orderModal">
            <button
              className="closeModalBtn"
              onClick={() => setShowOrderModal(false)}
            >
              ×
            </button>

            <div className="successIcon">✓</div>

            <h2>Order placed</h2>

            <p>Your Sunrise Bagels order has been placed successfully.</p>

            <div className="orderStoreInfo">
              <h3>{selectedBranch.name}</h3>

              <span>{selectedBranch.address}</span>
            </div>

            <div className="orderTotal">Total: ${subtotal.toFixed(2)}</div>

            <button
              className="doneBtn"
              onClick={() => {
                setShowOrderModal(false);

                setCart([]);

                navigate(`/${queryString}`);
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* SUGGESTION MODAL */}

      {showSuggestionModal && (
        <div className="modalOverlay">
          <div className="suggestionModal">
            <h2 className="suggestionTitle">You may also like</h2>

            <p className="suggestionDesc">
              Complete your order with beverages and sweets
            </p>

            <div className="suggestionGrid">
              {suggestedItems.map((item) => (
                <div className="suggestionCard" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="suggestionContent">
                    <h3>{item.name}</h3>

                    <p>${item.price}</p>

                    <button onClick={() => addUpsellToCart(item)}>Add item</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="suggestionDivider"></div>

            <div className="suggestionFooter">
              <button
                className="proceedBtn"
                onClick={() => {
                  setShowSuggestionModal(false);

                  navigate(`/cart${queryString}`);

                  captureEvent("PROCEED_TO_CART");
                }}
              >
                Go To Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PICKUP MODAL */}

      {currentPage === "HOME" && showPickupModal && (
        <div className="modalOverlay">
          <div className="pickupModal">
            <h2>Choose your pickup type:</h2>

            <div className="pickupSelect">
              <span>WALK-IN</span>
            </div>

            <div className="pickupInfo">
              Head into the store and pick up your order.
            </div>

            <div className="storeDetails">
              <h3>{selectedBranch.name}</h3>

              <p>{selectedBranch.address}</p>

              <p>Store hours today - {selectedBranch.hours}</p>
            </div>

            <h3 className="pickupQuestion">When do you want it ready?</h3>

            <div className="pickupBtns">
              {/* ASAP */}

              <button
                className="asapBtn"
                onClick={async () => {
                  await captureEvent("PICKUP_ASAP_SELECTED");

                  setShowPickupModal(false);
                }}
              >
                ASAP
              </button>

              {/* LATER */}

              <button
                className="laterBtn"
                onClick={async () => {
                  await captureEvent("PICKUP_LATER_SELECTED");

                  setShowPickupModal(false);
                }}
              >
                LATER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}

      {currentPage === "HOME" && (
        <nav className="navbar">
          <div
            className="brandWrapper"
            onClick={async () => {
              navigate(`/${queryString}`);

              await captureEvent("HOME");
            }}
          >
            <div>
              <p className="logoText">Sunrise</p>

              <h1 className="brand">Bagels</h1>
            </div>
          </div>

          <button
            className="cartIconBtn"
            onClick={() => {
              captureEvent("VIEW_CART");
              setShowSuggestionModal(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1 5h12m-9 0a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 0 000-2z"
              />
            </svg>

            {cart.length > 0 && <span className="cartBadge">{cart.length}</span>}
          </button>
        </nav>
      )}

      {/* ROUTES */}

      <main className="content">
        <Routes>

          {/* LOCATIONS */}

          <Route path="/locations" element={<Locations />} />

          {/* HOME */}

          <Route
            path="/"
            element={
              <section className="menuSection">
                <p className="menuSub">OUR MENU</p>

                <h2 className="menuTitle">Today's specials</h2>

                <div className="cardGrid">
                  {menuItems.map((item) => (
                    <div className="card" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cardContent">
                        <div className="cardTop">
                          <h3>{item.name}</h3>

                          <span>${item.price.toFixed(2)}</span>
                        </div>

                        <button onClick={() => addToCart(item)}>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            }
          />

          {/* CART */}

          <Route
            path="/cart"
            element={
              <section className="cartPage">
                <p className="menuSub">Sunrise Bagels · VIEW CART</p>

                <h1 className="cartTitle">Your cart</h1>

                <p className="cartDesc">
                  Review your items and enter customer details.
                </p>

                <div className="cartLayout">
                  {/* LEFT */}

                  <div>
                    {cart.length === 0 ? (
                      <div className="emptyCart">
                        <p>Your cart is empty.</p>

                        <button onClick={() => navigate(`/${queryString}`)}>
                          Browse menu
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="cartItems">
                          {cart.map((item) => (
                            <div className="cartItem" key={item.id}>
                              <div className="cartLeft">
                                <img src={item.image} alt={item.name} />

                                <div>
                                  <h3>{item.name}</h3>

                                  <p>${item.price.toFixed(2)} each</p>
                                </div>
                              </div>

                              <div className="cartRight">
                                <div className="quantityBox">
                                  <button onClick={() => decreaseQuantity(item.id)}>
                                    -
                                  </button>

                                  <span>{item.quantity}</span>

                                  <button onClick={() => increaseQuantity(item.id)}>
                                    +
                                  </button>
                                </div>

                                <h3>${(item.price * item.quantity).toFixed(2)}</h3>

                                <button
                                  className="removeBtn"
                                  onClick={() => removeItem(item.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="subtotal">
                          Subtotal: ${subtotal.toFixed(2)}
                        </div>
                      </>
                    )}
                  </div>

                  {/* RIGHT */}

                  <div className="deliveryCard">
                    <h2>Order details</h2>

                    <p>Review your pickup and customer information.</p>

                    <div className="inputGroup">
                      <label>Full name</label>

                      <input
                        type="text"
                        value={deliveryDetails.fullName}
                        onChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            fullName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="inputGroup">
                      <label>Phone number</label>

                      <input
                        type="text"
                        value={deliveryDetails.phone}
                        onChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="inputGroup">
                      <label>Pickup type</label>

                      <div className="pickupType">
                        <button className="pickupActive">WALKIN</button>
                      </div>
                    </div>

                    {/* STORE INFO */}

                    <div className="inputGroup">
                      <label>Store info</label>

                      <div className="storeInfoBox">
                        <h3>{selectedBranch.name}</h3>

                        <p>{selectedBranch.address}</p>

                        <span>{selectedBranch.phone}</span>

                        <small>{selectedBranch.hours}</small>
                      </div>
                    </div>

                    <div className="inputGroup">
                      <label>Pickup time</label>

                      <select className="modalDropdown">
                        {Array.from({ length: 73 }, (_, index) => {
                          const startHour = 9;
                          const startMinute = 30;
                          const totalMinutes =
                            startHour * 60 + startMinute + index * 10;
                          const hours = Math.floor(totalMinutes / 60);
                          const minutes = totalMinutes % 60;
                          const formattedHour =
                            hours % 12 === 0 ? 12 : hours % 12;
                          const ampm = hours >= 12 ? "PM" : "AM";
                          const formattedMinutes = minutes
                            .toString()
                            .padStart(2, "0");
                          return (
                            <option key={index}>
                              {formattedHour}:{formattedMinutes} {ampm}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <button
                      className="shoppingBtn"
                      onClick={() => navigate(`/${queryString}`)}
                    >
                      Add more items
                    </button>

                    <button className="paymentBtn" onClick={handlePayment}>
                      Proceed to checkout →
                    </button>
                  </div>
                </div>
              </section>
            }
          />

          {/* CHECKOUT */}

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                subtotal={subtotal}
                selectedBranch={selectedBranch}
                captureEvent={captureEvent}
              />
            }
          />

          {/* ORDER SUCCESS */}

          <Route
            path="/order-success"
            element={
              <OrderSuccess
                subtotal={subtotal}
                selectedBranch={selectedBranch}
                handleDone={() => {
                  setCart([]);

                  navigate(`/${queryString}`);
                }}
                captureEvent={captureEvent}
                setCart={setCart}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;