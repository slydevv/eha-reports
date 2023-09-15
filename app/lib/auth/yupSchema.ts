import * as yup from "yup";

const emailSuffixRegex = /@.*eha\.ng$/;

export const loginValidationSchema = yup.object({
    email: yup.string().email("not a valid email").required('Email is required').matches(emailSuffixRegex, "Email must end with eha.ng"),
    password: yup.string()
        .required('No password provided.')
        .min(6, 'Password is too short - should be 6 chars minimum.'),
})

export const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
  name: yup.string().required(),
  category: yup.array(),
});

  export const PasswordSchema = yup.object().shape({
    password: yup.string()
      .required("Password is required")
      .min(6, "Password must be at 6 char long"),
    confirmPwd: yup.string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords does not match"),
  });