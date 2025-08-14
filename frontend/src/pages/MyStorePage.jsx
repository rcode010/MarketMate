import { Info, ListOrdered, Store } from "lucide-react";
import React from "react";
import { useState } from "react";
import StoreInfo from "../components/StoreInfo";
import RecentOrder from "../components/RecentOrder";
import MyStoreProduct from "../components/MyStoreProduct";

const MyStorePage = () => {
  const tabs = [
    { id: "Store Info", label: "Create Product", icon: Store },
    { id: "My product", label: "Products", icon: Info },
    { id: "Recent Order", label: "Analytics", icon: ListOrdered },
  ];
  const [activeTab , setActiveTab] = useState("Store Info");
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-6">

        <h1 className="justify-center flex  font-extrabold text-4xl text-blue-200">
          This is your store
        </h1>
        <div className="flex justify-center mt-8">
            {tabs.map((el) => {
            return <button className={`flex cursor-pointer justify-center rounded-md mt-5 px-3 py-2 mr-4 ${activeTab===el.id?"bg-blue-600":"bg-transparent"}`}
            onClick={()=>{setActiveTab(el.id)}}
            ><el.icon/>&nbsp; {el.id}</button>;
            })}
        </div>
        {activeTab ==="Store Info" && <StoreInfo/>}
        {activeTab === "My product" && <MyStoreProduct/>}
        {activeTab === "Recent Order" && <RecentOrder/>}

      </div>
    </div>
  );
};

export default MyStorePage;
