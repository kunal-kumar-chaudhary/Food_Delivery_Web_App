import mongoose from "mongoose";
import {restaurantSchema} from "@/app/lib/restaurantsModel.js";
import { connectionStr } from "@/app/lib/db.js";
import { NextResponse } from "next/server";
import { foodSchema } from "@/app/lib/foodsModel";

export async function GET(request, content){
    let success = false;
        // mongodb connection
        const id = content.params.id;
        await mongoose.connect(connectionStr, { useNewUrlParser: true })
        // getting restaurant details from the id
        const details = await restaurantSchema.findOne({_id: id});
        // getting all the foods corresponding to the restaurant
        const foodDetails = await foodSchema.find({resto_id: id});

        if (details && foodDetails){
            success = true;
        }

        return NextResponse.json({ details, foodDetails , success });
}
