import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDb();

    try {
        const body = await req.json();
        const { razorpay_payment_id, razorpay_order_id } = body;

        if (!razorpay_payment_id || !razorpay_order_id) {
            console.error("Missing payment or order ID");
            return NextResponse.json({ error: "Missing payment or order ID" }, { status: 400 });
        }

        await Payment.updateOne(
            { oid: razorpay_order_id },
            { status: "completed", paymentId: razorpay_payment_id, done: true }
        );

        return NextResponse.json({ 
            success: true, 
            message: "Payment successful!", 
            redirectUrl: `/${body.username}?paymentdone=true` 
        });
    } 
    catch (error) {
        console.error("Error in Razorpay handler:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}