import * as Yup from "yup";

const emailSchema = Yup.object().shape({
  emailAddress: Yup.string().required("Email is required").email("Email is invalid"),
  isSubscribed: Yup.boolean().default(false)
})

export const formValidationSchema = Yup.object().shape({
  fullname: Yup.string().required("Fullname is required")
    .min(6, "Full Name must be at least 6 characters")
    .max(20, "Fullname Must not Exceed 20 Characters"),

  address: Yup.string()
    .required("Address is Required"),

  dateOfBirth: Yup.date().required("Date of Birth is Required"),

  profile: Yup.string().required("Please Select People"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),

  phoneNumber: Yup.string().required("Phone Number is Required")
    .min(10, "Phone number should be 10 character")
    .max(15, "Phone number should be 10 character"),

  domainName: Yup.string().required("Domain Name is Required"),

  externalContact: Yup.array().of(
    Yup.object().shape({
      contactName: Yup.string().required("Contact Name is Required"),
      contactPhone: Yup.string().required("Contact Phone is Required"),
      contactEmail: Yup.string().required("Email Address is Required").email("Enter a Valid Email"),
      organization: Yup.string().required("Organization is Required")
    })
  ), 
  description : Yup.string().required("Description is Required"), 
  acceptTerms: Yup.bool().oneOf([true], "Accept Terms and condition"),
});

export type FormType = Yup.InferType<typeof formValidationSchema>;

export const emailValidationSchema = Yup.object().shape({
  from: Yup.string().required("From Email is Required.").email("Email is invalid"),
  to: Yup.array().of(Yup.string().email("Email is invalid")).required("To Email is Required."),
  cc: Yup.array().of(Yup.string().email("Email is invalid")),
  bcc: Yup.array().of(Yup.string().email("Email is invalid")),
  subject: Yup.string().required("Subject is Required."),
  body: Yup.string().required("Email Body is Required.")
})
