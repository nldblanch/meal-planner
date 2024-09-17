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
  const [eventInMemory, setEventInMemory] = useState({
    date: null,
    title: null,
  });
  // type Calendar = {
  //   id: string;
  //   name: string;
  //   type: string;
  // };
  const [calendarSource, setCalendarSource] = useState({
    id: "",
    name: "",
    type: "",
  });
  useEffect(() => {}, []);

  return (
    <GlobalContext.Provider
      value={{
        signedIn,
        dispatchSignedIn,
        user,
        setUser,
        eventInMemory,
        setEventInMemory,
        calendarSource,
        setCalendarSource
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
