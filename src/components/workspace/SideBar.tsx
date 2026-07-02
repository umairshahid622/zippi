import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { logout, selectAuthLoading } from "../../store/slices/authSlice"
import AppButton from "../common/AppButton"
import { AppInput } from "../common/AppInput"
import AppLogo from "../common/AppLogo"
import { SearchIcon } from "../icons"
import GearIcon from "../icons/GearIcon"
import AppDropDown from "./AppDropDown"
import NotificationToggle from "./NotificationToggle"
import ProfileAvatar from "./ProfileAvatar"

const SideBar = () => {

    return (
        <aside className="w-64 m-2 p-0 flex flex-col">
            <div className="flex flex-col flex-1 glass-card backdrop-saturate-100">
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
        <div className="flex-1 space-y-3">
            <div className="p-3 space-y-3">
                <AppInput placeholder="Search Channels" className='py-2' icon={<SearchIcon />} />
                <NotificationToggle />
            </div>
            <AppDropDown />
            {/* <AppButton label={"Logout"} onCallBack={logOut} isLoading={isLoading} isDisabled={isLoading} /> */}
        </div>
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