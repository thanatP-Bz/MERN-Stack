import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

export default mongoose.model("User", UserSchema);
