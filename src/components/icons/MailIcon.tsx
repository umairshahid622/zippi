import { defaultIconSize } from "../../constants/constants";
import type { IconProps } from "../interface";

function MailIcon({
  className,
  color = "currentColor",
  size = defaultIconSize,
}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></rect>{" "}
      </g>
    </svg>
  );
}

export default MailIcon;
