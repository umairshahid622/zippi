import type { IconProps } from "../../types/interface";


const ArrowRight = ({size = 14, color = 'var(--color-bubble)'}:IconProps) => {
  return (
    <svg height={size} width={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default ArrowRight;
