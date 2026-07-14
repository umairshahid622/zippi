import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { closeModal, setActiveModalHeading } from "../../../store/slices/uiSlice"
import { selectHasNoWorkspaces, selectWorkspaceError } from "../../../store/slices/workspaceSlice"
import { AppInput } from "../../shared/AppInput"
import AppTextButton from "../../shared/AppTextButton"
import ArrowExpandButton from "../../shared/ArrowExpandButton"

const CreateWorkspaceModal = () => {
  const hasNoWorkspace = useAppSelector(selectHasNoWorkspaces)
  const error = useAppSelector(selectWorkspaceError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      setActiveModalHeading(
        `Create ${hasNoWorkspace ? "Your first" : "Another"} workspace`
      )
    )
  }, [dispatch, hasNoWorkspace])

  const handleCreateWorkspace = () =>{
    
  }

  return (
    <>
      <div className="space-y-6">
        <AppInput placeholder="eg. dev-team" label="Workspace Name" />
        {error && <span className="text-error">{error}</span>}
        <div className="space-y-3">
          <ArrowExpandButton label={"Create Workspace"} type="submit" />
          <div className="flex justify-center">
            <AppTextButton label={"Cancel"} iconDirection="left" type="reset" onCallBack={() => dispatch(closeModal())} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateWorkspaceModal