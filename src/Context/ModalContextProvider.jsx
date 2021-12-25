import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const showPopUp = () => setIsOpen(prev => !prev);
    const closeModal = () => setIsOpen(prev => prev = false);

    return (
        <ModalContext.Provider value={{ isOpen, showPopUp, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider
