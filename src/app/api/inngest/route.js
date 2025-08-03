import { serve } from "inngest/next";
import { inngest } from "@/config/inngest.js";
import { userCreation, userDeletion, userUpdate } from "@/lib/actions/user";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [userCreation, userDeletion, userUpdate],
});
