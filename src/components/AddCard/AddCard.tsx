import React, { FC, memo, useState } from 'react'
import { AddCardProps } from './AddCard.types'
import { Styled } from './AddCard.styled'
import ErrorModal from '../ErrorModal'

const AddCard: FC<AddCardProps> = memo(({ addHandler })=> {
    const [cardInput, setCardInput] = useState(0);
    const [error, setError] = useState('');  

    const validateInput = (numberInput: number): boolean => {
        if (numberInput === 0) {
            setError("Enter a number higher than zero")
            return false;
        } else {
            setError("")
            return true;
        }
    }
    const addCardHandler = () => {
        const isValid = validateInput(cardInput)
        if (isValid) {
            addHandler(cardInput)
            setCardInput(0)
        }
    }

  return (
    <Styled className='add-card-component'>
        <input 
            type='number' 
            value={cardInput} 
            onChange={e => setCardInput(parseInt(e.target.value))} 
            className='input-area block p-3 pl-5 text-sm text-gray-900 rounded-lg focus:ring-indigo-600 focus:border-indigo-600' placeholder="Add Card" />
        
        <button 
            onClick={addCardHandler} 
            className='add-card-btn bg-indigo-600 font-medium rounded-lg text-sm p-3'>
                Add Card
        </button>
        { 
            error !== '' 
                ? <ErrorModal text={error} onClose={() => setError('')} /> 
                : null
        }
    </Styled>
  )
})

export default AddCard