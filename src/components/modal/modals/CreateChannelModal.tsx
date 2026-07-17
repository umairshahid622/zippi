import { useEffect } from "react"
import { useAppDispatch } from "../../../hooks/hooks"
import { setActiveModalHeading } from "../../../store/slices/uiSlice"
import { AppInput } from "../../shared/AppInput"
import ArrowExpandButton from "../../shared/ArrowExpandButton"
import { HashTagIcon } from "../../icon"

const CreateChannelModal = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      setActiveModalHeading(
        `Create Channel`
      )
    )
  }, [dispatch])
  return (
    <div className="space-y-4">
      <AppInput name="channelInput" label="Channel Name" placeholder="New-Channel" icon={<HashTagIcon/>}/>
      <div className="flex gap-4">
        <ArrowExpandButton label={"Cancel"} iconDirection="left" color="btn-secondary"/>
        <ArrowExpandButton label={"Create Channel"} iconDirection="right"/>
      </div>
    </div>
  )
}
CreateChannelModal.displayName = "Create Channel Modal"
export default CreateChannelModal