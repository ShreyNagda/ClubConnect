import React from 'react';

function Singup() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <img src="path/to/your/logo.png" alt="Logo" className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Create an Account</h2>
        <form>
          <input type="text" placeholder="username" className="block w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
          <input type="text" placeholder="+91" className="block w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
          <input type="email" placeholder="email" className="block w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
          <input type="password" placeholder="password" className="block w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
          <input type="password" placeholder="confirm password" className="block w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
          <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring">Sign Up</button>
        </form>
        <p className="text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Sign In</a></p>
      </div>
    </div>
  );
}

export default Singup;