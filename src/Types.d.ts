export type User = {
    id: number,
    name: string,
}

export type Card = {
    id: number;
    level: number;
    numberInput: number;
    total: number;
    parentId: number | null;
    replies: number[];
    author: string;
}

export type PartialCard = {
    numberInput?: number;
}

export type State = {
    cards: Card[];
    loader: boolean;
}

export type AddCardPayload = {
    card: Card;
}

export type AddReplyPayload = {
    parentId: number;
    reply: Card;
}

export type Action = {
    type: 'ADD_CARD' | 'ADD_REPLY' | 'DELETE_CARD' | 'FINISH_LOADING' | 'START_LOADING' | 'UPDATE_CARD';
    payload: {
        card?: Card;
        total?: Card;
        numberInput?: number;
        parentId?: number;
        reply?: Card;
        cardId?: number;
        cardUpdate?: PartialCard;
    }
}

export type CardContextValue = {
    state: State,
    dispatch: React.Dispatch<Action>
}
