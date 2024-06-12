import {foodSchema} from "@/app/lib/foodsModel.js";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db.js";

export async function GET(request, content){
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await foodSchema.find({resto_id:id});
    console.log(result);
    if (result){
        success = true;
    }
    return NextResponse.json({ result, success });
}

export async function DELETE(request, content){
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await foodSchema.deleteOne({_id:id});
    if (result.deletedCount>0){
        success = true; 
    }
    return NextResponse.json({ result, success });
}