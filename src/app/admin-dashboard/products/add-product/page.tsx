"use client"

import Swal from "sweetalert2";

function page() {

  const handleProductUpload = async (event: any) => {
    event.preventDefault()
    const name = event.target.name.value;
    const data = {
      color: event.target.color.value,
      capacity: event.target.capacity.value
    }
    const formData = { name, data }

    try {
      const response = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(formData)
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
      event.target.name.value = ""
      event.target.color.value = ""
      event.target.capacity.value = ""
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
        <input name="name" type="text" placeholder="Product name" required
          className="px-4 py-2 rounded w-full border border-slate-600 mb-4" />
      </label>
      <label>
        Product color
        <input name="color" type="text" placeholder="Product color" required
          className="px-4 py-2 rounded w-full border border-slate-600 mb-4" />
      </label>
      <label>
        Capacity
        <input name="capacity" type="text" placeholder="Capacity" required
          className="px-4 py-2 rounded w-full border border-slate-600 mb-4" />
      </label>
      <input type="submit" value="Upload Product"
        className="px-4 py-2 bg-sky-500 text-white rounded w-full cursor-pointer" />
    </form>
  )
}

export default page