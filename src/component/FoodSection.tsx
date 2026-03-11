import { useEffect, useRef, type RefCallback } from "react";
import type { SectionType } from "../App";

type FoodSectionProps = {
  ref: RefCallback<HTMLDivElement>;
  title: SectionType;
};

export default function FoodSection({ title, ref }: FoodSectionProps) {
  return (
    <>
      <div
        ref={ref}
        id={title}
        className={`scroll-mt-40 w-[90vw] mx-auto mt-8 bg-gray-50 min-h-[50vh] p-4 rounded-lg shadow-sm border border-gray-100 ${""}`}
      >
        <h2 className="text-2xl font-bold mb-4">Food Section</h2>
        {/* Add your food items here */}
      </div>
    </>
  );
}
