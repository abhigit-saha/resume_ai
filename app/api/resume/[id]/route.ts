import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const id = params.id;
  const {
    introduction,
    educationalQual,
    professionalExp,
    skills,
    projects,
    name,
    email,
    contact,
  } = request.json();
  const user = await getUserByClerkID();
  const updatedResume = await prisma.resume.update({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    data: {
      introduction,
      educationalQual,
      professionalExp,
      skills,
      projects,
      name,
      email,
      contact,
    },
  });

  return NextResponse.json({ data: updatedResume });
};
