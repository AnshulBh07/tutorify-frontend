// a valid name cannot contain any special characters, and numbers
export const validateName = (name: string) => {
  // eslint-disable-next-line
  const regEx = /^[a-zA-Z\s]+$/;

  return regEx.test(name);
};

export const validateEmail = (email: string) => {
  // eslint-disable-next-line
  const regEx = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return regEx.test(email);
};

export const validatePassword: (p: string) => [boolean, string] = (
  password: string
) => {
  // a valid password meets the following criterias
  // 1. length is 8 or more
  // 2. contains at least one number
  // 3. contains at least one special character
  // 4. contains at least one uppercase letter
  // 5. contains at least one lowercase letter

  if (password.length < 8)
    return [false, "Password must be at least 8 characters long"];
  if (!/\d/.test(password))
    return [false, "Password must contain at least one number"];
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password))
    return [false, "Password must contain at least one special character"];
  if (!/[A-Z]/.test(password))
    return [false, "Password must contain at least one uppercase letter"];
  if (!/[a-z]/.test(password))
    return [false, "Password must contain at least one lowercase letter"];
  return [true, ""];
};
