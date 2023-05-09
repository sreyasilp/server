import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: String, required: false },
    country: { type: String, required: false },
    phoneNumber: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", addressSchema);
