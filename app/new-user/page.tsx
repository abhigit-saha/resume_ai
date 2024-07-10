import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/utils/db";
import { redirect } from "next/navigation";
const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!match) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }
  redirect("/resumes");
};
const NewUser = async () => {
  await createNewUser();
  return <div>Loading...</div>;
};

export default NewUser;
