import { connectionStr } from "@/app/lib/db.js";
import { foodSchema } from "@/app/lib/foodsModel.js";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content){
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await foodSchema.findOne({_id:id});
    if (result){
        success = true;
    }
    return NextResponse.json({ result, success });
}

export async function PUT(request, content){
    const id = content.params.id;
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await foodSchema.findOneAndUpdate({_id: id}, payload, {new: true});
    if (result){
        success = true;
    }
    return NextResponse.json({ result, success });

}