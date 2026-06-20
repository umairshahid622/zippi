import type { JSX } from "react/jsx-runtime";
import type {
  AuthLoadingProvider,
  ButtonType,
  InputStatus,
  LoaderSize,
  LoaderVariant,
} from "../types/types";

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
  status?: InputStatus;
  maxLength?: number;
  iconSize?: number;
  disabled?: boolean;
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

export interface TextButtonProps extends ButtonProps {
  iconDirection?: "left" | "right";
}

export interface Star {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export interface FloatingItem {
  id: number;
  icon: React.ReactNode;
  position: React.CSSProperties;
  duration: number;
  delay: number;
}

export interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  status?: Omit<InputStatus, "focus">;
  disable?: boolean;
  onSuccessAnimationComplete?: () => void;
}



export interface OTPContentProps {
  emailRef: React.RefObject<HTMLInputElement>;
  handleResendingTimer: () => [number | null, boolean];
  onSuccessAnimationComplete: () => void;
}

export interface OAuthContentProps {
  isLoading: boolean;
  loadingProvider: AuthLoadingProvider;
}

export interface MagicLinkContentProps {
  emailRef: React.RefObject<HTMLInputElement>;
  handleResendingTimer: () => [number | null, boolean];
  isOtpScreen: boolean;
  isLoading: boolean;
  loadingProvider: AuthLoadingProvider;
}
