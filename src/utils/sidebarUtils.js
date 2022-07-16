export const getLastMsg = (message, userId) => {
  if (typeof message === "undefined" || message == null) return "";

  const { body, uname, uid } = message || {};
  const trimmedContent =
    body?.length > 20 ? `${body?.substring(0, 20 || "")}...` : body;
  return `${uid === userId ? "You" : uname}: ${trimmedContent}`;
};
