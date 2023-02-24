import { createContext, useEffect, useState, FC } from "react";
import { User } from "../../Types";
import { initialUsers } from "../initalState";
import { UserContextProviderProps, UserContextValues } from "./userContext.types";

const UserContext = createContext<UserContextValues>({
    users: initialUsers,
    currentUser: {} as User,
    setCurrentUser: (user: User | undefined) => {}
})

const UserContextProvider: FC<UserContextProviderProps> = ({children}) => {
    const [users] = useState<User[]>(initialUsers)
    const [currentUser, setCurrentUser] = useState<User | undefined>(users[0])

    useEffect(() => setCurrentUser(users[0]), [])

  return (
    <UserContext.Provider value={{users, currentUser, setCurrentUser}}>
        {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider} 
