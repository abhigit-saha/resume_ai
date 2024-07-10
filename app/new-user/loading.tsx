import { Spinner } from "@nextui-org/spinner";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Spinner />
    </div>
  );
}
