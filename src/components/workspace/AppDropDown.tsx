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
            <div className="flex items-center justify-between gap-2 mb-2 p-3">
                <div className="flex items-center gap-2">
                    <Cheveron />
                    <h4 className="uppercase">Channels</h4>
                </div>
                <PlusIcon />
            </div>
            {
                channels.map((channel) => (
                    <div key={channel.id} className="flex items-center gap-2 pl-6 py-1.5 bg-border-color my-2 border-l-2 border-l-cyan-pop">
                        <HashTagIcon/>
                        <p>{channel.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default AppDropDown