import { useEffect, useState } from "react"
import { useAppDispatch } from "../../../hooks/hooks"
import { setActiveModalHeading } from "../../../store/slices/uiSlice"
import { AppInput } from "../../shared/AppInput"
import ArrowExpandButton from "../../shared/ArrowExpandButton"
import { HashTagIcon } from "../../icon"
import ArrowLeft from "../../icon/Icons/ArrowLeft"
import LockIcon from "../../icon/Icons/LockIcon"
import { motion, type Variants } from "motion/react"
import { switchVariants } from "../../../lib/variants"

const CreateChannelModal = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      setActiveModalHeading(
        `Create Channel`
      )
    )
  }, [dispatch])

  

  const [isPrivate, setIsPrivate] = useState<boolean>(false);


  return (
    <div className="space-y-4">
      <AppInput name="channelInput" label="Channel Name" placeholder="New-Channel" icon={<HashTagIcon />} />
      <motion.div
        onClick={() => setIsPrivate((prev) => !prev)}
        variants={switchVariants}
        initial="rest"
        animate = {isPrivate && "isEnabled"}
        whileHover = {!isPrivate ? "onHover" : ""}
        className="rounded-(--border-radius) app-border p-3 cursor-pointer">
        <div className="flex gap-2 items-center">
          <LockIcon />
          <h2>Private Channel</h2>
        </div>
        <p>Only selected members will be able to view this channel.</p>
      </motion.div>
      <div className="flex gap-4">
        <ArrowExpandButton label={"Cancel"} iconDirection="left" color="btn-secondary" icon={<ArrowLeft className="size-4" />} />
        <ArrowExpandButton label={"Create Channel"} iconDirection="right" />
      </div>
    </div>
  )
}
CreateChannelModal.displayName = "Create Channel Modal"
export default CreateChannelModal