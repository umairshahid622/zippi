import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { closeModal, setActiveModalHeading } from "../../../store/slices/uiSlice"
import { createWorkspace, selectHasNoWorkspaces, selectIsSubmitting, selectWorkspaceError } from "../../../store/slices/workspaceSlice"
import { AppInput } from "../../shared/AppInput"
import AppTextButton from "../../shared/AppTextButton"
import ArrowExpandButton from "../../shared/ArrowExpandButton"
import type { InputStatus } from "../../../types/types"

const CreateWorkspaceModal = () => {
  const hasNoWorkspace = useAppSelector(selectHasNoWorkspaces)
  const isSubmitting = useAppSelector(selectIsSubmitting)
  const error = useAppSelector(selectWorkspaceError)
  const dispatch = useAppDispatch()
  const [inputStatus, setInputStatus] = useState<InputStatus>('idle')
  const [inputMessage, setInputMessage] = useState<string>('')

  useEffect(() => {
    dispatch(
      setActiveModalHeading(
        `Create ${hasNoWorkspace ? "Your first" : "Another"} workspace`
      )
    )
  }, [dispatch, hasNoWorkspace])

  const handleCreateWorkspace = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const workspaceName = (data.get('workspaceName') as string)?.trim() ?? ''
    if (!workspaceName) {
      setInputStatus('error')
      setInputMessage('Workspace name is required')
      return
    }
    if (workspaceName.length < 2) {
      setInputStatus('error')
      setInputMessage('Must be at least 2 characters')
      return
    }
    setInputStatus('focus')
    const result = await dispatch(createWorkspace(workspaceName))

    if (createWorkspace.fulfilled.match(result)) {
      dispatch(closeModal())
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleCreateWorkspace}>
      <AppInput
        name="workspaceName"
        placeholder="Eg. UI/UX workspace"
        label="Workspace Name"
        message={inputMessage}
        status={inputStatus}
        onChange={() => {
          if (inputStatus === 'error') {
            setInputStatus('idle')
            setInputMessage('')
          }
        }}
      />
      {error && <span className="text-error">{error}</span>}
      <div className="space-y-3">
        <ArrowExpandButton label={"Create Workspace"} type="submit" isLoading={isSubmitting} />
        <div className="flex justify-center">
          <AppTextButton label={"Cancel"} iconDirection="left" type="reset" onCallBack={() => dispatch(closeModal())} />
        </div>
      </div>
    </form>
  )
}

export default CreateWorkspaceModal