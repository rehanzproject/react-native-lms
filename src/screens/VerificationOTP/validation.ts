import * as Yup from 'yup';

export const OTPValidation = Yup.object().shape({
  code_otp: Yup.string()
    .max(6, 'OTP code must be at most 6 characters')
    .required('OTP code is required'),
});
