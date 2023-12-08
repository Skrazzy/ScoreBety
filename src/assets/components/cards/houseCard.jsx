import './selectCard.css'
import { Stats } from '../stats/stats'
import { useState, useEffect } from 'react';

import Modal from '../modal/modal';
import { render } from 'react-dom';

export function HouseCard({ data, setShowModal, currentHouse, setCurrentHouse, vipAccess, currentSupplier, setCurrentSupplier, currentLang }) {


    const localizedTexts = {
        payment: {
            'pt': 'Pagamento',
            'en': 'Payment',
            'es': 'Pago'
        },
        revenue: {
            'pt': 'Faturamento',
            'en': 'Revenue',
            'es': 'Ingresos'
        },
        players: {
            'pt': 'Jogadores',
            'en': 'Players',
            'es': 'Jugadores'
        }
        // Add more keys and translations as needed
    };

    const getLocalizedText = (key) => {
        return localizedTexts[key][currentLang] || localizedTexts[key]['pt']; // Default to Portuguese if lang is not found
    };
    
    const [BullsBet, setBullsBet] = useState(null);

    useEffect(() => {
    }, [BullsBet])

    function formatBigNumber(number) {
        if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M';
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(0) + 'K';
        } else {
            return number.toString();
        }
    }

 

    const handleCardClick = () => {

        if (vipAccess) {
            if (data.suppliers.some(supplier => supplier.name === currentSupplier)) {

                setCurrentHouse(data.casino)

            }
            else {
                setCurrentSupplier(data.suppliers[0].name)
                setCurrentHouse(data.casino)

            }

        } else {
            if (data.casino != currentHouse) {
                setShowModal(true);
            }
        }

    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (currentHouse != data.casino) {
            setBullsBet(false)
        } else {
            setBullsBet(true)
        }
    }, [currentHouse, currentSupplier])

    return (
        <>
            <div
                className={BullsBet ? "houseCard selectCard card-enabled" : "houseCard selectCardBlocked card-enabled"}
                onClick={handleCardClick}
            >
                <div className={BullsBet ? "sc-content" : "sc-content-blocked"}>
                    <img src={data.image} className={BullsBet ? "image" : "image-blocked"} alt="House" />
                    <div className={BullsBet ? "houseData" : "houseData lowopacity"}>
                        <Stats
                            title={getLocalizedText('payment')}
                            value={`$ ${formatBigNumber(data.revenue * 0.2)}`}
                        />

                        <Stats
                            title={getLocalizedText('revenue')}
                            value={`$ ${formatBigNumber(data.revenue)}`}
                        />

                        <Stats
                            title={getLocalizedText('players')}
                            value={formatBigNumber(data.players)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
