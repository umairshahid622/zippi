import type { IconProps } from "../../../types/interface";
import { cn } from "../../../utils/functions";


const ArrowRight = ({ className, strokeWidth = 3 }: IconProps) => {
  return (
    <svg className={
      cn(
        "fill-current size-4",
        className
      )
    } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="5"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M5 12H19M19 12L13 6M19 12L13 18"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default ArrowRight;
