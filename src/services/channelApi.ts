// src/services/channelApi.ts
import api from './api'

export const channelAPI = {
  getAll: async (workspaceId: string) => {
    const res = await api.get(`/workspaces/${workspaceId}/channels`)
    return res.data
  },

  getPublic: async (workspaceId: string) => {
    const res = await api.get(`/workspaces/${workspaceId}/channels/public`)
    return res.data
  },

  getOne: async (workspaceId: string, channelId: string) => {
    const res = await api.get(`/workspaces/${workspaceId}/channels/${channelId}`)
    return res.data
  },

  create: async (workspaceId: string, data: { name: string; description?: string; isPrivate?: boolean }) => {
    console.log(data);
    
    const res = await api.post(`/workspaces/${workspaceId}/channels`, data)
    return res.data
  },

  update: async (workspaceId: string, channelId: string, data: { name?: string; description?: string }) => {
    const res = await api.patch(`/workspaces/${workspaceId}/channels/${channelId}`, data)
    return res.data
  },

  archive: async (workspaceId: string, channelId: string) => {
    const res = await api.delete(`/workspaces/${workspaceId}/channels/${channelId}`)
    return res.data
  },

  join: async (workspaceId: string, channelId: string) => {
    const res = await api.post(`/workspaces/${workspaceId}/channels/${channelId}/join`)
    return res.data
  },

  leave: async (workspaceId: string, channelId: string) => {
    const res = await api.post(`/workspaces/${workspaceId}/channels/${channelId}/leave`)
    return res.data
  },

  addMember: async (workspaceId: string, channelId: string, userId: string) => {
    const res = await api.post(`/workspaces/${workspaceId}/channels/${channelId}/members`, { userId })
    return res.data
  },

  removeMember: async (workspaceId: string, channelId: string, userId: string) => {
    const res = await api.delete(`/workspaces/${workspaceId}/channels/${channelId}/members/${userId}`)
    return res.data
  },

  createDm: async (workspaceId: string, targetUserId: string) => {
    const res = await api.post(`/workspaces/${workspaceId}/channels/dm`, { targetUserId })
    return res.data
  },

  markAsRead: async (workspaceId: string, channelId: string) => {
    const res = await api.post(`/workspaces/${workspaceId}/channels/${channelId}/read`)
    return res.data
  },
}