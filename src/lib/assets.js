export function assetUrl(path) {
  if (!path || /^(https?:|data:|blob:)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

