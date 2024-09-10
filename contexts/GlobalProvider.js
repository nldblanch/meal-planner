import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { SignInReducer } from '../reducers/authReducer'
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const GlobalProvider = ({ children }) => {
  const [signedIn, dispatchSignedIn] = useReducer(SignInReducer,{
    userToken:null,
});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getCurrentUser()
    //   .then((res) => {
    //     if (res) {
    //       setIsLogged(true);
    //       setUser(res);
    //     } else {
    //       setIsLogged(false);
    //       setUser(null);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        signedIn,
        dispatchSignedIn,
        user,
        setUser,
        loading,
        setLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
