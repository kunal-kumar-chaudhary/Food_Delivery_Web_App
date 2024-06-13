import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { userSchema } from "@/app/lib/userModel.js";


export async function POST(request){
    // mongodb connection
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const payload = await request.json();
    console.log("payload", payload);
    let success = false;

    const user =  new userSchema(payload);
    const result = await user.save()

    if(result){
        success = true;
    }

    return NextResponse.json({result, success});
}