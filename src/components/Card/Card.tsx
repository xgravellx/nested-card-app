import React, { FC, memo, useState, useContext } from 'react'
import { Styled } from './Card.styled'
import { CardProps } from './Card.types'
import { Card } from '../../Types'
import { CardsContext } from '../../context/cardContext/cardContext'
import CardReply from '../CardReply'

const extractCard = (cardInput: number, cards: Card[]) => cards.find(c => c.id === cardInput)

const CardView: FC<CardProps> = memo(({ card, handleReply, handleDelete}) => {
    const [showReply, setShowReply] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { state } = useContext(CardsContext);

    if (!card) {
        return <></>
    }

    const reset = () => {
        setShowReply(false);
        setIsEdit(false);
    }

  return (
    <Styled className='card-component'>
        <div className='card'>
            <div className='card-general'>
                <div className='card-numberInput'>{card.numberInput}</div>
                <div className='card-total'>Total: {card.total}</div>
                <div className='card-controls'>
                    <button className='card-controls-button button-reply' onClick={() => setShowReply(true)}>Reply</button>
                    <button className='card-controls-button button-edit' onClick={() =>{
                        setShowReply(true)
                        setIsEdit(true)
                    }}>Edit</button>
                    <button className='card-controls-button button-delete' onClick={() => handleDelete(card.id)}>Delete</button>
                </div>
            </div>
            
            <div className='card-replies'>
                <>
                    {showReply && (
                        <CardReply 
                            parentId={card.id}
                            onSubmit={handleReply}
                            onFinish={() => reset()}
                            numberInput= {isEdit ? card.numberInput : 0}
                        />
                    )}
                </>
                <>
                    {card.replies.map(replyId => 
                        <CardView 
                            key={replyId}
                            card={extractCard(replyId, state.cards)}
                            handleReply= {handleReply}
                            handleDelete= {handleDelete}
                        />

                    )}
                </>
            </div>
        </div>
    </Styled>
  )
})

export default CardView