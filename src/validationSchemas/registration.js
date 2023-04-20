import * as yup from "yup";

export const registrationValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  lastname: yup.string().required("Lastname is required"),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
