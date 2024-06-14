import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { deliveryPartnersSchema } from "@/app/lib/deliveryPartnerModels";


export async function GET(request,content){
    // database connection
    await mongoose.connect(connectionStr, { useNewUrlParser: true }); 
    let city = content.params.city;
    let success = false;
    // removing city sensitivity
    let filter = {city:{$regex: new RegExp(city, "i")}};
    // getting all the entries
    let result = await deliveryPartnersSchema.find(filter);
    if (result){
        success = true;
    }
    return NextResponse.json({result, success});
}