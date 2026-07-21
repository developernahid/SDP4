
import { Product } from "@/Model/Product";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { withAuth } from "@/middleware/withAuth";

export const GET = withAuth(async (req, { params }) => {
    await connect();
    const { id } = params;
    const data = await Product.findById(id);
    return NextResponse.json(data, { status: 200 });
});

export const PUT = withAuth(async (req, { params }) => {
    await connect();
    const { id } = params;
    const product = await Product.findById(id);

    if (req.user.role !== "admin" && product.vendor.toString() !== req.user._id.toString()) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedProduct, { status: 200 });
});

export const DELETE = withAuth(async (req, { params }) => {
    await connect();
    const { id } = params;
    const product = await Product.findById(id);

    if (req.user.role !== "admin" && product.vendor.toString() !== req.user._id.toString()) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
});
