import User from "../models/userModel.js";
import { connectToDatabase } from "../mongodb/mongoose.js";

export const createOrUpdateUser = async ({
  id,
  first_name,
  last_name,
  email_addresses,
  image_url,
  username,
}) => {
  await connectToDatabase();
  try {
    const user = new User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          clerkId: id,
          firstName: first_name,
          lastName: last_name,
          email: email_addresses[0].email_address,
          avatar: image_url,
          username,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  await connectToDatabase();
  try {
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
