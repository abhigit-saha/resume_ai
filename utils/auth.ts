import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";

// Helper function to get the current user in the db based on the clerk id
export const getUserByClerkID = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  });

  return user;
};
