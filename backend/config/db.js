import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://dinidu1234:dinidu1234@clusterfoodordering.7agyz.mongodb.net/foodOrdering"
    )
    .then(() => console.log("DB Connected"));
};


 