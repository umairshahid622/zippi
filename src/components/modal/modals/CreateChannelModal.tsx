import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { closeModal, setActiveModalHeading } from "../../../store/slices/uiSlice"
import { AppInput } from "../../shared/AppInput"
import ArrowExpandButton from "../../shared/ArrowExpandButton"
import { HashTagIcon } from "../../icon"
import ArrowLeft from "../../icon/Icons/ArrowLeft"
import LockIcon from "../../icon/Icons/LockIcon"
import { motion } from "motion/react"
import { switchVariants } from "../../../lib/variants"
import type { InputStatus } from "../../../types/types"
import { createChannel, selectCreateChannelError, selectCreateChanneLoading } from "../../../store/slices/channelSlice"
import { selectActiveWorkspaceId } from "../../../store/slices/workspaceSlice"

const CreateChannelModal = () => {


  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [inputStatus, setInputStatus] = useState<InputStatus>('idle')
  const [inputMessage, setInputMessage] = useState<string>('')
  const createChannelLoading = useAppSelector(selectCreateChanneLoading)
  const error = useAppSelector(selectCreateChannelError)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      setActiveModalHeading(
        `Create Channel`
      )
    )
  }, [dispatch])


  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const workSpaceId: string | null = useAppSelector(selectActiveWorkspaceId)
    if (workSpaceId === null) {
      return;
    }

    const data = new FormData(event.target);
    const channelName = (data.get("channelInput") as string)?.trim() ?? ''
    const discription = (data.get("descriptionInput") as string)?.trim() ?? ''
    if (!!channelName) {
      setInputStatus("error")
      setInputMessage('Must be at least 1 characters')
    }

    setInputStatus('focus')
    console.log(channelName, discription);

    const result = dispatch(createChannel({ name: channelName, description: discription, workspaceId: workSpaceId, isPrivate: isPrivate }))
    if (createChannel.fulfilled.match(result)) {
      dispatch(closeModal())
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <AppInput name="channelInput" label="Channel Name" placeholder="New-Channel" icon={<HashTagIcon />} message={inputMessage} onChange={() => {
        if (inputStatus === "error") {
          setInputStatus('idle')
          setInputMessage('')
        }
      }} />

      <AppInput name="descriptionInput" label="Channel Description" placeholder="Company wide announcements and conversations" />
      <motion.div
        onClick={() => setIsPrivate((prev) => !prev)}
        variants={switchVariants}
        initial="rest"
        animate={isPrivate ? "isEnabled" : "rest"}
        whileHover={!isPrivate ? "onHover" : undefined}
        className="rounded-(--border-radius) app-border p-3 cursor-pointer">
        <div className="flex gap-2 items-center">
          <LockIcon />
          <h3>Private Channel</h3>
        </div>
        <p>Only selected members will be able to view this channel.</p>
      </motion.div>
      {error && <span className="text-error text-sm block">{error}</span>}
      <div className="flex gap-2">
        <ArrowExpandButton label={"Cancel"} iconDirection="left" color="btn-secondary" icon={<ArrowLeft className="size-4" />} />
        <ArrowExpandButton label={"Create Channel"} iconDirection="right" isLoading={createChannelLoading} type="submit" />
      </div>
    </form>
  )
}
CreateChannelModal.displayName = "Create Channel Modal"
export default CreateChannelModal