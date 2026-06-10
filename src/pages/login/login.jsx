// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./login.css";
// import axios from "axios";
 
// const Login = ({setUserNameExists,justLoggedIn}) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const navigate = useNavigate();
 
 
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
 
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const payload = {
//       username: formData.username,
//       password: formData.password,
//     };
//     console.log("LoginPayload",payload)
 
//     try{
//     const response = await axios.post("https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/login", payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//     console.log("Login successful:", response.data);
//     sessionStorage.setItem("username", formData.username);
//     justLoggedIn.current = true;
//     setUserNameExists(formData.username);
 
//     // navigate("/locations");
//   } catch (error) {
//     console.error("Login failed:", error);  
 
// }  
//   };
 
//   return (
//     <div className="login-page">
//       <div className="image-section">
//         <img
//           src="https://www.qsrmagazine.com/wp-content/uploads/2020/05/Einstein.jpg"
//           alt="Bagel"
//           className="bagel-image"
//         />
//       </div>
 
//       <div className="form-section">
//         <form className="login-card" onSubmit={handleLogin}>
//           <h1>Welcome Back</h1>
//           <p>Sign in to continue</p>
// <div className= "loginSection">
// <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//           />
 
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
 
//           <button type="submit">Login</button>
// </div>
         
//         </form>
//       </div>
//     </div>
//   );
// };
 
// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
 
const Login = ({cart}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
 
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      username: formData.username,
      password: formData.password,
    };
 
    try{
    const response = await axios.post("https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/login", payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
    console.log("Login successful:", response.data);
    sessionStorage.setItem("username", formData.username);
 if (cart && cart.length > 0) {
  navigate("/cart");
} else {
  navigate("/locations");
}
  } catch (error) {
    console.error("Login failed:", error);  
 
}  
  };
 
  return (
    <div className="login-page">
      <div className="image-section">
        <img
          src="https://www.qsrmagazine.com/wp-content/uploads/2020/05/Einstein.jpg"
          alt="Bagel"
          className="bagel-image"
        />
      </div>
 
      <div className="form-section">
        <form className="login-card" onSubmit={handleLogin}>
          <h1>Welcome Back</h1>
          <p>Sign in to continue</p>
<div className= "loginSection">
<input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
 
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
 
          <button type="submit">Login</button>
</div>
         
        </form>
      </div>
    </div>
  );
};
 
export default Login;