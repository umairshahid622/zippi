import { smallIconSize } from "../../constants/constants";
import type { IconProps } from "../../types/interface";

const Cheveron = ({ size = smallIconSize, color = "var(--color-bubble)" }: IconProps) => {
    return (
        <svg
            width={size} height={size}
            fill={color} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"></path>
            </g>
        </svg>
    );
};

export default Cheveron;
