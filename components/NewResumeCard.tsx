"use client";
import { Card, CardFooter, Image, Button, CardBody } from "@nextui-org/react";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

//note we cannot pass functions as server components and client components' props as they cannot
//be serialized over the internet
function NewResumeCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const data = await createNewEntry();

    router.push(`/resumes/${data.id}`);
    // Note: We're not setting loading to false here because we're navigating away
  };

  return (
    <div className="w-full aspect-[4/3] flex items-center justify-center">
      <div className="relative">
        <div
          onClick={handleClick}
          className={`w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold hover:bg-primary-dark transition-colors ${
            loading ? "opacity-50" : ""
          }`}
        >
          +
        </div>
        {loading && (
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}

export default NewResumeCard;
