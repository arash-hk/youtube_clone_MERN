import { object, string, TypeOf } from "zod";

export const resgisterUserSchema = {
  body: object({
    username: string({
      required_error: "username is required",
    }),
    email: string({
      required_error: "email is required",
    }),
    password: string({
      required_error: "password is required",
    }).min(6, "password must be at least 6 characters long").max(64, "password should not be more than 64 characters") ,
    confirmPassword: string({
      required_error: "username is required",
    })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPasswords"],
  }),
};
