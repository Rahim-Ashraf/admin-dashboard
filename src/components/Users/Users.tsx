"use client"

import { useEffect, useState } from "react";

interface UserType {
    address: {
        city: "Gwenborough";
        geo: {
            lat: "-37.3159";
            lng: "81.1496";
        };
        street: "Kulas Light";
        suite: "Apt. 556";
        zipcode: "92998-3874";
    };
    company: {
        bs: "harness real-time e-markets";
        catchPhrase: "Multi-layered client-server neural-net";
        name: "Romaguera-Crona";
    };
    email: "Sincere@april.biz";
    id: 1;
    name: "Leanne Graham";
    phone: "1-770-736-8031 x56442";
    username: "Bret";
    website: "hildegard.org";
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
        <div className="px-4 flex justify-between">
            {
                users.map(user => (
                    <div key={user.id}>
                        {user.name}
                    </div>
                ))
            }
        </div>
    )
}

export default Users