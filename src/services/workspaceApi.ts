import api from './api'

export const workspaceAPI = {
  getAll: async () => {
    const res = await api.get('/workspaces')
    return res.data
  },

  getOne: async (workspaceId: string) => {
    const res = await api.get(`/workspaces/${workspaceId}`)
    return res.data
  },

  create: async (name: string) => {
    const res = await api.post('/workspaces', { name })
    return res.data
  },

  update: async (workspaceId: string, data: { name?: string; logoUrl?: string }) => {
    const res = await api.patch(`/workspaces/${workspaceId}`, data)
    return res.data
  },

  remove: async (workspaceId: string) => {
    const res = await api.delete(`/workspaces/${workspaceId}`)
    return res.data
  },

  invite: async (workspaceId: string, email: string, role: string = 'member') => {
    const res = await api.post(`/workspaces/${workspaceId}/invites`, { email, role })
    return res.data
  },

  acceptInvite: async (token: string) => {
    const res = await api.post('/workspaces/invites/accept', { token })
    return res.data
  },

  getMembers: async (workspaceId: string) => {
    const res = await api.get(`/workspaces/${workspaceId}/members`)
    return res.data
  },

  updateMemberRole: async (workspaceId: string, userId: string, role: string) => {
    const res = await api.patch(`/workspaces/${workspaceId}/members/${userId}`, { role })
    return res.data
  },

  removeMember: async (workspaceId: string, userId: string) => {
    const res = await api.delete(`/workspaces/${workspaceId}/members/${userId}`)
    return res.data
  },
}