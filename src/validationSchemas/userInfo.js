import * as yup from "yup";

export const userInfoValidationSchema = yup.object().shape({
  weightValue: yup
    .number()
    .required("El peso es obligatorio")
    .positive("El peso debe ser un número positivo")
    .min(1, "El peso debe ser al menos 1")
    .max(635, "El peso debe ser menor que 635"),
  heightValue: yup
    .number()
    .required("La altura es obligatoria")
    .positive("La altura debe ser un número positivo")
    .min(1, "La altura debe ser al menos 1")
    .max(272, "La altura debe ser menor que 272"),
  goalWeightValue: yup
    .number()
    .required("El peso objetivo es obligatorio")
    .positive("El peso objetivo debe ser un número positivo")
    .min(1, "El peso objetivo debe ser al menos 1")
    .max(635, "El peso objetivo debe ser menor que 635"),
  genderValue: yup.string().required("El género es obligatorio"),
  selectedDate: yup
    .date()
    .required("La fecha de nacimiento es obligatoria")
    .max(new Date(), "La fecha de nacimiento debe ser en el pasado"),
  activityLevel: yup.string().required("El nivel de actividad es obligatorio"),
});
