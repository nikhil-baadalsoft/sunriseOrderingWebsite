import { useState } from "react";
import "./locations.css";
import axios from "axios";

const branches = [
  {
    id: 1,
    name: "Sunrise Bagel - Banjara Hills",
    address: "Road No. 12, Banjara Hills, Hyderabad",
    phone: "+91 98765 43210",
    status: "Open · Closes 11 PM",
  },
  {
    id: 2,
    name: "Sunrise Bagel - Jubilee Hills",
    address: "Jubilee Hills Check Post, Hyderabad",
    phone: "+91 98765 43211",
    status: "Open · Closes 10 PM",
  },
  {
    id: 3,
    name: "Sunrise Bagel - Hitech City",
    address: "Mindspace Road, Hitech City, Hyderabad",
    phone: "+91 98765 43212",
    status: "Open · Closes 12 AM",
  },
  {
    id: 4,
    name: "Sunrise Bagel - Madhapur",
    address: "100 Feet Road, Madhapur, Hyderabad",
    phone: "+91 98765 43213",
    status: "Closed · Opens 7 AM",
  },
  {
    id: 5,
    name: "Sunrise Bagel - Gachibowli",
    address: "DLF Street, Gachibowli, Hyderabad",
    phone: "+91 98765 43214",
    status: "Open · Closes 11 PM",
  },
  {
    id: 6,
    name: "Sunrise Bagel - Kukatpally",
    address: "Forum Mall Road, Kukatpally, Hyderabad",
    phone: "+91 98765 43215",
    status: "Open · Closes 10 PM",
  },
  {
    id: 7,
    name: "Sunrise Bagel - Kondapur",
    address: "Raghavendra Colony, Kondapur, Hyderabad",
    phone: "+91 98765 43216",
    status: "Open · Closes 11 PM",
  },
  {
    id: 8,
    name: "Sunrise Bagel - Begumpet",
    address: "Greenlands Road, Begumpet, Hyderabad",
    phone: "+91 98765 43217",
    status: "Closed · Opens 6 AM",
  },
  {
    id: 9,
    name: "Sunrise Bagel - Ameerpet",
    address: "Metro Station Road, Ameerpet, Hyderabad",
    phone: "+91 98765 43218",
    status: "Open · Closes 9 PM",
  },
  {
    id: 10,
    name: "Sunrise Bagel - Secunderabad",
    address: "SD Road, Secunderabad, Hyderabad",
    phone: "+91 98765 43219",
    status: "Open · Closes 11 PM",
  },
];


const Locations = () => {
    const [search, setSearch] = useState("");

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(search.toLowerCase()) ||
    branch.address.toLowerCase().includes(search.toLowerCase())
  );

   const getBrowser = () => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Edg"))
      return "EDGE";

    if (userAgent.includes("Chrome"))
      return "CHROME";

    if (userAgent.includes("Firefox"))
      return "FIREFOX";

    if (userAgent.includes("Safari"))
      return "SAFARI";

    return "UNKNOWN";
  };

  const getOperatingSystem = () => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Windows"))
      return "WINDOWS";

    if (userAgent.includes("Mac"))
      return "MACOS";

    if (userAgent.includes("Android"))
      return "ANDROID";

    if (
      userAgent.includes("iPhone") ||
      userAgent.includes("iPad")
    )
      return "IOS";

    if (userAgent.includes("Linux"))
      return "LINUX";

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
const captureEvent = async (
  eventName,
  eventSequence
) => {
  try {

    // WEBSITE QUERY PARAMS

    const queryParams =
      new URLSearchParams(
        window.location.search
      );

    // GET SESSION + REFERRER DETAILS

    const sessionId =
      queryParams.get("sessionId") ||
      crypto.randomUUID();

    const refererUrl =
      decodeURIComponent(
        queryParams.get(
          "refererUrl"
        ) || window.location.href
      );

    const referrerName =
      decodeURIComponent(
        queryParams.get(
          "referrerName"
        ) || "DIRECT"
      );

    // PAYLOAD

    const payload = {
      eventName,
      eventSequence,
      eventTimestamp:
        new Date().toISOString(),
      customerId: null,
      sessionId,
      page: window.location.origin + window.location.pathname,
      device: {
        browser: getBrowser(),

        operatingSystem:
          getOperatingSystem(),

        deviceType:
          getDeviceType(),
      },

      // MARKETING DETAILS

      market: {
        utmSource:
          queryParams.get(
            "utm_source"
          ) || "DIRECT",

        campaign:
          queryParams.get(
            "utm_campaign"
          ) || "UNKNOWN",
      },

      // REFERRER DETAILS

      referrer: {
        url: window.location.origin + window.location.pathname,

        referrer: refererUrl|| referrerName,
      },
    };

    console.log(
      "EVENT PAYLOAD =>",
      payload
    );

    // API CALL

    await axios.post(
      "https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/Events",
      payload,
      {
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    console.log(
      "Tracking Error =>",
      error.message
    );
  }
};

  return (
  <div className="locationPage">
      {/* NAVBAR */}

      <nav className="navbar">
        <div>
          <p className="logoText">SUNRISE</p>
          <h1 className="brand">Bagels</h1>
        </div>

        <div className="navActions">
          <button className="navBtn">Menu</button>
          <button className="navBtn">Rewards</button>
          <button className="navBtn" onClick={() => window.open("https://sunrise-catering.vercel.app/", "_blank")}>
            Catering
          </button>
        </div>
       <button
  className="orderBtn"
  onClick={() =>
    (window.location.href =
      "/locations")
  }
>
  Order Now
</button>
      </nav>

    

      {/* HERO */}

      <section className="heroBanner" style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <div className="heroContent">
          <p className="heroSub">
            SUNRISE BAGELS · FIND A LOCATION
          </p>

          <h1>
            Grab our tasty bagels
            <br />
            near you
          </h1> 

          <p>
            Search your nearest Sunrise Bagels branch
            and order your favorite breakfast in minutes.
          </p>

          <div className="searchBox">
            <input
              type="text"
              placeholder="Search by area, city or branch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="searchInput"
            />

            <button style={{backgroundColor: "white", color: "black"}}>Search</button>
          </div>
        </div>
        <img src="https://ebcatering.com/usercontent/product_sub_img/ed9e3f7c-c201-1ad5-79719fa1355f4d58.png" alt="Hero banner"  style={{ maxWidth: "100%", height: "auto", borderRadius: "16px" }}/>
      </section>

      {/* RESULT SECTION */}

      <section className="resultsSection">
        <div className="resultsHeader">
          <p className="menuSub">LOCATIONS</p>

          <h2>
            {filteredBranches.length} Sunrise Bagels
            branches found in Hyderabad
          </h2>
        </div>

        <div className="branchGrid">
          {filteredBranches.map((branch) => (
            <div className="branchCard" key={branch.id}>
              <div className="branchTop">
                <div>
                  <h3>{branch.name}</h3>

                  <span>{branch.status}</span>
                </div>

                <div className="branchNumber">
                  {branch.id}
                </div>
              </div>

              <p className="branchAddress">
                {branch.address}
              </p>

              <p className="branchPhone">
                {branch.phone}
              </p>

              <div className="branchBtns">
                
 <button
  className="primaryBtn"
  onClick={async () => {
    await captureEvent("ORDER_NOW",3);

    // GET CURRENT URL PARAMS
    const existingQuery =
      new URLSearchParams(
        window.location.search
      );

    // GET EXISTING SESSION ID
    const sessionId =
      existingQuery.get("sessionId") ||
      crypto.randomUUID();

    // BUILD NEXT URL PARAMS
    const params =
      new URLSearchParams({
        branchId: branch.id,
        branchName: branch.name,
        branchAddress: branch.address,
        branchPhone: branch.phone,
        sessionId,
      });

    // OPEN ORDERING WEBSITE
    window.location.href = `/?${params.toString()}`;

  }}
>
  Order now
</button>

<button className="primaryBtn" onClick={() => window.open("https://sunrise-catering.vercel.app/", "_blank")}>
  Order Catering
</button>
                
              </div>
              <button className="secondaryBtn">
                  Get directions
                </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Locations;