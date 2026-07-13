import { useNavigate, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { selectWorkspaceList } from '../../store/slices/workspaceSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { openModal } from '../../store/slices/uiSlice'

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
      className="flex flex-col items-center gap-3 py-4 w-16 glass-card backdrop-saturate-100 ml-2 mt-2 mb-2 mr-0"
      style={{ background: 'var(--color-dark-navy)' }}
    >
      {workspaces.map((ws) => {
        const isActive = ws.id === activeId
        const initial = ws.name.charAt(0).toUpperCase()

        return (
          <motion.button
            key={ws.id}
            onClick={() => handleSwitch(ws.id)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 44,
              height: 44,
              borderRadius: isActive ? '14px' : '50%',   // squircle when active — Discord-style
              background: isActive
                ? 'linear-gradient(135deg, var(--color-primary), var(--color-cyan))'
                : 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 700,
              fontSize: 16,
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
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
                style={{
                  position: 'absolute',
                  left: -12,
                  width: 4,
                  height: 24,
                  borderRadius: 4,
                  background: '#fff',
                }}
              />
            )}
          </motion.button>
        )
      })}

      {/* Add workspace button */}
      <motion.button
        onClick={() => {
          dispatch(openModal('CREATE_WORKSPACE_MODAL'))
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          border: '2px dashed rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 20,
          cursor: 'pointer',
        }}
        title="Create workspace"
      >
        +
      </motion.button>
    </aside>
  )
}