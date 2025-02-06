"use client"

import { useEffect, useState } from "react";

interface UserType {
    address: {
        city: string;
        geo: {
            lat: string;
            lng: string;
        };
        street: string;
        suite: string;
        zipcode: string;
    };
    company: {
        bs: string;
        catchPhrase: string;
        name: string;
    };
    email: string;
    id: 1;
    name: string;
    phone: string;
    username: string;
    website: string;
}

function Users() {
    const [users, setUsers] = useState<UserType[]>([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(async (res) => {
                const data = await res.json()
                setUsers(data)
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between">
            {
                users.map(user => (
                    <div key={user.id}
                        className="bg-slate-100 rounded p-4 lg:flex justify-between items-end"
                    >
                        <div>
                            <h3><span className="font-semibold">Name:</span> {user.name}</h3>
                            <h4><span className="font-semibold">Email:</span> {user.email}</h4>
                            <h4><span className="font-semibold">City:</span> {user.address.city}</h4>
                        </div>
                        <button className="bg-sky-500 text-white px-4 py-2 rounded mt-4">View details</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Users