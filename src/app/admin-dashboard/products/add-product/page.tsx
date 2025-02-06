"use client"

import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

function AddProduct() {
  const initialValues = {
    name: "",
    color: "",
    capacity: ""
  }
  const [formData, setFormData] = useState(initialValues);

  const handleProductUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = {
      name: formData.name,
      data: {
        color: formData.color,
        capacity: formData.capacity,
      }
    }

    try {
      const response = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      console.log(await response.json())
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product uploaded",
        showConfirmButton: false,
        timer: 1500
      });

      // clear form after successfully upload
      setFormData(initialValues)

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error uploading the product",
      });
    }
  }

  return (
    <form onSubmit={handleProductUpload}
      className="max-w-screen-sm mx-auto">
      <label>
        Product name
        <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Product name" required
          className="px-4 py-2 rounded w-full border border-slate-600 mb-4" />
      </label>
      <label>
        Product color
        <input onChange={(e) => setFormData({ ...formData, color: e.target.value })} type="text" placeholder="Product color" required
          className="px-4 py-2 rounded w-full border border-slate-600 mb-4" />
      </label>
      <label>
        Capacity
        <input onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} type="text" placeholder="Capacity" required
          className="px-4 py-2 rounded w-full border border-slate-600 mb-4" />
      </label>
      <input type="submit" value="Upload Product"
        className="px-4 py-2 bg-sky-500 text-white rounded w-full cursor-pointer" />
    </form>
  )
}

export default AddProduct