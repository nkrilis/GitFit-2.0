import React from "react";
// import { Link } from "react-router-dom";

const Login = () => {

return (
    <div>
        <div className = "items-center">
            <div className="px-6 flex items-center justify-center bg-gray-100"></div>
                <div className="px-8 py-3 mt-4 text-left"></div>
                    <h3 className="text-2xl font-bold text-center">Login to your account</h3>
            {/* <form action=""> </form> */}
                <div className="items-center mt-4">
                    <label className="items-center ml-3 block" for="email">Email</label>
                    <input type="text" placeholder="Email"className="items-center w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></input>
                </div>
                <div className="items-center mt-4">
                    <label className="items-center ml-3 block">Password</label>
                    <input type="password" placeholder="Password" className="items-center w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></input>
                </div>
            <div className="flex items-baseline justify-between">
                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                <button className="px-4 text-sm text-blue-600 hover:underline">Forgot password?</button>
            </div>
        </div>
    </div>
    );
};

export default Login;
