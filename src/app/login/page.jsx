// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useUser } from "@/contexts/AppContext";

// export default function KitchenLoginPage() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); 
//   const { login, setKitchenData } = useUser();
//   const router = useRouter();

//   // Handle sending OTP
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loading
//     try {
//       const response = await axios.post('https://localhost:5000/api/kitchen/login', { phoneNumber });
//       console.log(response.data.message);
//       setOtpSent(true);
//     } catch (error) {
//       console.error('Error sending OTP:', error.response?.data?.message || error.message);
//       alert('Failed to send OTP. Please try again.');
//     } finally {
//       setIsLoading(false); // End loading
//     }
//   };

//   // Handle verifying OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post('https://localhost:5000/api/kitchen/login/verify', { phoneNumber, otp });
//       const { token, kitchen } = response.data;
//       console.log(token, kitchen)
//       // Save data in local storage
//       localStorage.setItem('KitchenToken', token);
//       localStorage.setItem('kitchenId', kitchen._id);
//       localStorage.setItem('kitchenData', JSON.stringify(kitchen));

//       login(kitchen); 
//       setKitchenData(kitchen); 

//       console.log('Login successful!');
//       router.push('/');
//     } catch (error) {
//       console.error('Error verifying OTP:', error.response?.data?.message || error.message);
//       alert('Failed to verify OTP. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle login/signup without OTP
//   const handleLoginWithoutOtp = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post('https://localhost:5000/api/kitchen/login-without-opt', { phoneNumber });
//       const { token, kitchen } = response.data;
//       console.log(token, kitchen)

//       // Save data in local storage
//       localStorage.setItem('KitchenToken', token);
//       localStorage.setItem('kitchenId', kitchen._id);
//       localStorage.setItem('kitchenData', JSON.stringify(kitchen));

//       login(kitchen); // Set the logged-in user in context
//       setKitchenData(kitchen);

//       console.log('Login successful!');
//       router.push('/');
//     } catch (error) {
//       console.error('Error logging in:', error.response?.data?.message || error.message);
//       alert('Failed to login. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-4xl font-bold mb-4">SWADSEVA</h1>
//       <h1 className="text-2xl font-bold mb-4">Login to Kitchen App</h1>

//       {!otpSent ? (
//         <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
//           <input
//             type="tel"
//             placeholder="Enter your phone number"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             className="border border-slate-950 p-2 rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 rounded"
//             disabled={isLoading || !phoneNumber} // Disable when loading or empty input
//           >
//             {isLoading ? "Sending OTP..." : "Send OTP"}
//           </button>
//           <button
//             type="button"
//             onClick={handleLoginWithoutOtp}
//             className="bg-gray-500 text-white py-2 rounded"
//             disabled={isLoading || !phoneNumber}
//           >
//             {isLoading ? "Processing..." : "Login Without OTP"}
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
//           <input
//             type="text"
//             placeholder="Enter the OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="border border-slate-950 p-2 rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 rounded"
//             disabled={isLoading || !otp} // Disable when loading or empty input
//           >
//             {isLoading ? "Verifying OTP..." : "Verify OTP"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/contexts/AppContext";

export default function KitchenLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, setKitchenData } = useUser();
  const router = useRouter();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("https://localhost:5000/api/kitchen/login", { phoneNumber });
      console.log(response.data.message);
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data?.message || error.message);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("https://localhost:5000/api/kitchen/login/verify", { phoneNumber, otp });
      const { token, kitchen } = response.data;

      localStorage.setItem("KitchenToken", token);
      localStorage.setItem("kitchenId", kitchen._id);
      localStorage.setItem("kitchenData", JSON.stringify(kitchen));

      login(kitchen);
      setKitchenData(kitchen);

      router.push("/");
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data?.message || error.message);
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithoutOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("https://localhost:5000/api/kitchen/login-without-opt", { phoneNumber });
      const { token, kitchen } = response.data;

      localStorage.setItem("KitchenToken", token);
      localStorage.setItem("kitchenId", kitchen._id);
      localStorage.setItem("kitchenData", JSON.stringify(kitchen));

      login(kitchen);
      setKitchenData(kitchen);

      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error.response?.data?.message || error.message);
      alert("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/login-background.jpg')` }}
    >
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">SWADSEVA</h1>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Login to Kitchen App
        </h2>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
              disabled={isLoading || !phoneNumber}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
            <button
              type="button"
              onClick={handleLoginWithoutOtp}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-md transition"
              disabled={isLoading || !phoneNumber}
            >
              {isLoading ? "Processing..." : "Login Without OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:ring focus:ring-green-300 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
              disabled={isLoading || !otp}
            >
              {isLoading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
