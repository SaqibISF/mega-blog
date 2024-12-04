export const nameValidation = {
  pattern: /^[a-zA-Z ]+$/,

  requiredError: "What is your name?",
  minLengthValue: 3,
  minLengthError: "Please enter at least 3 characters",
  validationError: "Please enter a valid name",
};

export const emailValidation = {
  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,

  requiredError: "What is your email address?",
  validationError:
    "Please enter valid email address\n e.g. username@domain.com",
  isAlreadyExist: "This email is already in use",
  notExistError: "This email not found in record",
};

export const passwordValidation = {
  pattern: new RegExp(
    "^" +
      "(?=.*[0-9])" + //at least 1 digit
      // "(?=.*[a-z])" + //at least 1 lower case letter
      // "(?=.*[A-Z])" + //at least 1 upper case letter
      "(?=.*[a-zA-Z])" + //any letter
      // "(?=.*[@#$%^&+=])" + //at least 1 spacial character
      // "(?=\\S+$)" + //no white spaces
      ".{8,}" + //at least 8 characters , (maximum 15)
      "$"
  ),

  chooseRequiredError: "Please choose a password",
  enterRequiredError: "Please enter your password",
  confirmPasswordRequiredError: "Please confirm the password",
  confirmPasswordNotMatchError: "Passwords do not match",
  minLengthValue: 8,
  minLengthError: "Password must be at least 8 characters long",
  validationError:
    "Please choose a strong password" +
    "\n 1: Use must be at least one character" +
    "\n 2: Use must be at least one Digit",
  incorrectError: "Password is incorrect",
};
