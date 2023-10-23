import {ListType} from '../../types';
import ProfileIcon from '../../components/atoms/Icons/ProfileIcon';
import CertificateIcon from '../../components/atoms/Icons/CertificateIcon';
import HistoryIcon from '../../components/atoms/Icons/HistoryIcon';
import HelpIcon from '../../components/atoms/Icons/HelpIcon';
import LogoutIcon from '../../components/atoms/Icons/LogoutIcon';
import * as Yup from 'yup';

export const EditProfileSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Terlalu pendek')
    .max(10, 'Terlalu Panjang')
    .required('Harus diisi'),
});

export const arrayList: ListType[] = [
  {
    name: 'Edit Profile',
    route: 'EditProfile',
    icon: <ProfileIcon />,
  },
  {
    name: 'Certificate',
    route: 'Certificate',
    icon: <CertificateIcon />,
  },
  {
    name: 'Transaction History',
    route: 'History',
    icon: <HistoryIcon />,
  },
  {
    name: 'Help Center',
    route: 'Help',
    icon: <HelpIcon />,
  },
  {
    name: 'Logout',
    route: 'Logout',
    icon: <LogoutIcon />,
  },
];
