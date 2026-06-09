

import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";


import "react-toastify/dist/ReactToastify.css";
import Locations from "./pages/locations/locations";
import Checkout from "./pages/checkout/checkout";
import OrderSuccess from "./pages/order-success/orderSuccess";
import "./App.css";
import Login from "./pages/login/login";

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
  {
    id: "7",
    name: "Signature Egg Sandwich Nosh Box",
    price: 51.99,
    description: "Enjoy our most popular Signature and Classic Hot Fresh-Cracked Egg Sandwiches just the way our chefs imagined them.",
    image: "https://ebcatering.com/usercontent/product_sub_img/SignatureEggDozenNoshBox-830x3492.jpg"
  },
  {
    id: "8",
    name: "Classic Egg Sandwich Nosh Box",
    price: 42.99,
    description: "Enjoy our Classic Hot Fresh-Cracked Egg Sandwiches!",
    image: "https://ebcatering.com/usercontent/product_sub_img/ClassicEggDozenNoshBox-830x3491.jpg"
  },
  {
    id: "9",
    name: "Avocado Toast",
    price: 8.79,
    description: "Plain Bagel with fresh avocado, topped with our Everything Spice Mix. (400 calories)",
    image: "https://ebcatering.com/usercontent/product_sub_img/AvocadoToast.jpg"

  },
  {
    id: "10",
    name: "Brunch Box",
    price: 42.49,
    description: "Brunch for the family taken care of. Includes - 6 bagels (2 Plain, 1 Sesame, 1 Asiago, 1 Chocolate Chip and 1 Cinnamon Raisin), 1 tub of Plain Shmear, 1 Farmhouse Egg Sandwich, 2 Bacon & Cheddar egg Sandwiches, 4 Twice-baked Hash Browns and 4 Blueberry Muffins.",
    image: "https://ebcatering.com/usercontent/product_sub_img/EBBCatering-Category-IndividualMeals-850x480.jpg"
  },
  {
    id: "11",
    name: "Salmon & Bagels (Serves 8-13)",
    price: 103.99,
    description: "A beautiful presentation of traditional Nova Lox complete with 13 fresh-baked bagels, capers, tomatoes, red onions, cucumbers and two tubs of double-whipped cream cheese shmear",
    image: "https://ebcatering.com/usercontent/product_sub_img/Salmon&Bagels-830x3494.jpg"
  },
  {
    id: "12",
    name: "Individual Breakfast Meal",
    price: 9.89,
    description: "Any Classic Egg or Signature Egg Sandwich with two eggs served with a Fruity Cereal Pop or Twice-Baked Hash Brown",
    image: "https://ebcatering.com/usercontent/product_img/IndividualBreakfastMeals-830x349.jpg"
  },
  {
    id: "13",
    name: "Beverages",
    price: 6.99,
    description: "Fresh ingredients, chef-crafted flavors, and fast delivery.",
    image: "https://ebcatering.com/usercontent/product_sub_img/EBBCatering-Category-Beverages-850x480.jpg"
  },
  {
    id: "14",
    name: "Gourmet Bagels & Shmear",
    price: 18.49,
    description: "Fresh baked Gourmet bagels with our double whipped cream cheese shmear. ",
    image: "http://ebcatering.com/usercontent/product_sub_img/GourmetBagels&ShmearHalfDozen-830x349.jpg"
  },
  {
    id: "15",
    name: "Classic Bagels & Shmear",
    price: 12.99,
    description: "Fresh baked bagels with our double whipped cream cheese shmear.",
    image: "https://ebcatering.com/usercontent/product_sub_img/EBB-HotHoneyShmear-Item-830x349.jpg"
  },
  {
    id: "16",
    name: "Add a Shmear",
    price: 5.19,
    description: "Single tub of our double whipped cream cheese shmear",
    image: "https://ebcatering.com/usercontent/product_sub_img/HotHoneyShmearTub-830x349.jpg"
  },
  {
    id: "17",
    name: "Classic Bagels",
    price: 10.39,
    description: "Fresh baked Classic bagels without the shmear.",
    image: "https://ebcatering.com/usercontent/product_sub_img/BakersDozenBagels.jpg"
  },
  {
    id: "18",
    name: "Gourmet Bagels",
    price: 14.39,
    description: "Fresh baked Gourmet bagels without the shmear.",
    image: "https://ebcatering.com/usercontent/product_sub_img/HalfDozenGourmetBagels.jpg"
  },

  {
    id: "19",
    name: "Coffee or Cold Brew for the Group",
    price: 19.99,
    image: "https://ebcatering.com/usercontent/product_sub_img/HotCoffeeColdBrew_708x531.jpg"
  },
  {
    id: "20",
    name: "Orange Juice, Lemonade or Tea Lemonade For the Group",
    price: 15.49,
    image: "https://ebcatering.com/usercontent/product_sub_img/OJ-Lemonade-TeaLemonade_708x531.jpg"
  },
  {
    id: "21",
    name: "Hot or Iced Tea for the Group",
    price: 15.49,
    image: "https://ebcatering.com/usercontent/product_sub_img/Hot&IcedTea_708x531.jpg"
  },
  {
    id: "22",
    name: "Individual Bottled Beverages",
    price: 2.99,
    image: "https://ebcatering.com/usercontent/product_sub_img/BottledBeverages_708x531.jpg"
  },
  {
    id: "23",
    name: "Individual Breakfast Boxes",
    price: 9.89,
    description: "Any Classic Egg or Signature Egg Sandwich with two eggs served with a Fruity Cereal Pop or Twice-Baked Hash Brown",
    image: "https://ebcatering.com/usercontent/product_img/EBB-Catering-IndividualBreakfast.jpg"
  },
  {
    id: "24",
    name: "Individual Sandwich Lunch Boxes",
    price: 12.99,
    description: "Customize your lunch with your choice of any of our most popular lunch sandwiches - all individually packaged. Served with chips, and a Chocolate Chip Cookie or Fruity Cereal Pop.",
    image: "https://ebcatering.com/usercontent/product_img/IndividualLunchBox-830x349.jpg"
  },
  {
    id: "25",
    name: "Add-on Nosh Sandwich",
    price: 9.89,
    description: "Add another lunch sandwich to your Nosh Box!",
    image: "https://ebcatering.com/usercontent/product_img/EBB-Catering-IndividualBreakfast.jpg"
  },
  {
    id: "26",
    name: "Classic Lunch Sandwiches",
    price: 44.49,
    description: "Choose from a selection of our most popular lunch sandwiches in Full (10 sandwiches) or Half (5 sandwiches). Sandwiches are wrapped and cut in half.",
    image: "https://ebcatering.com/usercontent/product_img/SignatureLunchNoshBox-830x349.jpg"
  },
  {
    id: "27",
    name: "Individual Sandwich Lunch Boxes",
    price: 12.99,
    description: "Customize your lunch with your choice of any of our most popular lunch sandwiches - all individually packaged. Served with chips, and a Chocolate Chip Cookie or Fruity Cereal Pop.",
    image: "https://ebcatering.com/usercontent/product_sub_img/IndividualLunchBox_708x531.jpg"
  },
  {
    id: "28",
    name: "Kettle Chips",
    price: 1.79,
    description: "Complete any lunch with Classic Potato Chips for the group.",
    image: "https://ebcatering.com/usercontent/product_sub_img/5708f8a2-931b-3a73-cbdce96744b5661e.jpg"
  },
  {
    id: "29",
    name: "Add On Cookies",
    price: 2.69,
    description: "Fresh-baked cookie loaded with semisweet chocolate chunks (440 Calories)",
    image: "https://ebcatering.com/usercontent/product_sub_img/57049aec-0c7e-4e3f-4fb47f142eb021b8.jpg"
  },
  {
    id: "30",
    name: "Pastries & Sweets Boxes",
    price: 18.69,
    description: "Sweeten up any occasion with an assortment of muffins and assorted pastries",
    image: "https://ebcatering.com/usercontent/product_sub_img/SweetsNoshBoxDozen_708x531.jpg"
  },
  {
    id: "31",
    name: "Cookie Boxes",
    price: 15.49,
    description: "We've got the right box of goodies to satisfy any sweet tooth.",
    image: "https://ebcatering.com/usercontent/product_sub_img/CookieBoxDozen_708x531.jpg"
  },
  {
    id: "32",
    name: "Sweets & Coffee Break (Serves 6 or 12)",
    price: 40.39,
    description: "Re-energize your group with this snack break including coffee and sweets all perfectly packaged for your group.",
    image: "https://ebcatering.com/usercontent/product_sub_img/SweetsCoffeeBreak_708x531.jpg"
  },
  {
    id: "33",
    name: "Cinnamon Bliss Roll 4-Pack",
    price: 16.49,
    description: "4 of our delicious cinnamon rolls layered with cream cheese frosting. **May Contain Nuts** Served with utensils, plates & napkins .",
    image: "https://ebcatering.com/usercontent/product_sub_img/CinnamonRoll4Pack_708x531.jpg"
  },
  {
    id: "34",
    name: "Add on Sides",
    price: 1.79,
    description: "Complete your breakfast with a crispy, cheesy, twice-baked hash brown or fresh-baked muffin.",
    image: "https://ebcatering.com/usercontent/product_sub_img/56fa0443-d3c8-3b64-c5faa826b0029eea.jpg"
  },
  {
    id: "35",
    name: "Add On Sweets",
    price: 2.69,
    description: "Dessert for Breakfast! Add a Fruity Cereal Pop, Egg Sugar Cookie or Chocolate Chip Cookie to sweeten your morning. ",
    image: "https://ebcatering.com/usercontent/product_sub_img/56ea1102-ecb3-4033-d38654437490db10.jpg"
  },
]

function App() {
  const navigate = useNavigate();
  const justLoggedIn = useRef(false);
  const [userNameExists, setUserNameExists] = useState(sessionStorage.getItem("username"));

  const [cart, setCart] = useState([]);
  const [cartData, setCartData] = useState([]);
  const cartRef = useRef(cart);
const updateCart = (newCart) => {
  setCart(newCart);
  cartRef.current = newCart;
};
  // const fetchCartData = async () => {
  //   try {
  //     const url = `https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/GetCartItem?userName=${userNameExists}`;
  //     const response = await axios.get(url);
  //     console.log("FULL RESPONSE =>", response.data); 
  //     sessionStorage.setItem("CartId", response.data.cartItemId);
  //     updateCartData(response.data);

  //     if (response.breakfastItems && response.breakfastItems.length > 0) {
  //       updateCart(response.data.cartItems);
  //     }

  //   } catch (error) {
  //     console.log("Error", error.message);
  //   }
  // };

  const fetchCartData = async () => {
    try {
      const url = `https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/GetCartItem?userName=${userNameExists}`;
      console.log("Url", url);
      const response = await axios.get(url);
      console.log("FULL RESPONSE =>", response.data);


      if (Array.isArray(response.data) && response.data.length > 0) {


        const latestCart = response.data[response.data.length - 1];

        sessionStorage.setItem("CartId", latestCart.cartItemId);


        if (latestCart.breakfastItems && latestCart.breakfastItems.length > 0) {
          updateCart(latestCart.breakfastItems);
        }
      }

    } catch (error) {
      console.log("Error", error.message);
    }
  };
  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) updateCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    if (userNameExists) {
      fetchCartData()
    }
  }, [userNameExists])
  useEffect(() => {
    if (userNameExists && justLoggedIn.current) {
      justLoggedIn.current = false;
      navigate("/locations");
    }
  }, [userNameExists]);
  useEffect(() => {
    cartRef.current = cart;
  }, [cart])

  const [showPickupModal, setShowPickupModal] = useState(true);

  const [showOrderModal, setShowOrderModal] = useState(false);

  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  const [suggestedItems, setSuggestedItems] = useState([]);



  const currentPage =
    window.location.pathname === "/"
      ? "HOME"
      : window.location.pathname === "/cart"
        ? "CART"
        : window.location.pathname === "/checkout"
          ? "CHECKOUT"
          : window.location.pathname === "/order-success"
            ? "ORDER_SUCCESS"
            : window.location.pathname === "/locations"
              ? "LOCATIONS"
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

  const beverageItems = menuItems.filter((item) => {
    const name = item.name.toLowerCase();

    return (
      name.includes("beverage") ||
      name.includes("coffee") ||
      name.includes("tea") ||
      name.includes("juice") ||
      name.includes("lemonade")
    );
  });

  const sweetItems = menuItems.filter((item) => {
    const name = item.name.toLowerCase();

    return (
      name.includes("sweet") ||
      name.includes("cookie") ||
      name.includes("pastr") ||
      name.includes("cinnamon")
    );
  });

  const mealItems = menuItems.filter((item) => {
    const name = item.name.toLowerCase();

    return (
      name.includes("meal") ||
      name.includes("breakfast") ||
      name.includes("lunch") ||
      name.includes("sandwich")
    );
  });

  const randomItem = (items) =>
    items[Math.floor(Math.random() * items.length)];

  const generateSuggestions = () => {
    const beverage = randomItem(beverageItems);
    const sweet = randomItem(sweetItems);
    const meal = randomItem(mealItems);

    return [beverage, sweet, meal].filter(Boolean);
  };

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

      let isCartActive =
        JSON.parse(sessionStorage.getItem("isCartActive")) ?? false;

      if (eventName === "ADD_TO_CART") {
        isCartActive = true;
      }

      if (eventName === "PAYMENT_SUBMITTED") {
        isCartActive = false;
      }

      sessionStorage.setItem("isCartActive", JSON.stringify(isCartActive));

      const payload = {
        eventName,

        page: currentPage,

        eventSequence,

        eventTimestamp: new Date().toISOString(),

        // NO LOGIN SYSTEM — customerId IS null

        customerId: userNameExists,

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
        "Payload":
        {
          "IsCartActive": isCartActive
        }
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

  // useEffect(() => {

  //   // CLEAR OLD SESSION DATA ON EVERY LOAD
  //   // ENSURES COUNTER ALWAYS STARTS FRESH
  //   // PREVENTS STALE DATA FROM PREVIOUS TEST RUNS

  //   sessionStorage.clear();

  //   // NO customerId — NO LOGIN SYSTEM
  //   // NO COUNTER INIT — DEFAULT 4 HANDLED
  //   // INSIDE captureEvent VIA || 4

  // }, []);


  //SaveCartonExit
  const saveCartOnExit = () => {
    if (cartRef.current.length === 0) return;

    const payload = {
      cartItemId: crypto.randomUUID(),
      userName: sessionStorage.getItem("username"),
      isCartActive: true,
      createdDate: new Date().toISOString(),
      breakfastItems: cartRef.current,
    };

    navigator.sendBeacon(
      "https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/CreateCart",
      new Blob([JSON.stringify(payload)], {
        type: "application/json",
      })
    );
  };
  // -----------------------------------
  // EXIT TRACKING
  // -----------------------------------
  const trackExit = (targetPage) => {
    saveCartOnExit()
    let savedEventMap = {};
    try {
      savedEventMap = JSON.parse(sessionStorage.getItem(EVENT_MAP_KEY)) || {};
    } catch (e) {
      savedEventMap = {};
    }

    let currentCounter = Number(sessionStorage.getItem(EVENT_COUNTER_KEY)) || 4;
    let eventSequence;

  if (savedEventMap["EXIT_PAGE"] !== undefined) {
    eventSequence = savedEventMap["EXIT_PAGE"];
  } else {
    eventSequence = currentCounter;
    savedEventMap["EXIT_PAGE"] = eventSequence;
    currentCounter++;

    try {
      sessionStorage.setItem(EVENT_MAP_KEY, JSON.stringify(savedEventMap));
      sessionStorage.setItem(EVENT_COUNTER_KEY, currentCounter);
    } catch (e) {
      // Fail silently to prioritize delivery execution
    }
  }

  const payload = {
    eventName: "EXIT_PAGE",
    page: targetPage,
    eventSequence,
    eventTimestamp: new Date().toISOString(),
    customerId: "",
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

  // Keepalive used here as well for reliable JSON transmission on exit
  fetch("https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/Events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((err) => console.error("Exit tracking failed", err));
};

// KEEP TRACK OF UPDATED CURRENT PAGE REF WITHOUT REMOUNTING LISTENERS
const currentPageRef = useRef(currentPage);
const hasTrackedExit = useRef(false);

useEffect(() => {
  currentPageRef.current = currentPage;
}, [currentPage]);

// CLEANED UP: SINGLE TAB LIFE-CYCLE INTERCEPTOR
useEffect(() => {
  const handleExitTrigger = () => {
    if (!hasTrackedExit.current) {
      hasTrackedExit.current = true;
      trackExit(currentPageRef.current);
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      handleExitTrigger();
    } else if (document.visibilityState === "visible") {
      hasTrackedExit.current = false; // Reset if user returns to tab
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pagehide", handleExitTrigger);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("pagehide", handleExitTrigger);
  };
}, []);
  // KEEP TRACK OF UPDATED CURRENT PAGE REF WITHOUT REMOUNTING LISTENERS
  // const currentPageRef = useRef(currentPage);
  // const hasTrackedExit = useRef(false);

  // useEffect(() => {
  //   currentPageRef.current = currentPage;
  // }, [currentPage]);

  // // COMBINED TAB LIFE-CYCLE INTERCEPTOR
  // useEffect(() => {
  //   const handleExitTrigger = () => {
  //     if (!hasTrackedExit.current) {
  //       trackExit(currentPageRef.current);
  //       hasTrackedExit.current = true;
  //     }
  //   };

  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "hidden") {
  //       handleExitTrigger();
  //     } else if (document.visibilityState === "visible") {
  //       hasTrackedExit.current = false; // Reset if user returns to tab
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   window.addEventListener("pagehide", handleExitTrigger);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     window.removeEventListener("pagehide", handleExitTrigger);
  //   };
  // }, []);

  // INITIAL SETUP
  // useEffect(() => {
  //   sessionStorage.clear();
  // }, []);

  // -----------------------------------
  // CART ACTIONS
  // -----------------------------------

  // const addToCart = async (item) => {
  //   console.log("ITEM", item)
  //   const existingItem = cart.find((cartItem) => cartItem.itemId === item.id);

  //   if (existingItem) {
  //     const updatedCart = cart.map((cartItem) =>
  //       cartItem.itemId === item.id
  //         ? {
  //           ...cartItem,
  //           quantity: cartItem.quantity + 1,
  //           subtotal: (cartItem.quantity + 1) * cartItem.price,
  //         }
  //         : cartItem
  //     );
  //     const Payload = {
  //       userName: sessionStorage.getItem("username"),
  //       itemId: item.id,
  //       quantityIncrement: 1
  //     }
  //     const url = "https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/UpdateCart"
  //     // {
  //     //   "cartItemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //     //     "userName": "string",
  //     //       "isCartActive": true,
  //     //         "modifiedDate": "2026-06-08T15:38:08.646Z",
  //     //           "cartItems": [
  //     //             {
  //     //               "itemId": 0,
  //     //               "itemName": "string",
  //     //               "itemImg": "string",
  //     //               "quantity": 0,
  //     //               "price": 0,
  //     //               "itemTotalPrice": 0,
  //     //               "promotionalDiscount": "string"
  //     //             }
  //     //           ]
  //     // }
  //     const response = await axios.put(url, Payload)
  //     updateCart(updatedCart);
  //   } else {
  //     const cartPayload = {
  //       "itemId": item.id,
  //       "itemName": item.name,
  //       "itemImg": item.image,
  //       "price": item.price,
  //       "quantity": 1,
  //       "itemtotalPrice": item.price,
  //       "itemDiscount": JSON.stringify((Math.random() * 25).toFixed(2))
  //     }


  //     updateCart([...cart, cartPayload]);

  //     const url = "https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/CreateCart";
  //     const Payload = {
  //       "cartItemId": crypto.randomUUID(),
  //       "userName": sessionStorage.getItem("username"),
  //       "isCartActive": true,
  //       "createdDate": new Date().toISOString(),
  //       "cartItems": [cartPayload]
  //     }
  //     const response = await axios.post(url, Payload);
  //   }

  //   await captureEvent("ADD_TO_CART");
  // };

  const addToCart = (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.itemId === item.id
    );

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.itemId === item.id
          ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            itemtotalPrice:
              (cartItem.quantity + 1) * cartItem.price,
          }
          : cartItem
      );

      updateCart(updatedCart);
    } else {

      const cartPayload = {
        itemId: item.id,
        itemName: item.name,
        itemImg: item.image,
        price: item.price,
        quantity: 1,
        itemtotalPrice: item.price,
        itemDiscount: (Math.random() * 25).toFixed(2),
      };

      updateCart([...cart, cartPayload]);
    }
  };

  // -----------------------------------
  // ADD UPSELL ITEM TO CART
  // SEPARATE FROM addToCart SO IT FIRES
  // "ADD_UPSELL_TO_CART" — EVENT SEQUENCE 6
  // -----------------------------------

  // const addUpsellToCart = async (item) => {
  //   const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  //   if (existingItem) {
  //     const updatedCart = cart.map((cartItem) =>
  //       cartItem.id === item.id
  //         ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //         : cartItem,
  //     );

  //     updateCart(updatedCart);
  //   } else {
  //     updateCart([...cart, { ...item, quantity: 1 }]);
  //   }

  //   await captureEvent("ADD_UPSELL_TO_CART");
  // };
  const addUpsellToCart = async (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.itemId === item.id
    );

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.itemId === item.id
          ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            itemtotalPrice:
              (cartItem.quantity + 1) * cartItem.price,
          }
          : cartItem
      );

      updateCart(updatedCart);
    } else {
      const cartPayload = {
        itemId: item.id,
        itemName: item.name,
        itemImg: item.image,
        price: item.price,
        quantity: 1,
        itemtotalPrice: item.price,
        itemDiscount: (Math.random() * 25).toFixed(2),
      };

      updateCart([...cart, cartPayload]);
    }

    await captureEvent("ADD_UPSELL_TO_CART");
  };
  // -----------------------------------
  // INCREASE QUANTITY
  // -----------------------------------

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.itemId === id
        ? {
          ...item,
          quantity: item.quantity + 1,
          itemtotalPrice: (item.quantity + 1) * item.price,
        }
        : item
    );

    updateCart(updatedCart);
  };

  // -----------------------------------
  // DECREASE QUANTITY
  // -----------------------------------

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.itemId === id
          ? {
            ...item,
            quantity: item.quantity - 1,
            itemtotalPrice: (item.quantity - 1) * item.price,
          }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // -----------------------------------
  // REMOVE ITEM
  // -----------------------------------

  const removeItem = async (id) => {
    // const updatedCart = cart.filter((item) => item.id !== id);
    const updatedCart = cart.filter((item) => item.itemId !== id);

    updateCart(updatedCart);

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

  const saveCart = async () => {
    const payload = {
      cartItemId: crypto.randomUUID(),
      userName: sessionStorage.getItem("username"),
      isCartActive: true,
      createdDate: new Date().toISOString(),
      breakfastItems: cart,
    };
    const url = "https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/CreateCart"
    await axios.post(url, payload);
  };

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
    await saveCart()
    await captureEvent("PROCEED_TO_CHECKOUT", cart);

    navigate(`/checkout${queryString}`);
  };

  return (
    <div className="app">


      <main className="content">
        <Routes>
          {!userNameExists ? (
            <>
              <Route
                path="/login"
                element={<Login captureEvent={captureEvent} setUserNameExists={setUserNameExists} justLoggedIn={justLoggedIn} />}
              />

              <Route
                path="*"
                element={<Navigate to="/login" replace />}
              />
            </>
          ) : (
            <>

              {/* LOCATIONS */}

              <Route path="/locations" element={<Locations />} />

              {/* HOME */}

              <Route
                path="/"
                element={
                  <>

                    {showSuggestionModal && (
                      <div className="modalOverlay">
                        <div className="suggestionModal">
                          {/* CLOSE BUTTON */}
                          <button
                            className="closeSuggestionBtn"
                            onClick={() => setShowSuggestionModal(false)}
                          >
                            ×
                          </button>

                          <h2 className="suggestionTitle">You may also like</h2>

                          <p className="suggestionDesc">
                            Complete your order with beverages and sweets
                          </p>

                          <div className="suggestionGrid">
                            {suggestedItems.map((item, index) => (
                              <div
                                className="suggestionCard"
                                key={`${item.id}-${index}`}
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                />

                                <div className="suggestionContent">

                                  <h3>{item.name}</h3>

                                  <p>${item.price}</p>


                                  <button
                                    onClick={() => {
                                      addUpsellToCart(item);
                                    }}
                                  >
                                    Add item
                                  </button>
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
                            setSuggestedItems(generateSuggestions());
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
                  </>

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
                              {/* {cartData.breakfastItems.map((item) => (
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
                              ))} */}

                              {cart.map((item) => (
                                <div className="cartItem" key={item.itemId}>
                                  <div className="cartLeft">
                                    <img src={item.itemImg} alt={item.itemName} />

                                    <div>
                                      <h3>{item.itemName}</h3>
                                      <p>${item.price.toFixed(2)} each</p>
                                    </div>
                                  </div>

                                  <div className="cartRight">
                                    <div className="quantityBox">
                                      <button onClick={() => decreaseQuantity(item.itemId)}>
                                        -
                                      </button>

                                      <span>{item.quantity}</span>

                                      <button onClick={() => increaseQuantity(item.itemId)}>
                                        +
                                      </button>
                                    </div>

                                    <h3>${item.itemtotalPrice.toFixed(2)}</h3>

                                    <button
                                      className="removeBtn"
                                      onClick={() => removeItem(item.itemId)}
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
                  <>

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

                              updateCart([]);

                              navigate(`/${queryString}`);
                            }}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}

                    <OrderSuccess
                      subtotal={subtotal}
                      selectedBranch={selectedBranch}
                      handleDone={() => {
                        updateCart([]);

                        navigate(`/${queryString}`);
                      }}
                      captureEvent={captureEvent}
                      updateCart={updateCart}
                    />

                  </>

                }
              />
              <Route
                path="*"
                element={<Navigate to="/login" replace />}
              />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;

