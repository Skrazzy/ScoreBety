import React from 'react';
import { useState, useEffect } from 'react';
import './modal.css';

import diamond from '../../images/diamond.png'

function Modal({ isOpen, setShowModal, currentLang }) {
    const localizedTexts = {
        vipAccess: {
            'pt': 'Acesso VIP',
            'en': 'VIP Access',
            'es': 'Acceso VIP'
        },
        description: {
            'pt': 'Monitore todas as casas, tenha acesso ao sistema de todos os fornecedores e veja os melhores jogos.',
            'en': 'Monitor all houses, have access to all suppliers systems and see the best games.',
            'es': 'Monitorea todas las casas, ten acceso al sistema de todos los proveedores y ve los mejores juegos.'
        },
        vipButton: {
            'pt': 'QUERO SER VIP',
            'en': 'I WANT TO BE VIP',
            'es': 'QUIERO SER VIP'
        },
        noThanksButton: {
            'pt': 'Não, obrigado',
            'en': 'No, thanks',
            'es': 'No, gracias'
        }
    };

    const getLocalizedText = (key) => {
        return localizedTexts[key][currentLang] || localizedTexts[key]['pt']; // Default to Portuguese if lang is not found
    };

    if (!isOpen) return null;

    function onClose() {
        setShowModal(false)
    }

    const [animRun, setAnimRun] = useState(false)

    useEffect(()=>{

        setTimeout(()=>{setAnimRun(true)}, 5)

    }, [])
    return (
        <div className={animRun ? `modalOverlay` : `modalOverlay mo-before`}>
            <div className={animRun ? `modal` : `modal m-before`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <img src={diamond} width={150} alt={getLocalizedText('vipAccess')} />
                        <h1><strong>{getLocalizedText('vipAccess')}</strong></h1>
                    </div>
                    <div className="modal-body">
                        <p>{getLocalizedText('description')}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="vip-button"><a href="https://checkout.perfectpay.com.br/pay/PPU38CNDESA"><strong>{getLocalizedText('vipButton')}</strong></a></button>
                        <button className="close-button" onClick={onClose}>{getLocalizedText('noThanksButton')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
