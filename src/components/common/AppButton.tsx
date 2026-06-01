import { motion } from "motion/react";
import { buttonGhostVariants } from "../../lib/variants";
import { useState, type JSX } from "react";

interface AppButtonProps {
    lable: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    icon?: JSX.Element;

    onCallBack?: () => void;
}



function AppButton({ lable, className, type, icon, onCallBack }: AppButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
        
    const handleClick = () =>{
        setIsLoading(true);
        onCallBack();
    }

    return <motion.button
        type={type}
        className={className}
        onClick={onCallBack}
        variants={buttonGhostVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
    >
        {icon}
        {lable}
    </motion.button>

}

export default AppButton