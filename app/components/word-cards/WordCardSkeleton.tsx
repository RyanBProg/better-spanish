import React from "react";

export default function NumberCardSkeleton() {
  return (
    <li className="animate-pulse w-full bg-gray-100 pt-8 pb-4 px-4 relative shadow-2xl rounded-sm">
      <div className="relative flex justify-between pb-8">
        <div className=" bg-gray-300 w-fit h-fit rounded-md px-2 py-1 text-sm text-gray-300">
          Card Title Placeholder
        </div>
        <div className="bg-gray-300 w-fit h-fit rounded-md px-2 py-1 text-sm text-gray-300 hover:brightness-110">
          Show Answer
        </div>
      </div>
      <hr className="h-[2px] bg-gray-200-100 left-4 right-4" />
      <div className="flex mt-4">
        <div className="bg-gray-200 rounded-l-md px-2 py-1 flex-grow min-w-0" />
        <div className="bg-gray-300 text-gray-300 rounded-r-md px-2 py-1 hover:brightness-110">
          Submit
        </div>
      </div>
    </li>
  );
}
