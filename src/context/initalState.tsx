import { State, User } from '../Types';

export const initialState: State = {
    loader: false,
    cards: [
        {
            id: 1673892942109,
            numberInput: 1,
            total: 1,
            parentId: 1673892869157,
            replies: [1673892946955],
            author: "John Doe",
            level: 0,
        },
        {
            id: 1673892946955,
            numberInput: 1,
            total: 1,
            parentId: 1673892942109,
            replies: [1673892952400],
            author: "John Doe",
            level: 0,
        },
    ]
}

export const initialUsers: User[] = [
    {
        name: "John Doe",
        id: 1
    },
    {
        name: "David Cole",
        id: 2
    },
    {
        name: "Simon Carter",
        id: 3
    },
    {
        name: "James Neil",
        id: 4
    },
]
