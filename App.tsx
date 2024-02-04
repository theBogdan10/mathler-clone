import React, {createContext} from 'react';
import Mathler from './src/screens/Mathler/Mathler';
import Login from './src/screens/Login/Login';
import useApp from './src/hooks/useApp';
import {ActivityIndicator} from 'react-native';

export const AuthContext = createContext({
  setIsLogged: (value: boolean) => {},
  onLogout: () => {},
});

function App(): React.JSX.Element {
  const {isLogged, isLoading, setIsLogged, onLogout} = useApp();

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        size="large"
      />
    );
  }

  let content = <></>;

  if (!isLogged) {
    content = <Login />;
  }

  if (isLogged && !isLoading) {
    content = <Mathler />;
  }

  return (
    <AuthContext.Provider value={{setIsLogged, onLogout}}>
      {content}
    </AuthContext.Provider>
  );
}

export default App;
