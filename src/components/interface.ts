import type { JSX } from "react/jsx-runtime";
import type { ButtonType, LoaderSize, LoaderVariant } from "../types/types";

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  icon?: React.ReactNode;
  message?: string;
  status?: "idle" | "focus" | "error" | "success";
  maxLength?: number;
  iconSize?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  color?: string;
  label?: string;
  className?: string;
}

interface ButtonProps {
  label: string;
  type?: ButtonType;
  isLoading?: boolean;
  isDisabled?: boolean;
  onCallBack?: () => void;
}

export interface AppButtonProps extends ButtonProps {
  icon?: JSX.Element;
}

export interface AppArrowExpandButtonProps extends ButtonProps {}
