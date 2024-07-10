import { getUserByClerkID } from "@/utils/auth";

import { prisma } from "@/utils/db";
import ResumeEditor from "@/components/ResumeEditor";

const getResume = async (id) => {
  const user = await getUserByClerkID();
  const resume = await prisma.resume.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  });

  return resume;
};
const ResumeData = async ({ params }) => {
  const resume = await getResume(params.id);
  return (
    <>
      <ResumeEditor resume={resume} />
      {/*note: we can pass props from client to server components as long as they are serializable*/}
      {/*since resume has been fetched from the database(ie been over the internet, it is serializable*/}
      {/*so we can pass it as a prop*/}
    </>
  );
};

export default ResumeData;
