import { defaultIconSize } from "../../constants/constants";
import type { IconProps } from "../interface";

const TickIcon = ({
  color = "var(--color-success)",
  size = defaultIconSize,
}: IconProps) => {
  return (
    <svg height={size} width={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default TickIcon;
