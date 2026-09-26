import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
      <p className="text-gray-700 text-lg mb-8">You do not have permission to view this page.</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
