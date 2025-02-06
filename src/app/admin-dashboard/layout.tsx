"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

function layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname()

    return (
        <div className="px-4 flex justify-between max-w-screen-2xl mx-auto">
            <div className="lg:w-1/5 border-r p-2">
                <ul>
                    <li><Link href="/admin-dashboard/users"
                        className={`${pathname === '/admin-dashboard/users' ? 'text-sky-500' : ''}`}>All Users</Link></li>
                    <li><Link href="/admin-dashboard/products"
                        className={`${pathname === '/admin-dashboard/products' ? 'text-sky-500' : ''}`}>Products</Link></li>
                </ul>
            </div>
            <div className="lg:w-4/5 p-2">
                {children}
            </div>
        </div>
    )
}

export default layout