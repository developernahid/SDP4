
import connect from "@/utils/db";
import { User } from "@/Model/User";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
    try {
        await connect();
        const body = await request.json();
        const {
            id,
            username,
            email,
            role,
            photoURL,
            phoneNumber,
            businessName,
            businessAddress,
            serviceType,
            experience,
            serviceArea,
            workingHoursStart,
            workingHoursEnd,
            receiveOrderType,
            documents,
            ownerName,
            nicNumber,
            nicExpiryDate,
            paymentMethod,
            pricingMethod,
            hourlyFee,
            flatFee,
            additionalInfo
        } = body;

        console.log(body);

        const updatedUser = await User.findByIdAndUpdate(id, {
            username,
            email,
            role,
            photoURL,
            phoneNumber,
            businessName,
            businessAddress,
            serviceType,
            experience,
            serviceArea,
            workingHoursStart,
            workingHoursEnd,
            receiveOrderType,
            documents,
            ownerName,
            nicNumber,
            nicExpiryDate,
            paymentMethod,
            pricingMethod,
            hourlyFee,
            flatFee,
            additionalInfo,
            updatedAt: Date.now()
        }, { new: true });

        if (!updatedUser) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "User updated successfully",
            user: updatedUser
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 });
    }
};
