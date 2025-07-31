import React, { useState } from 'react';
import image from '../assets/Library.jpg'; // Replace with your image path

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left: Form Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-10 h-screen">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        {isLogin ? 'Login to Bookish' : 'Create an Account'}
                    </h2>

                    {isLogin ? (
                        <form className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition duration-300"
                            >
                                Log In
                            </button>
                        </form>
                    ) : (
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <button
                                type="submit"
                                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition duration-300"
                            >
                                Register
                            </button>
                        </form>
                    )}

                    <p className="mt-6 text-center text-sm text-gray-600">
                        {isLogin ? (
                            <>
                                Don&apos;t have an account?{' '}
                                <button
                                    onClick={toggleForm}
                                    className="text-indigo-600 hover:underline"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    onClick={toggleForm}
                                    className="text-purple-600 hover:underline"
                                >
                                    Log In
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Right: Image Section */}
            <div className="hidden md:block md:w-1/2">
                <img
                    src={image}
                    alt="Bookish illustration"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default Login;
