"use server"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();

    // Simulating a successful payment response
    const mockOrderId = "mock_order_" + new Date().getTime(); 

    // Simulating a successful response like Razorpay
    let mockResponse = {
        id: mockOrderId,
        amount: amount,
        currency: "INR",
        status: "created", 
    };

    // Save payment details to your database (this would still work with mock data)
    await Payment.create({
        oid: mockResponse.id,
        amount: amount,  
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message,
    });
    return mockResponse;
};

const convertToStrings = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map((item) => convertToStrings(item));
    } else if (obj && typeof obj === "object") {
      return Object.keys(obj).reduce((acc, key) => {
        if (obj[key] instanceof Date) {
          acc[key] = obj[key].toISOString(); 
        } else if (obj[key] && obj[key]._bsontype === "ObjectID") {
          acc[key] = obj[key].toString(); 
        } else {
          acc[key] = convertToStrings(obj[key]); 
        }
        return acc;
      }, {});
    }
    return obj;
};

export const fetchser = async (username) => {
    await connectDb()
    let u = await  User.findOne({username}).lean()
    if (u) {
        u = convertToStrings(u)
        u._id = u._id.toString(); 
    }
    return u
}

export const fetchpayments = async (username) => {
    await connectDb()
    let p = await Payment.find({to_user: username}).sort({amount:-1}).lean()
    return p.map(payment => ({
        ...payment,
        _id: payment._id.toString(),
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString(),
    }));
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let { _id, ...ndata } = data;

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})    
    }
    else{
        await User.updateOne({email: ndata.email}, ndata)
    }
}