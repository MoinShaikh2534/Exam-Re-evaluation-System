import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../../utils/enums';

const Navbar = () => {
  const { loggedInUser, logout } = useAuth();

  async function handleLogout() {
    logout();
  }

  // Check if the user is a Faculty (Checker) or Cashier
  const isFacultyOrCashier =
    loggedInUser?.role === Role.CHECKER || loggedInUser?.role === Role.CASHIER;

  return (
    <nav className="bg-white p-4 shadow-lg">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        {/* Title */}
        <div className="text-blue-700 text-xl font-bold">
          Exam Re-evaluation System
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-end">
          <ul className="flex space-x-2 text-lg font-medium">
            {/* Show only if the user is NOT Faculty or Cashier */}
            {!isFacultyOrCashier && (
              <>
                <li>
                  <a
                    href="/home"
                    className="text-black hover:bg-gray-200 py-2 px-4 rounded-lg transition duration-300"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/result"
                    className="text-black hover:bg-gray-200 py-2 px-4 rounded-lg transition duration-300"
                  >
                    Result
                  </a>
                </li>
              </>
            )}

            {/* Logout Button (Visible for all users) */}
            <li>
              <a
                onClick={handleLogout}
                href="/"
                className="text-red-600 hover:bg-red-200 py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
