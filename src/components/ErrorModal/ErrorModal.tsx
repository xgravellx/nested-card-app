import React, { FC } from 'react'
import { ErrorModalProps } from './ErrorModal.types'
import { Styled } from './ErrorModal.styled'

const ErrorModal: FC<ErrorModalProps> = ({text, onClose}) => {
  return (
    <Styled className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-black flex justify-center items-center">
      <div className="rounded-lg shadow-md p-6 modal-main">
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-900">{text}</h2>
        </div>
      </div>
    </Styled>
  )
}

export default ErrorModal