import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { SignInReducer } from "../reducers/authReducer";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const GlobalProvider = ({ children }) => {
  const [signedIn, dispatchSignedIn] = useReducer(SignInReducer, {
    userToken: null,
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventInMemory, setEventInMemory] = useState({
    date: null,
    title: null,
  });

  useEffect(() => {}, []);

  return (
    <GlobalContext.Provider
      value={{
        signedIn,
        dispatchSignedIn,
        user,
        setUser,
        loading,
        setLoading,
        eventInMemory,
        setEventInMemory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
