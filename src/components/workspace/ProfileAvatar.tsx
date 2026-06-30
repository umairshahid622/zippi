import { cn, getAvatarDetails } from "../../utils/functions";

interface ProfileAvatarProps {
  fullName?: string | null;
  profilePictureUrl?: string | null;
}

const ProfileAvatar = ({ fullName, profilePictureUrl }: ProfileAvatarProps) => {
  const avatarDetails = getAvatarDetails(fullName ?? "");

  if (fullName === null && profilePictureUrl === null) {
    return (
      <div className="size-9 rounded-full overflow-hidden flex items-center justify-center bg-blue-gradient shadow-blue-glow">
        <p className="font-bold">??</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'size-10 rounded-full overflow-hidden',
        profilePictureUrl ? '' : `${avatarDetails.backgroundColor} flex items-center justify-center`
      )}
    >
      {profilePictureUrl ? (
        <img src={profilePictureUrl} alt="" />
      ) : (
        <p className="font-bold">{avatarDetails.initials}</p>
      )}
    </div>
  );
};

export default ProfileAvatar;
