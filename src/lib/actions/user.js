import User from "../models/userModel.js";
import { connectToDatabase } from "../mongodb/mongoose.js";
import { inngest } from "./../../config/inngest";

export const userCreation = inngest.createFunction(
  { id: "user-creation", name: "User Creation" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectToDatabase();
    const {
      id,
      first_name,
      last_name,
      username,
      email_addresses,
      image_url,
    } = event.data;
    const newUser = await User.create({
      clerkId:id,
      firstName: first_name,
      lastName: last_name,
      username,
      email:
        email_addresses.length > 0 ? email_addresses[0].email_address : null,
      avatar: image_url,
    });
    return newUser;
  }
);

export const userDeletion = inngest.createFunction(
  { id: "user-deletion", name: "User Deletion" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectToDatabase();
    const { id } = event.data;
    const deletedUser = await User.findOneAndDelete({ clerkId: id });
    if (!deletedUser) {
      throw new Error("User not found");
    } else {
      return deletedUser;
    }
  }
);

export const userUpdate = inngest.createFunction(
  { id: "user-update", name: "User Update" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await connectToDatabase();
    const { id, first_name, last_name, username, email_addresses, image_url } =
      event.data;
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: id },
      {
        firstName: first_name,
        lastName: last_name,
        username,
        email:
          email_addresses.length > 0 ? email_addresses[0].email_address : null,
        avatar: image_url,
      },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    } else {
      return updatedUser;
    }
  }
);
