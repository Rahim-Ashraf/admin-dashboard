"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductType {
    id: string;
    name: string;
    data?: {
        color: string;
        capacity: string;
    };
}

function Products() {
    const [products, setProducts] = useState<ProductType[]>([]);
    useEffect(() => {
        fetch("https://api.restful-api.dev/objects")
            .then(async (res) => {
                const data = await res.json()
                setProducts(data)
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className="px-4">
            <div className="mb-8 mt-4">
                <Link href="/admin-dashboard/products/add-product"
                    className="bg-sky-500 text-white px-4 py-2 rounded mt-4">Add new Product</Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between">
                {
                    products.map(product => (
                        <div key={product.id}
                            className="bg-slate-100 rounded p-4 lg:flex justify-between items-end"
                        >
                            <div>
                                <h3><span className="font-semibold">Product name:</span> {product.name}</h3>
                                <h4><span className="font-semibold">Capacity:</span> {product.data?.capacity}</h4>
                                <h4><span className="font-semibold">Product color:</span> {product.data?.color}</h4>
                            </div>
                            <button className="bg-sky-500 text-white px-4 py-2 rounded mt-4">View details</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Products