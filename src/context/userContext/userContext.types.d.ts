import { ReactNode } from "react"

export type UserContextValues = {
    users: User[],
    currentUser: User | undefined,
    setCurrentUser: (user: User | undefined) => void
}

export type UserContextProviderProps = {
    children: ReactNode
}