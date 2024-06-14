import mongoose from "mongoose";
import {restaurantSchema} from "@/app/lib/restaurantsModel.js";
import { connectionStr } from "@/app/lib/db.js";
import { NextResponse } from "next/server";

export async function GET(){
    let success = false;
    // mongodb connection
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    // getting all the entries
    let result = await restaurantSchema.find();
    // converting the city names to capitalize the first letter
    result = result.map((item) => item?.city?.charAt(0).toUpperCase()+item?.city?.slice(1));
    // removing duplicate entries
    result = [...new Set(result)];
    if(result){
        success = true;
    }
    return NextResponse.json({ result, success });
}