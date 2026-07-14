import { LayoutGroup, motion } from "motion/react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { logout, selectAuthLoading } from "../../store/slices/authSlice"
import AppButton from "../shared/AppButton"
import { AppInput } from "../shared/AppInput"
import AppLogo from "../shared/AppLogo"
import { SearchIcon } from "../icon"
import GearIcon from "../icon/Icons/GearIcon"
import AppDropDown from "./AppDropDown"
import NotificationToggle from "./NotificationToggle"
import ProfileAvatar from "./ProfileAvatar"
import React from "react"
import type { AppDropDownContent } from "../../types/interface"

const SideBar = () => {
    console.log("Side bar Rendered");

    return (
        <aside className="w-64 h-screen box-border p-0 flex">
            <div className="flex flex-col grow m-2 min-h-0 glass-card backdrop-saturate-100">
                <SideBarHeader />
                <div className="app-divider"></div>
                <SideBarContent />
                <div className="app-divider"></div>
                <ProfileSection />
            </div>

        </aside>
    )
}



function SideBarHeader() {
    return (
        <div className="p-3">
            <AppLogo />
        </div>
    )
}

function SideBarContent() {
    const isLoading = useAppSelector(selectAuthLoading)
    const dispatch = useAppDispatch()
    const logOut = async () => {
        await dispatch(logout());
    }
    return (
        <div className="flex relative grow overflow-hidden ">
            <motion.div layoutScroll className="grow overflow-y-auto scrollbar-none scroll-smooth space-y-3">
                <div className="space-y-3 p-3">
                    <AppInput placeholder="Search Channels" className='py-2' icon={<SearchIcon />} />
                    <NotificationToggle />
                </div>
                <SideBarChats />
            </motion.div>
        </div>
    )
}

const SideBarChats = () => {
    const channels: any = [];

    const directMessages: any = [];
    const [activeId, setActiveId] = React.useState<AppDropDownContent | null>(null);
    return (
        <LayoutGroup>
            <AppDropDown title={"channels"} content={channels} selectedChannel={activeId ?? undefined} onSelectChannel={setActiveId} />
            <AppDropDown title={"direct messages"} content={directMessages} selectedChannel={activeId ?? undefined} onSelectChannel={setActiveId} />
        </LayoutGroup>
    )
}


function ProfileSection() {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <section className="p-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <ProfileAvatar fullName={user?.fullName} profilePictureUrl={user?.avatarUrl} />
                <p>
                    {user?.fullName}
                </p>
            </div>
            <GearIcon className="cursor-pointer" />
        </section>
    )
}

export default SideBar;