export const getErrorMessage = (errorCode: string) => {
  if (errorCode === "Firebase: Error (auth/wrong-password).") {
    return "Wrong password";
  } else if (errorCode === "Firebase: Error (auth/user-not-found).") {
    return "Invalid email";
  }
  return "An error occurred. Please try again.";
};