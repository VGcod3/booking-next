import { ReactNode } from "react";
import { useSelector } from 'react-redux';


interface LoggedInProps {
    children: ReactNode
}

const LoggedIn = ({ children }: LoggedInProps) => {

    const isLoggedIn = useSelector((store) => store.user.isLogged);


    return { children };
}

export default LoggedIn;