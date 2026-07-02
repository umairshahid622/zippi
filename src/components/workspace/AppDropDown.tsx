import { cn } from "../../utils/functions"
import { Cheveron, PlusIcon } from "../icons"
import HashTagIcon from "../icons/HashTagIcon"

const AppDropDown = () => {
    // dummy data for channels,
    const channels = [
        { id: 1, name: "general" },
        { id: 2, name: "random" },
        { id: 3, name: "development" },
        { id: 4, name: "design" },
    ]
    return (
        <div>
            <div className="flex items-center justify-between gap-2 p-3">
                <div className="flex items-center gap-2">
                    <Cheveron />
                    <h4 className="uppercase">Channels</h4>
                </div>
                <PlusIcon />
            </div>
            {
                channels.map((channel) => (
                    <div key={channel.id} className={cn(
                        "relative overflow-hidden flex items-center gap-2 pl-6 py-1.5 my-1 group",
                        'bg-white/10 border-l-2 border-l-cyan-pop'
                    )}>
                        <span className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-cyan-pop/60 blur-sm" />
                        <HashTagIcon className="text-white group-hover:text-cyan-pop!"/>
                        <p>{channel.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default AppDropDown