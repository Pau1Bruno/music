import React, { FC } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
    children: React.ReactNode,
    modal: boolean,
    setModal: (modal: boolean) => void,
}

const Modal: FC<ModalProps> = ({ children, modal, setModal }) => {
    
    const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setModal(false);
    };
    
    return (
        <div className={modal ? styles.modal_active : styles.modal} onClick={() => setModal(false)}>
            <div className={styles.modal_content} onClick={event => event.stopPropagation()}>
                {children}
                <button className={styles.button} onClick={(e) => handleCloseModal(e)}>Close</button>
            </div>
        </div>
    );
};

export default Modal;

//import React from 'react';
// import classes from "./MyModal.module.css";
//
// const MyModal = ({children, visible, setVisible}) => {
//
//     const rootClasses = [classes.myModal];
//     if (visible) {
//         rootClasses.push(classes.active);
//     }
//
//     return (
//         <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
//             <div className={classes.myModalContent} onClick={event => event.stopPropagation()}>
//                 {children}
//             </div>
//         </div>
//     );
// };
//
// export default MyModal;