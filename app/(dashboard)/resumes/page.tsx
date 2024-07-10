import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import ResumeCard from "@/components/ResumeCard";
import NewResumeCard from "@/components/NewResumeCard";
import Link from "next/link";
const getResumes = async () => {
  const user = await getUserByClerkID();
  const resumes = await prisma.resume.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return resumes;
};
const ResumePage = async () => {
  const resumes = await getResumes();
  console.log("Resumes, ", resumes);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-10">
      <NewResumeCard />
      {resumes.map((resume) => (
        <Link
          href={`/resumes/${resume.id}`}
          className="w-full aspect-square"
          key={resume.id}
        >
          <ResumeCard resume={resume} />
        </Link>
      ))}
    </div>
  );
};

export default ResumePage;
