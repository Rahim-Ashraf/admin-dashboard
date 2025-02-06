"use client"

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

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
    const [storedProducts, setStoredProducts] = useState<ProductType[]>([]);
    const [not, setNot] = useState(true); // for forcefully update the ui

    useEffect(() => {
        fetch("https://api.restful-api.dev/objects")
            .then(async (res) => {
                const data = await res.json()
                setProducts(data)
                setStoredProducts(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    //delete function
    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "You want to delete the product?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`https://api.restful-api.dev/objects/${id}`, {
                        method: "DELETE"
                    })
                    Swal.fire({
                        title: "Deleted!",
                        text: "Product has been deleted.",
                        icon: "success"
                    });
                    console.log(await res.json())
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error uploading the product",
                    });
                }
            }
        });
    }

    //search function
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value
        const text = value.toLowerCase()

        const filteredProducts = storedProducts.filter(product => {
            const name = product.name.toLowerCase()
            const found = name.indexOf(text)
            if (found >= 0) {
                return product
            }
        })
        setProducts(filteredProducts)
    }

    // sort function
    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const text = e.target.value
        if (text === "sort_by_name") {
            const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name))
            setNot(!not)
            setProducts(sortedProducts)
        }
        else if (text === "default") {
            const sortedProducts = products.sort((a, b) => a.id.localeCompare(b.id))
            setNot(!not)
            setProducts(sortedProducts)
        }
    }

    return (
        <div className="px-4">
            <div className="lg:flex justify-evenly items-center mb-8 mt-4 space-y-4">
                <div>
                    <Link href="/admin-dashboard/products/add-product"
                        className="bg-sky-500 text-white px-4 py-2 rounded mt-4">Add new Product</Link>
                </div>
                <div>
                    <label htmlFor="">
                        <input onChange={handleSearch} type="text" placeholder="Search by name"
                            className="border rounded px-2 py-1" />
                    </label>
                </div>
                <div>
                    <select onChange={handleSort}>
                        <option value="default">Default</option>
                        <option value="sort_by_name">Sort by name</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between">
                {
                    products.map(product => (
                        <div key={product.id}
                            className="bg-slate-100 rounded p-4 flex flex-col justify-between"
                        >
                            <div>
                                <h3><span className="font-semibold">Product name:</span> {product.name}</h3>
                                {product.data?.capacity && <h4><span className="font-semibold">Capacity:</span> {product.data?.capacity}</h4>}
                                {product.data?.color && <h4><span className="font-semibold">Product color:</span> {product.data?.color}</h4>}
                            </div>
                            <button onClick={() => handleDelete(product.id)}
                                className="bg-rose-500 text-white px-4 py-2 rounded mt-4 w-fit">Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Products