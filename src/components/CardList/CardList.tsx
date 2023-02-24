import React, { useContext } from 'react'
import { CardsContext } from '../../context/cardContext/cardContext'
import { UserContext } from '../../context/userContext/userContext';
import AddCard from '../AddCard';
import CardView from '../Card/Card';
import { Styled } from './CardList.styled'

const CardList = () => {
    const {state, dispatch } = useContext(CardsContext);
    const {currentUser} = useContext(UserContext);

    const handleAddCard = (cardInput: number) => {
        dispatch({
            type: 'ADD_CARD',
            payload: {
                card: {
                    id: Date.now(),
                    numberInput: cardInput,
                    total: 0,
                    level: 0,
                    parentId: null,
                    replies: [],
                    author: currentUser?.name ?? ''
                }
            }
        })
    }

    const handleAddReply = (parentId: number, numberInput: number, isEdit: boolean = false) => {
        console.log('isEdit', isEdit, parentId)
        if (isEdit) {
            dispatch({
                type: 'UPDATE_CARD',
                payload: {
                    cardId: parentId,
                    cardUpdate: {
                        numberInput
                    }
                }
            })
        } else {
            dispatch({
                type: 'ADD_REPLY',
                payload: {
                    parentId: parentId,
                    reply: {
                        id: Date.now(),
                        numberInput: numberInput,
                        level: 0,
                        total: 0,
                        parentId: null,
                        replies: [],
                        author: currentUser?.name ?? ''
                    }
                }
            })
        }
    }

    const handleDeleteCard = (cardId: number) => {
        dispatch({ type: 'START_LOADING', payload: {} })
        dispatch({
            type: 'DELETE_CARD',
            payload: {
                cardId: cardId
            }
        })
        dispatch({ type: 'FINISH_LOADING', payload: {} })
    }

  return (
    <Styled className='card-list-component'>
        <AddCard addHandler={handleAddCard} /> 
        <div className='cards'>
            {state.cards.filter(c => c.parentId === null).map(card =>
                <CardView key={card.id} card={card} handleReply={handleAddReply} handleDelete={handleDeleteCard} />    
            )}
        </div>
    </Styled>
  )
}

export default CardList