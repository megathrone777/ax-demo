import { createContext } from "react-router";

const AuthContext = createContext<null | TUser>(null);

export { AuthContext };
