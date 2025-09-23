import React from "react";
import { href, Link } from "react-router-dom";
const HomePage = () => {
    const categories = [
    {name: "jeans", href:"../public/jeans.jpg"},
    {name: "t-shirts",href:"../public/tshirts.jpg"},
    {name: "shoes", href:"../public/shoes.jpg"},
    {name: "glasses",href:'../public/glasses.png'},
    {name: "jackets",href:'../public/jackets.jpg'},
    {name: "suits", href:'../public/suits.jpg'},
    {name: "bags",href:'../public/bags.jpg'}
  ];
  return (
    <div>
      <div className="bg-transparent">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Categories
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {categories.map((el) => (
              <div key={el.id} className="group relative">
                <img
                  src={el.href}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-white">
                      <a href={el.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {el.name}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
