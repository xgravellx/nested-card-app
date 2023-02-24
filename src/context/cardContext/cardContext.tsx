import { createContext, useEffect, useReducer } from "react";
import produce from 'immer';
import { Action, CardContextValue, State } from "../../Types";
import { CardsProviderProps } from "./cardContext.types";
import { useLocalStorage } from "../../hooks/storage";
import { initialState } from "../initalState";

const CardsContext = createContext<CardContextValue>({
    state: {
        cards: [],
        loader: false
    }, dispatch: () => {}
})

const CardsProvider = ({children} : CardsProviderProps) => {
    const [localStorageState, setLocalStorageState] = useLocalStorage<State>("state")
    
    const [state, dispatch] = useReducer((state: State, action: Action) =>
        produce(state, (draft) => {
            switch (action.type) {

                case 'ADD_CARD': {
                    const { card } = action.payload;
                    if (card) {
                        const newCard = {
                            ...card, 
                            parentId: null,
                            replies: [],
                            total: card.numberInput
                        }
                        draft.cards.push(newCard);
                        const parentCard = draft.cards.find((c) => c.id === null);
                        if (parentCard) {
                            parentCard.total += newCard.total;
                        }
                    }
                    break;
                }

                case 'ADD_REPLY': {
                    const { parentId, reply } = action.payload;
                    if (parentId && reply) {
                      // Find the parent card
                      const parentCard = draft.cards.find((c) => c.id === parentId);
                      if (parentCard) {
                        // Calculate the total for the reply
                        const replyTotal = reply.numberInput + (reply.replies.reduce((total, replyId) => {
                          const reply = draft.cards.find(c => c.id === replyId);
                          return reply ? total + reply.total : total;
                        }, 0));
                        // Calculate the total for the parent card based on the level of the reply
                        let levelTotal = replyTotal;
                        let level = parentCard.level + 1;
                        if (parentCard.replies.length > 0) {
                          const levels = parentCard.replies.map(replyId => {
                            const reply = draft.cards.find(c => c.id === replyId);
                            return reply ? reply.level : 0;
                          });
                          level = Math.max(...levels) + 1;
                        }
                        parentCard.replies.push(reply.id);
                        const total = parentCard.total + replyTotal;
                        draft.cards.push({
                          ...reply,
                          parentId: parentId,
                          replies: [],
                          total: replyTotal,
                          level: level,
                        });
                        parentCard.total = total;
                      }
                      
                    }
                    break;
                  }

                case 'UPDATE_CARD' : {
                    const { cardId, cardUpdate } = action.payload;
                    if (cardId) {
                        const currentCardIndex = draft.cards.findIndex(c => c.id === cardId);
                        if (currentCardIndex >= 0) {
                            const updated = { ...draft.cards[currentCardIndex], ...cardUpdate }
                            draft.cards[currentCardIndex] = updated
                        }
                    }
                    break;
                }

                case 'DELETE_CARD' : {
                    const { cardId } = action.payload;
                    if (cardId) {
                        const currentCard = draft.cards.find(c => c.id === cardId);
                        if (currentCard) {
                            const targetCardIds = [cardId, ...(currentCard.replies.length > 0 ? currentCard.replies : [])]
                            draft.cards = draft.cards.filter(cm => !targetCardIds.includes(cm.id))
                        }
                    }
                    break;
                }
            }
        }),
        localStorageState ? localStorageState : initialState
    );

    useEffect(() => {
        setLocalStorageState(state)
    }, [state, setLocalStorageState])

  return (
    <CardsContext.Provider value={{state, dispatch}}>
        {children}
    </CardsContext.Provider>
  )
}

export { CardsContext, CardsProvider }