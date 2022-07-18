
export const isProd = () => {
  return process.env.NODE_ENV === "prod";
};

export const isLocal = () => {
  return process.env.NODE_ENV === "local";
};
