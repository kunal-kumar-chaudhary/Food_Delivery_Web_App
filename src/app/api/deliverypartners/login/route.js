import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { deliveryPartnersSchema } from "@/app/lib/deliveryPartnerModels";


export async function POST(request){
    // mongodb connection
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const payload = await request.json();
    console.log("payload", payload);
    let success = false;

    const result =  await deliveryPartnersSchema.findOne({mobile: payload.mobile, password: payload.password});

    if(result){
        success = true;
    }

    return NextResponse.json({result, success});
}