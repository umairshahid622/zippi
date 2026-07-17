import { LayoutGroup, motion } from "motion/react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { AppInput } from "../shared/AppInput"
import AppLogo from "../shared/AppLogo"
import { SearchIcon } from "../icon"
import GearIcon from "../icon/Icons/GearIcon"
import AppDropDown from "./AppDropDown"
import NotificationToggle from "./NotificationToggle"
import ProfileAvatar from "./ProfileAvatar"
import type { WorkspaceListItem } from "../../types/interface"
import { selectActiveChannelId, selectActiveWorkspace, selectWorkspaceList } from "../../store/slices/workspaceSlice"
import { selectChannelsForWorkspace } from "../../store/slices/channelSlice"
import { useParams } from "react-router"
import { useCallback, useMemo } from "react"
import { openModal } from "../../store/slices/uiSlice"

const SideBar = () => {
    const workspaceList: WorkspaceListItem[] = useAppSelector(selectWorkspaceList)

    workspaceList.map((wsl) => {
        console.log(wsl);

    })
    return (
        <aside className="w-64 h-screen box-border p-0 flex">
            <div className="flex flex-col grow ml-2 my-2 min-h-0 glass-card backdrop-saturate-100">
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
    const { workspaceId } = useParams()
    const activeWorkspace = useAppSelector(selectActiveWorkspace)
    const allChannels = useAppSelector(selectChannelsForWorkspace(workspaceId ?? null))
    const activeChannel = useAppSelector(selectActiveChannelId)
    const dispatch = useAppDispatch()

    const channels = useMemo(
        () => allChannels.filter((c) => !c.isDm),
        [allChannels]
    )
    const directMessages = useMemo(
        () => allChannels.filter((c) => c.isDm),
        [allChannels]
    )

    const onAddCallBack = useCallback(() => {
        dispatch(openModal("CREATE_CHANNEL_MODAL"))
    }, [dispatch])


    return (
        <LayoutGroup>
            <AppDropDown title={"channels"} content={channels} selectedChannel={activeChannel ?? undefined} workspaceId={activeWorkspace?.id} onAddCallback={onAddCallBack} />
            <AppDropDown title={"direct messages"} content={directMessages} selectedChannel={activeChannel ?? undefined} workspaceId={activeWorkspace?.id} />
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
            <button
                title="settings"
                className="border-none">
                <GearIcon className="cursor-pointer" />
            </button>
        </section>
    )
}
SideBar.displayName = 'SideBar'

export default SideBar;