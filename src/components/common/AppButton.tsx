import { motion } from "motion/react";
import { buttonGhostVariants } from "../../lib/variants";
import { useState, type JSX } from "react";

interface AppButtonProps {
    label: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    icon?: JSX.Element;

    onCallBack?: () => void;
}



function AppButton({ label, className, type, icon, onCallBack }: AppButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
        
    const handleClick = () =>{
        setIsLoading(true);
        onCallBack();
    }

    return <motion.button
        type={type}
        className='flex gap-2 items-center justify-center w-full'
        onClick={onCallBack}
        variants={buttonGhostVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
    >
        {icon && icon}
        {label}
    </motion.button>

}

export default AppButton