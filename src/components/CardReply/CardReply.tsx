import React, { FC, useState, useEffect } from 'react'
import { Styled } from './CardReply.styled'
import { CardReplyProps } from './CardReply.types'

const CardReply: FC<CardReplyProps> = ({ parentId, onSubmit, onFinish, numberInput }) => {
    const [reply, setReply] = useState(numberInput ? numberInput : 0);
    const [isEdit, setEdit] = useState(false);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReply(parseInt(event.target.value));
    };

    useEffect(() => {
        if (numberInput) {
            setEdit(true)
        }
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(parentId, reply, isEdit);
        setReply(0);
        setEdit(false)
        onFinish();
    };

    return (
    <Styled>
        <form onSubmit={handleSubmit} className="card-reply-form">
            <input type='number' value={reply} onChange={handleChange} className='card-update block p-3 m-3 pl-3 text-sm text-gray-900 rounded-lg focus:ring-indigo-600 focus:border-indigo-600' />
            <div className="btn-group">
                <button type="submit">{numberInput ? 'Update' : 'Submit'}</button>
                <button onClick={() => {
                    setReply(0);
                    onFinish()
                }}>Cancel</button>
            </div>
        </form>
    </Styled>
  )
}

export default CardReply