import React from "react";

export default function NumberCardSkeleton() {
  return (
    <li className="animate-pulse w-full bg-gray-100 py-8 px-4 relative shadow-2xl">
      <div className="relative flex justify-between">
        <div className="mb-10 bg-gray-300 w-fit h-fit rounded-md px-2 py-1 text-sm text-gray-300">
          Card Title Placeholder
        </div>
        <div className="bg-gray-300 w-fit h-fit rounded-md px-2 py-1 text-sm text-gray-300 hover:brightness-110">
          Show Answer
        </div>
      </div>
      <hr className="h-[2px] bg-gray-200-100 absolute left-4 right-4 top-20" />
      <div className="flex">
        <div className="bg-gray-200 rounded-l-md px-2 py-1 flex-grow min-w-0" />
        <div className="bg-gray-300 text-gray-300 rounded-r-md px-2 py-1 hover:brightness-110">
          Submit
        </div>
      </div>
    </li>
  );
}
