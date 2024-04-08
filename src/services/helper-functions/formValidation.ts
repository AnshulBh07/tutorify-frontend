// a valid name cannot contain any special characters, and numbers
export const validateName = (name: string) => {
  if (!name.match(/^[a-zA-Z\s]+$/)) {
    return false;
  }
  return true;
};
