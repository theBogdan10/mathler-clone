import {useContext, useState} from 'react';
import {EMAIL_REGEX} from '../util/constants';
import {setAccessToken} from '../util/asyncStorage';
import tokens from '../util/mock/tokens.json';
import {AuthContext} from '../../App';

export interface IUseLogin {
  email: string;
  password: string;
  isSubmitDisabled: boolean;
  isLoading: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit(): Promise<void>;
}

const useLogin = (): IUseLogin => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const {setIsLogged} = useContext(AuthContext);

  const isSubmitDisabled =
    !email?.length || !password.length || !EMAIL_REGEX.test(email);

  const onSubmit = async () => {
    setIsLoading(true);

    await setAccessToken(tokens['1']);

    setIsLoading(false);
    setIsLogged(true);
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    isSubmitDisabled,
    onSubmit,
    isLoading,
  };
};

export default useLogin;
