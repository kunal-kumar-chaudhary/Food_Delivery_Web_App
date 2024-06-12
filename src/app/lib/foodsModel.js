import mongoose from "mongoose";

const foodModel = new mongoose.Schema(
    {
        name: String,
        price: Number,
        img_path: String,
        description: String,
        resto_id: mongoose.Schema.Types.ObjectId,
    }
);

// mongoose models are compiled only once
// if we are using this model in different files, it will give us an error that the model is already compiled
// so we check if the model is already compiled or not
// if it is compiled, we use the compiled model
// if not, we compile the model
export const foodSchema = mongoose.models.foods || mongoose.model("foods", foodModel);