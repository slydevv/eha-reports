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