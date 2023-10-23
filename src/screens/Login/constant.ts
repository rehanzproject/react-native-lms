import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Terlalu pendek')
    .max(10, 'Terlalu Panjang')
    .required('Harus diisi'),
});
