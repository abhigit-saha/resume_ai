import { getUserByClerkID } from "@/utils/auth";
import { ClerkProvider } from "@clerk/nextjs";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const POST = async () => {
  const user = await getUserByClerkID();
  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      title: "",
      introduction: [],
      educationalQual: [],
      professionalExp: [],
      skills: [],
      projects: [],
      name: "",
      email: "",
      contact: "",
      awards: [],
    },
  });
  revalidatePath("/resumes"); //done to check every time we create a new entry, that the client
  //is up to date with the server or not
  return NextResponse.json({ data: resume });
};
