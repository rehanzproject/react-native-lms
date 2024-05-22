import * as Yup from 'yup';

export const ForgotPasswordValidation = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});
