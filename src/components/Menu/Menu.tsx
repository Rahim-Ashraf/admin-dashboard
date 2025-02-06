"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Menu() {
    const pathname = usePathname()

    return (
        <div className="lg:w-1/5 lg:border-r p-2">
            <ul className="flex lg:flex-col gap-4">
                <li><Link href="/admin-dashboard/users"
                    className={`${pathname === '/admin-dashboard/users' ? 'text-sky-500' : ''}`}>All Users</Link></li>
                <li><Link href="/admin-dashboard/products"
                    className={`${pathname === '/admin-dashboard/products' ? 'text-sky-500' : ''}`}>Products</Link></li>
            </ul>
        </div>
    )
}

export default Menu