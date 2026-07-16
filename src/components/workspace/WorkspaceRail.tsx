import { useNavigate, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { selectWorkspaceList } from '../../store/slices/workspaceSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { openModal } from '../../store/slices/uiSlice'
import { cn } from '../../utils/functions'

export default function WorkspaceRail() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { workspaceId: activeId } = useParams()
  const workspaces = useAppSelector(selectWorkspaceList)

  const handleSwitch = (id: string) => {
    if (id === activeId) return
    navigate(`/workspace/${id}`)
  }

  return (
    <aside
      className="flex flex-col items-center gap-3 py-4 w-16 glass-card backdrop-saturate-100 ml-2 my-2 mr-0"
      style={{ background: 'var(--color-dark-navy)' }}
    >
      {/* Add workspace button */}
      <motion.button
        onClick={() => {
          dispatch(openModal('CREATE_WORKSPACE_MODAL'))
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className='size-11 rounded-full bg-white/5 border-dashed border-white/20 flex items-center justify-center text-white/50 text-[1.25rem] cursor-pointer'
        title="Create workspace"
      >
        +
      </motion.button>
      {workspaces.map((ws) => {
        const isActive = ws.id === activeId
        const initial = ws.name.charAt(0).toUpperCase()

        return (
          <motion.button
            key={ws.id}
            onClick={() => handleSwitch(ws.id)}
            whileHover={{ scale: !isActive ? 1.08 : 1.0 }}
            whileTap={{ scale: !isActive ? 0.95 : 1.0 }}
            animate={{ borderRadius: isActive? 16: 100 }}
            className={
              cn(
                "size-11 flex items-center justify-center font-bold text-white relative border-none",
                isActive ? 'bg-linear-to-br from-deep-blue to-black-pearl' : "bg-white/10",
              )
            }
            style={{
              transition: 'border-radius 0.2s ease',
            }}
            title={ws.name}
          >
            {ws.logoUrl ? (
              <img
                src={ws.logoUrl}
                alt={ws.name}
                style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }}
              />
            ) : (
              initial
            )}

            {/* Active indicator — little pill on the left edge */}
            {isActive && (
              <motion.div
                layoutId="active-workspace-indicator"
                className='absolute left-[-0.54rem] w-[0.15rem] h-7 rounded-r-2xl bg-white/50'
              />
            )}
          </motion.button>
        )
      })}
    </aside>
  )
}