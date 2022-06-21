import * as Yup from "yup";

const emailSchema = Yup.object().shape({
    emailAddress: Yup.string().required("Email is required").email("Email is invalid"),
    isSubscribed: Yup.boolean().default(false)
})

export const formValidationSchema = Yup.object().shape({
    fullname: Yup.string()//.required("Fullname is required")
        //.min(6, "Full Name must be at least 6 characters")
        .max(20, "Full Name must not exceed 20 characters"),
    address: Yup.string()
        .required("Address is Required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    profile : Yup.string().required("Please Select People"),
    // password: Yup.string()
    //   .required("Password is required")
    //   .min(6, "Password must be at least 6 characters")
    //   .max(40, "Password must not exceed 40 characters"),
    // confirmPassword: Yup.string()
    //   .required("Confirm Password is required")
    //   .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    // acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
});

export type FormType = Yup.InferType<typeof formValidationSchema>;
