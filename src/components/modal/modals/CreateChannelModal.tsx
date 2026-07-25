import { useCallback, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { closeModal, setActiveModalHeading } from "../../../store/slices/uiSlice"
import { AppInput } from "../../shared/AppInput"
import ArrowExpandButton from "../../shared/ArrowExpandButton"
import { ArrowLeft, HashTagIcon, LockIcon } from "../../icon"
import { motion } from "motion/react"
import { switchVariants } from "../../../lib/variants"
import type { InputStatus } from "../../../types/types"
import { createChannel, removeCreatingChannelError, selectCreateChannelError, selectCreateChanneLoading } from "../../../store/slices/channelSlice"
import { selectActiveWorkspaceId } from "../../../store/slices/workspaceSlice"
import { isValidChannelName, normalizeChannelName } from "../../../lib/validations"


const CANCEL_ICON = <ArrowLeft className="size-4" />
const HASH_ICON = <HashTagIcon />

const CreateChannelModal = () => {


  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [inputStatus, setInputStatus] = useState<InputStatus>('idle')
  const [inputMessage, setInputMessage] = useState<string>('')
  const createChannelLoading = useAppSelector(selectCreateChanneLoading)
  const error = useAppSelector(selectCreateChannelError)
  const workSpaceId = useAppSelector(selectActiveWorkspaceId)
  const [normalizeName, setNormalizeName] = useState<string>('')
  const channelNameRef = useRef<HTMLInputElement>(null)
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

    if (workSpaceId === null) {
      setInputStatus("error")
      setInputMessage("No workspace selected")
      return
    }

    const data = new FormData(event.target)
    const channelName = (data.get("channelInput") as string)?.trim() ?? ''
    const description = (data.get("descriptionInput") as string)?.trim() ?? ''

    if (!channelName) {
      setInputStatus("error")
      setInputMessage("Channel name is required")
      return
    }


    if (!isValidChannelName(normalizeName)) {
      setInputStatus('error')
      setInputMessage('Channel name can only contain letters, numbers, and dashes')
      return
    }

    dispatch(removeCreatingChannelError())
    setInputStatus("focus")
    setInputMessage("")

    const result = await dispatch(
      createChannel({
        name: normalizeName,
        description,
        workspaceId: workSpaceId,
        isPrivate,
      }),
    )

    if (createChannel.fulfilled.match(result)) {
      dispatch(closeModal())
      return
    }
  }

  const handleCloseModal = useCallback(() => {
    dispatch(removeCreatingChannelError())
    dispatch(closeModal())
  }, [])

  const handleNameChange = useCallback(

    (event: React.ChangeEvent<HTMLInputElement>) => {
      const normalizedName = normalizeChannelName(event.target.value)
      setNormalizeName(normalizedName)
      if (inputStatus === "error") {
        setInputStatus('idle')
        setInputMessage('')
      }

    }, [])



  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <AppInput ref={channelNameRef} value={normalizeName} name="channelInput" label="Channel Name" placeholder="New-Channel" icon={HASH_ICON} message={inputMessage} onChange={handleNameChange} />

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
        <ArrowExpandButton onCallBack={handleCloseModal} label={"Cancel"} iconDirection="left" color="btn-secondary" icon={CANCEL_ICON} />
        <ArrowExpandButton label={"Create Channel"} iconDirection="right" isLoading={createChannelLoading} type="submit" />
      </div>
    </form>
  )
}
CreateChannelModal.displayName = "Create Channel Modal"
export default CreateChannelModal