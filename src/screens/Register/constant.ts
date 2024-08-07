import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    nim: Yup.string().min(2, 'Terlalu Pendek').max(8, 'Terlalu Panjang').required('Harus diisi'),
    name: Yup.string().min(2, 'Terlalu Pendek').max(16, 'Terlalu Panjang').required('Harus diisi'),
    prodi: Yup.string().required('Harus diisi'),
    
  email: Yup.string().email('Invalid email').required('Required'),
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
