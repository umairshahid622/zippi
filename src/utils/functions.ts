import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Channel, ChannelDisplayInfo } from "../types/interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getFullNameInitials(fullName: string): string {
  const parts = fullName.split(" ");
  const initials = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];

  return initials;
}

function getAvatarBgColor(fullName: string): string {
  const colors = [
    "bg-blue-gradient shadow-blue-glow",
    "bg-[var(--color-purple-primary)]",
    "bg-[var(--color-deep-blue)]",
    "bg-[var(--color-dark-navy)]",
    "bg-[var(--color-black-pearl)]",
  ];
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export function getAvatarDetails(fullName: string) {
  const initials = getFullNameInitials(fullName);
  const backGroundColor = getAvatarBgColor(fullName);

  return {
    initials: initials,
    backgroundColor: backGroundColor,
  };
}

export const getChannelDisplayInfo = (
  channel: Channel,
  currentUserId: string,
): ChannelDisplayInfo => {
  if (channel.isDm) {
    // Find the OTHER person — not myself
    const otherMember = channel.members.find((m) => m.userId !== currentUserId);

    const name =
      otherMember?.user.fullName ?? otherMember?.user.handle ?? "Unknown user";

    return {
      displayName: name,
      isDm: true,
      avatarUrl: otherMember?.user.avatarUrl ?? null,
      initial: name.charAt(0).toUpperCase(),
      isOnline: otherMember?.user.isOnline ?? false,
      icon: "dm",
    };
  }

  // Regular channel
  return {
    displayName: channel.name ?? "unnamed-channel",
    isDm: false,
    avatarUrl: null,
    initial: "",
    isOnline: false,
    icon: channel.isPrivate ? "lock" : "hash",
  };
};
