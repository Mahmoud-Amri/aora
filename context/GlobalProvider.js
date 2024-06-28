import {createContext,useContext,useEffect,useState} from 'react';
import { getCurrentUser } from '../lib/appwrite';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    const [User, setUser] = useState(null)
    const [Isloading, setIsloading] = useState(true)

    useEffect(()=>{
        getCurrentUser()
         .then((res)=>{
            if(res) {
                setIsLoggedIn(true);
                setUser(res)
            } else {
                setIsLoggedIn(false)
                setUser(null)
            }
         })
         .catch((error)=>{
            console.log(error);
         })
         .finally(()=>{
            setIsloading(false)
         })
    },[]);
    
    return (
<GlobalContext.Provider
value={{
IsLoggedIn,
setIsLoggedIn,
User,
setUser,
Isloading
}}
>
    {children}
</GlobalContext.Provider>
    )
}

export default GlobalProvider ;