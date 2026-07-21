
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { User } from "@/Model/User";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export function withAuth(handler) {
    return async function (req, { params }) {
        const token = req.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                { message: "Authentication token not provided" },
                { status: 401 }
            );
        }

        try {
            const { payload } = await jwtVerify(token, secret);
            // Normalize payload.userId in case it's a binary/Object form
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

            const user = await User.findById(userId);

            if (!user) {
                return NextResponse.json(
                    { message: "User not found" },
                    { status: 404 }
                );
            }

            req.user = user;
            return handler(req, { params });
        } catch (error) {
            return NextResponse.json(
                { message: "Invalid or expired token" },
                { status: 401 }
            );
        }
    };
}
