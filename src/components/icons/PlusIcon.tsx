import { smallIconSize } from "../../constants/constants";
import type { IconProps } from "../../types/interface";

const PlusIcon = ({ size = smallIconSize, color = "var(--color-bubble)" }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                    d="M4 12H20M12 4V20"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>{" "}
            </g>
        </svg>
    );
};

export default PlusIcon;
