
import connect from "@/utils/db";
import { User } from "@/Model/User";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        await connect();

        const vendors = await User.find({ role: "vendor" });

        return NextResponse.json({
            message: "Vendors fetched successfully",
            vendors
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching vendors:", error);
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 });
    }
};
