import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
export default async function Home() {
  const { userId } = await auth();
  const href = userId ? "/resumes" : "/new-user";
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black text-white">
      <div className=" w-full max-w-[600px] mx-auto">
        <div>
          <h1 className="text-6xl">Get your resume AI proofed!</h1>
          <p>
            Build your resume as professionally as possible using the power of
            AI
          </p>
          <div>
            <Link href={href}>
              <button className="bg-blue-800 px-4 py-2 rounded-lg mt-5">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
