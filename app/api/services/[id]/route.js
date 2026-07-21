
import { ServiceCategory } from "@/Model/ServiceCategory";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
    const { id } = params;
    const body = await request.json();
    try {
        await connect();
        await ServiceCategory.findByIdAndUpdate(id, body);
        return NextResponse.json({ message: "Service category updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update service category" }, { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    const { id } = params;
    try {
        await connect();
        await ServiceCategory.findByIdAndDelete(id);
        return NextResponse.json({ message: "Service category deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete service category" }, { status: 500 });
    }
}
