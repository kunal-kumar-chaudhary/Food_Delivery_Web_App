import mongoose from "mongoose";
import {restaurantSchema} from "@/app/lib/restaurantsModel.js";
import { connectionStr } from "@/app/lib/db.js";
import { NextResponse } from "next/server";


export async function GET(request){
        let success = false;
        let queryParams = request.nextUrl.searchParams;
        let filter = {};
        if(queryParams.get("location")){
            let city = queryParams.get("location");
            filter = {city:{$regex: new RegExp(city, "i")}}
        }
        else if(queryParams.get("restaurant")){
            let name = queryParams.get("restaurant");
            console.log("restaurant name:", name);
            filter = {name:{$regex: new RegExp(name, "i")}}
        }
        // mongodb connection
        await mongoose.connect(connectionStr, { useNewUrlParser: true })
        // getting all the entries
        let result = await restaurantSchema.find(filter);

        if (result){
            success = true;
        }
        return NextResponse.json({result, success});
}