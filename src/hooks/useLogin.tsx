import {useState} from 'react';
import {EMAIL_REGEX} from '../util/constants';

export interface IUseLogin {
  email: string;
  password: string;
  isSubmitDisabled: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const useLogin = (): IUseLogin => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSubmitDisabled =
    !email?.length || !password.length || !EMAIL_REGEX.test(email);

  return {email, password, setEmail, setPassword, isSubmitDisabled};
};

export default useLogin;
