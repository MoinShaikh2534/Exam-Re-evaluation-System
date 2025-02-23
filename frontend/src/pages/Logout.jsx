import React, { useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';

const Logout = () => {
  useEffect(() => {
    toast.success('You have been logged out successfully.');
  }, []);

  return (
    <div className="text-center p-8">
      <Toaster />
      <h2 className="text-2xl font-bold text-red-600">Logout</h2>
      <p>You have been logged out successfully.</p>
    </div>
  );
};

export default Logout;