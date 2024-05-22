import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Terlalu pendek')
    .max(10, 'Terlalu Panjang')
    .required('Harus diisi'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password harus sama')
    .min(2, 'Terlalu pendek')
    .max(10, 'Terlalu Panjang')
    .required('Harus diisi'),
    
});
