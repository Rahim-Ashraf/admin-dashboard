"use client"

import { ChangeEvent, useEffect, useState } from "react";

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
    const [storedUsers, setStoredUsers] = useState<UserType[]>([]);
    const [not, setNot] = useState(true); // for forcefully update the ui

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(async (res) => {
                const data = await res.json()
                setUsers(data)
                setStoredUsers(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    //search function
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value
        const text = value.toLowerCase()

        const filteredUsers = storedUsers.filter(user => {
            const name = user.name.toLowerCase()
            const found = name.indexOf(text)
            if (found >= 0) {
                return user
            }
        })
        setUsers(filteredUsers)
    }

    // sort function
    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const text = e.target.value
        if (text === "sort_by_name") {
            const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name))
            setNot(!not)
            setUsers(sortedUsers)
        }
        else if (text === "default") {
            const sortedUsers = users.sort((a, b) => a.id - b.id)
            setNot(!not)
            setUsers(sortedUsers)
        }
    }

    return (
        <div>
            <div className="flex justify-evenly items-center mb-8 mt-4">
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
            <div className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between">
                {users.map(user => (
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
                ))}
            </div>
        </div>
    )
}

export default Users