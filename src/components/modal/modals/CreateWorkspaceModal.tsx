import { useAppSelector } from "../../../hooks/hooks"
import { selectWorkspaceList } from "../../../store/slices/workspaceSlice"

const CreateWorkspaceModal = () => {
  const worspacelist = useAppSelector(selectWorkspaceList)
  return (
    <>
        <h2>{`Create ${worspacelist.length > 0 ? 'Another' : 'Your first'} workspace`}</h2>
    </>
  )
}

export default CreateWorkspaceModal