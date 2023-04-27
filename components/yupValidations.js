import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('E-mail is required'),
  password: yup
    .string()
    .min(5, 'Too short!')
    .max(100, 'Too long!')
    .required('Password is required')
})

export const otherValidationSchema = yup.object().schape({
  name: yup
    .string().required(),
  age: yup
    .number().required().positive().integer(),
  email: yup
    .string().email(),
  website: yup
    .string().url().nullable(),
  createdOn: yup
    .date().default(() => new Date())
})
