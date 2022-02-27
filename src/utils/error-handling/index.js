import Parse from 'parse';

export const handleParseError = ({ code: serverCode, message: serverMessage }) => {
  const { code, message } = serverMessage;
  switch (code || serverCode) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      Parse.User.logOut();
      window.location.reload();
      return {
        code,
        message: 'Your session has expired! Please login again'
      }
    default:
      return {
        code: code || serverCode,
        message: message || serverMessage
      };
  }
};