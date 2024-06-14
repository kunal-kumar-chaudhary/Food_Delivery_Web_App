import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { orderSchema } from "@/app/lib/ordersModel.js";
import { restaurantSchema } from "@/app/lib/restaurantsModel.js";


export async function GET(request,content){
    const id = content.params.id; 
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result = await orderSchema.find({deliveryBoy_id: id});
    console.log("result", result);
    if (result){
        let restoData = await Promise.all(
            result.map(async (item)=> {
                let restoInfo = {};
                restoInfo.data = await restaurantSchema.findOne({_id: item.resto_id});
                restoInfo.amount = item.amount;
                restoInfo.status = item.status;
                return restoInfo;
            })
        )
        result = restoData;
        success = true;
    }
    return NextResponse.json({ result, success });
}