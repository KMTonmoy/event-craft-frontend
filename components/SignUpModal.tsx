 import React from 'react';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

interface SignUpModalProps {
    closeModals: () => void;
    openLoginModal: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ closeModals, openLoginModal }) => {
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
                                       <span className='text-2xl'> <MdClose /></span>
                    
                </button>
                <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full mb-4 px-4 py-2 border rounded-md"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full mb-4 px-4 py-2 border rounded-md"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full mb-4 px-4 py-2 border rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="w-full mb-4 px-4 py-2 border rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Address"
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
                        onClick={() => { openLoginModal(); closeModals(); }}
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
