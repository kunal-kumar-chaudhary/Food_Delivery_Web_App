import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { deliveryPartnersSchema } from "@/app/lib/deliveryPartnerModels.js";

export async function POST(request) {
  // mongodb connection
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const payload = await request.json();
  console.log("payload", payload);
  let success = false;

  const user = new deliveryPartnersSchema({
    name: payload.name,
    mobile: payload.mobile,
    password: payload.password,
    city: payload.city,
    address: payload.address,
  });

  const result = await user.save();

  console.log("result", result);
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
