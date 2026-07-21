import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { User } from "@/Model/User";
import connect from "@/utils/db";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "HomeEase-Home Service Provider",
    description: "Made By Team HomeEase",
};

export const dynamic = 'force-dynamic';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "your-super-secret-key-change-me"
);

async function getUserFromCookie() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("session_token");

    if (!tokenCookie) {
        return null;
    }

    const token = tokenCookie.value;

    try {
        await connect();
        const { payload } = await jwtVerify(token, JWT_SECRET);
        // Normalize userId in case the JWT contains a binary/Object form
        let userId = payload.userId;
        if (userId && typeof userId === 'object') {
            if (userId.buffer) {
                const vals = Object.keys(userId.buffer).map((k) => Number(userId.buffer[k]));
                userId = Buffer.from(vals).toString('hex');
            } else if (userId.id && userId.id.buffer) {
                const vals = Object.keys(userId.id.buffer).map((k) => Number(userId.id.buffer[k]));
                userId = Buffer.from(vals).toString('hex');
            } else if (typeof userId.toString === 'function') {
                userId = userId.toString();
            } else {
                userId = JSON.stringify(userId);
            }
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return null;
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error("Failed to verify token or fetch user:", error);
        return null;
    }
}

export default async function RootLayout({ children }) {
    const user = await getUserFromCookie();

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                suppressHydrationWarning
            >
                <ToastContainer />
                <AuthProvider initialUser={user}>
                    <Header user={user}></Header>
                    {children}
                    <Footer></Footer>
                </AuthProvider>
            </body>
        </html>
    );
}