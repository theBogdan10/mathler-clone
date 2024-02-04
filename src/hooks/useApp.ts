import {useCallback, useEffect, useState} from 'react';
import {clearStorage, getAccessToken} from '../util/asyncStorage';

interface IUseAppResult {
  isLogged: boolean;
  isLoading: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => Promise<void>;
}

const useApp = (): IUseAppResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    getAccessToken()
      .then(data => {
        if (data) {
          setIsLogged(true);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const onLogout = useCallback(async () => {
    await clearStorage();
    setIsLogged(false);
    setIsLoading(false);
  }, []);

  return {isLogged, isLoading, setIsLogged, onLogout};
};

export default useApp;
