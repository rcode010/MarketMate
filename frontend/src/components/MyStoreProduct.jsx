import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore.js";

const MyStoreProduct = () => {
  const { product, getAllProduct } = useProductStore();
  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);
  const Products = product?.products || [];
  return (
    <div>
      <Link
        to="/create-new-product"
        className="p-2 bg-blue-600 rounded-md cursor-pointer"
      >
        Create new Product
      </Link>

      <div className="bg-transparent">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Your Products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Products.map((product) => (
              <div key={product.id} className="group relative">
                <img
                  src={product.image}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-white">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {product.price}$
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStoreProduct;
