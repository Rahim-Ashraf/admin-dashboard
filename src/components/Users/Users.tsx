"use client"

import { Box, Modal } from "@mui/material";
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
    id: number;
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

    //for use details modal
    const [singleUser, setSingleUser] = useState<UserType>()
    const [open, setOpen] = useState(false);
    const handleOpen = (user: UserType) => {
        setSingleUser(user)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="space-y-2 lg:space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="w-full">
                            <h2 className="text-lg lg:text-xl font-semibold">Personal details</h2>
                            <h3><span className="font-semibold">Name</span>: {singleUser?.name}</h3>
                            <h3><span className="font-semibold">UserName</span>: {singleUser?.username}</h3>
                            <h3><span className="font-semibold">Email</span>: {singleUser?.email}</h3>
                            <h3><span className="font-semibold">Phone</span>: {singleUser?.phone}</h3>
                            <h3><span className="font-semibold">Websitet</span>: {singleUser?.website}</h3>
                        </div>
                        <div className="w-full">
                            <h2 className="text-lg lg:text-xl font-semibold">Company details</h2>
                            <h3><span className="font-semibold">Company name</span>: {singleUser?.company.name}</h3>
                            <h3><span className="font-semibold">Company BS</span>: {singleUser?.company.bs}</h3>
                            <h3><span className="font-semibold">Catch phrase</span>: {singleUser?.company.catchPhrase}</h3>
                        </div>
                        <div className="w-full">
                            <h2 className="text-lg lg:text-xl font-semibold">Full address</h2>
                            <h3><span className="font-semibold">City</span>: {singleUser?.address.city}</h3>
                            <h3><span className="font-semibold">Zipcode</span>: {singleUser?.address.zipcode}</h3>
                            <h3><span className="font-semibold">Street</span>: {singleUser?.address.street}</h3>
                            <h3><span className="font-semibold">Suite</span>: {singleUser?.address.suite}</h3>
                            <h3><span className="font-semibold">GEO-lat</span>: {singleUser?.address.geo.lat}</h3>
                            <h3><span className="font-semibold">GEO-lng</span>: {singleUser?.address.geo.lng}</h3>
                        </div>
                    </div>
                    <div className="flex justify-center my-4">
                        <button onClick={handleClose}
                            className="w-full lg:w-fit bg-slate-600 text-white px-4 py-2 rounded">Close</button>
                    </div>
                </Box>
            </Modal>
            <div className="lg:flex justify-evenly items-center mb-8 mt-4 space-y-4">
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
                        <button onClick={() => handleOpen(user)}
                            className="bg-sky-500 text-white px-4 py-2 rounded mt-4">View details</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Users

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1080,
    minWidth: 320,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 2,
};