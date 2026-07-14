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
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  icon?: React.ReactNode;
  message?: string;
  status?: InputStatus;
  maxLength?: number;
  iconSize?: number;
  disabled?: boolean;
  className?: String;
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

export interface MagicLinkResponse {
  message: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface VerifyOTPResponse {
  token: string;
  refreshToken: string;
  isNewUser: boolean;
  user: User;
}

export interface UpdateProfileResponse {
  user: User;
}

export interface Credentials {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AppDropDownProps {
  title?: string;
  content?: AppDropDownContent[];
  selectedChannel?: AppDropDownContent;
  onSelectChannel?: (channel: AppDropDownContent) => void;
}

export interface AppDropDownContent {
  id: number;
  name: string;
}

export interface WorkspaceListItem {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  role: "owner" | "admin" | "member" | "guest";
  memberCount: number;
  channelCount: number;
}

interface Member {
  id: string;
  fullName: string | null;
  avatarUrl: string | null;
  handle: string | null;
  isOnline: boolean;
}

export interface Channel {
  id: string;
  name: string | null;
  description: string | null;
  isPrivate: boolean;
  isDm: boolean;
  isArchived: boolean;
}
export interface WorkspaceDetail {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  members: Array<{ role: string; user: Member }>;
  channels: Channel[];
}
