// src/services/messageApi.ts
import api from "./api";

export const messageAPI = {
  getAll: async (
    workspaceId: string,
    channelId: string,
    params?: { before?: string; limit?: number },
  ) => {
    const res = await api.get(
      `/workspaces/${workspaceId}/channels/${channelId}/messages`,
      { params },
    );
    return res.data;
  },

  getThreadReplies: async (
    workspaceId: string,
    channelId: string,
    messageId: string,
  ) => {
    const res = await api.get(
      `/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}/replies`,
    );
    return res.data;
  },

  send: async (
    workspaceId: string,
    channelId: string,
    data: { content?: string; parentId?: string; fileIds?: string[] },
  ) => {
    const res = await api.post(
      `/workspaces/${workspaceId}/channels/${channelId}/messages`,
      data,
    );
    return res.data;
  },

  edit: async (
    workspaceId: string,
    channelId: string,
    messageId: string,
    content: string,
  ) => {
    const res = await api.patch(
      `/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}`,
      { content },
    );
    return res.data;
  },

  remove: async (workspaceId: string, channelId: string, messageId: string) => {
    const res = await api.delete(
      `/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}`,
    );
    return res.data;
  },

  togglePin: async (
    workspaceId: string,
    channelId: string,
    messageId: string,
  ) => {
    const res = await api.post(
      `/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}/pin`,
    );
    return res.data;
  },

  getPinned: async (workspaceId: string, channelId: string) => {
    const res = await api.get(
      `/workspaces/${workspaceId}/channels/${channelId}/messages/pinned`,
    );
    return res.data;
  },

  toggleDecision: async (
    workspaceId: string,
    channelId: string,
    messageId: string,
  ) => {
    const res = await api.post(
      `/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}/decision`,
    );
    return res.data;
  },

  getDecisions: async (workspaceId: string) => {
    const res = await api.get(`/workspaces/${workspaceId}/decisions`);
    return res.data;
  },

  addReaction: async (
    workspaceId: string,
    channelId: string,
    messageId: string,
    emoji: string,
  ) => {
    const res = await api.post(
      `/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}/reactions`,
      { emoji },
    );
    return res.data;
  },

  removeReaction: async (
    workspaceId: string,
    channelId: string,
    messageId: string,
    emoji: string,
  ) => {
    const res = await api.delete(
      `/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}`,
    );
    return res.data;
  },
};
