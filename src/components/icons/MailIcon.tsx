import { defaultIconSize } from "../../constants/constants";
import type { IconProps } from "./interface";

function MailIcon({
  className,
  color = "currentColor",
  size = defaultIconSize,
}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
        ></rect>{" "}
      </g>
    </svg>
  );
}

export default MailIcon;
