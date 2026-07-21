"use client"
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link'
import React from 'react'

const DashNav = () => {
    const { user } = useAuth();

    return (
        <nav>
            {
                user?.role == "admin" && (
                    <ul>
                        <li>
                            <Link href="/dashboard/admin">Admin Dashboard</Link>
                        </li>
                    </ul>
                )
            }
            {
                user?.role == "vendor" && (
                    <ul>
                        <li>
                            <Link href="/dashboard/vendor">Vendor Dashboard</Link>
                        </li>
                    </ul>
                )
            }
            {
                user?.role == "user" && (
                    <ul>
                       
                    </ul>
                )
            }
        </nav>
    )
}

export default DashNav
