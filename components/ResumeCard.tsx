"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

function ResumeCard({ resume }) {
  const date = resume?.createdAt
    ? new Date(resume.createdAt).toDateString()
    : "Date not available";

  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => console.log("item pressed")}
      className="w-full h-full"
    >
      <CardBody className="p-0">
        <Image
          radius="lg"
          width="100%"
          height="100%"
          alt={resume?.title || "Resume image"}
          className="object-cover"
          src="https://cdn.pixabay.com/photo/2017/08/12/23/29/background-texture-2635740_640.jpg"
        />
      </CardBody>
      <CardFooter className="flex-col items-start">
        <b className="text-lg">{resume?.title || "Untitled"}</b>
        <p className="text-default-500 text-sm">{date}</p>
      </CardFooter>
    </Card>
  );
}

export default ResumeCard;
