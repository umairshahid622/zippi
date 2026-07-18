import type { IconProps } from "../../../types/interface";
import { cn } from "../../../utils/functions";

const ArrowLeft = ({ className, strokeWidth = 3}: IconProps) => {
    return (
        <svg
            className={
                cn("fill-current size-4", className)
            }
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                    d="M6 12H18M6 12L11 7M6 12L11 17"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>{" "}
            </g>
        </svg>
    );
};

export default ArrowLeft;
