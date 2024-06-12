import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurantsModel";

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const data = await restaurantSchema.find();
  console.log("data", data);
  return NextResponse.json({ result: true });
}

export async function POST(request) {
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let payload = await request.json();
  let result;
  let success = false;
  if (payload.login) {
    // use it for login
    result = await restaurantSchema.findOne({email: payload.email,
        password: payload.password
    });
    if (result) {
      success = true;
    }

  } else {
    // use it for signup
    let restaurant = new restaurantSchema(payload);
    result = await restaurant.save();
    if (result) {
      success = true;
    }
  }
  return NextResponse.json({ result, success });
}
