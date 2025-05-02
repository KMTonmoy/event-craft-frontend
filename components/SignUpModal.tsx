import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import axios from "axios";

interface SignUpModalProps {
  closeModals: () => void;
  openLoginModal: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  closeModals,
  openLoginModal,
}) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "USER",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://event-craft-serv.vercel.app/api/v1/auth/register",
        formData
      );
      console.log("Sign up successful", response.data);

      if (response.data.data.access_token) {
        localStorage.setItem("token", response.data.data.access_token);
        closeModals();
      }
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-8 rounded-lg w-96 relative">
        <button
          onClick={closeModals}
          className="absolute top-2 right-2 text-gray-600"
        >
          <span className="text-2xl">
            <MdClose />
          </span>
        </button>
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <button
            onClick={() => {
              openLoginModal();
              closeModals();
            }}
            className="text-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpModal;
