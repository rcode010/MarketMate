import React from "react";
import { useStore } from "../stores/useStoreStore.js";
import { useEffect } from "react";
import {
  BriefcaseIcon,
  Calendar,
  CheckIcon,
  CurrencyIcon,
  LinkIcon,
  MapIcon,
  PencilIcon,
  PersonStanding,
  PersonStandingIcon,
  ViewIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const StoresPage = () => {
  const { stores, getAllStores } = useStore();
  useEffect(() => {
    getAllStores();
  }, [getAllStores, stores]);
  return (
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-6 mt-6">
      {stores.stores?.map((el) => (
        <div
            className="p-4 border rounded-xl bg-gray-800 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Left side */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white truncate">
                {el.name}
              </h2>
              <div className="flex items-center text-sm text-gray-400">
                <PersonStandingIcon
                  aria-hidden="true"
                  className="mr-2 size-5 shrink-0 text-gray-500"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex justify-start sm:justify-end">
              <Link
                to={`/store/${el.owner}`}
                className="inline-flex items-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <ViewIcon aria-hidden="true" className="mr-2 size-5" />
                View
              </Link>
            </div>
          </div>
      ))}
    </div>
  );
};

export default StoresPage;
