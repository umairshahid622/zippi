export const normalizeChannelName = (raw: string): string => {
  return raw.trim().toLowerCase().replace(/\s+/g, "-");
};

export const isValidChannelName = (name: string): boolean => {
  return /^[a-z0-9-]+$/.test(name) && name.length >= 1 && name.length <= 80;
};
