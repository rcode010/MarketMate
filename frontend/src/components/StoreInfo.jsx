import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useStore } from "../stores/useStoreStore";
import LoadingSpinner from "./LoadingSpinner";

const StoreInfo = () => {
  const { myStore, getMyStore } = useStore();

  useEffect(() => {
    getMyStore();
  }, []);
  
  const [storeInfo, setStoreInfo] = useState({
    name: "The Cozy Corner Bookstore",
    address: "123 Main Street, Anytown, USA 12345",
    phone: "(555) 123-4567",
    hours: [
      { day: "Monday", time: "Closed" },
      { day: "Tuesday", time: "10:00 AM - 8:00 PM" },
      { day: "Wednesday", time: "10:00 AM - 8:00 PM" },
      { day: "Thursday", time: "10:00 AM - 1:00 PM" },
      { day: "Friday", time: "10:00 AM - 9:00 PM" },
      { day: "Saturday", time: "11:00 AM - 7:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    isOpen: true, // A simple boolean to indicate if the store is currently open.
    mapLink: "https://maps.google.com/?q=123+Main+Street,+Anytown,+USA",
  });
  
  // A helper function to check if the store is open today.
  // This is a simplified example; a real app would use more robust logic.
  const isStoreOpenToday = () => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const todayHours = storeInfo.hours.find((h) => h.day === today);
    return todayHours && todayHours.time !== "Closed";
  };
  
  if(!myStore){
    return <LoadingSpinner/>
  }
  const Store = myStore.store
  return (
    <div className="min-h-screen   flex justify-center items-start sm:p-6 mt-10 ">
      <div className="w-full  max-w-2xl  rounded-3xl shadow-2xl overflow-hidden md:p-10">
        <div className="flex flex-col md:flex-row  md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {Store.name}
            </h1>
            <p className="text-sm font-semibold text-gray-500 uppercase">
              {isStoreOpenToday() ? (
                <span className="text-green-600">Open Now</span>
              ) : (
                <span className="text-red-600">Closed</span>
              )}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <a
              href={storeInfo.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium text-sm rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              View on Map
            </a>
          </div>
        </div>

        {/* Address and Contact section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-gray-200 pt-6">
          {/* Address */}
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 mr-3 mt-1"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <p className="text-white font-medium text-lg">Address</p>
              <p className="text-gray-600">{storeInfo.address}</p>
            </div>
          </div>

          {/* Phone number */}
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 mr-3 mt-1"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div>
              <p className="text-white font-medium text-lg">Phone</p>
              <a
                href={`tel:${storeInfo.phone}`}
                className="text-indigo-600 hover:underline"
              >
                {storeInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Operating Hours section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 mr-3"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <h2 className="text-white font-medium text-lg">Operating Hours</h2>
          </div>
          <ul className="space-y-2">
            {storeInfo.hours.map((hour, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-gray-600"
              >
                <span className="font-semibold text-gray-600">{hour.day}</span>
                <span>{hour.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
