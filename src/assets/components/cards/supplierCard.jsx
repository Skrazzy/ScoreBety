
import './selectCard.css'
import { Stats } from '../stats/stats'
import { useState, useEffect } from 'react';
export function SupplierCard({data, setShowModal, currentHouse, currentSupplier, setCurrentSupplier, vipAccess, currentLang}) {

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
        }
    };

    const getLocalizedText = (key) => {
        return localizedTexts[key][currentLang] || localizedTexts[key]['pt']; // Default to Portuguese if lang is not found
    };

    const [Spribe, setSpribe] = useState(false)
    function formatBigNumber(number) {
        if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M';
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(0) + 'K';
        } else {
            return number;
        }
    }

    useEffect(() => {if (currentSupplier != data.name){
        setSpribe(false)
    }
    else{
        setSpribe(true)

    }
}, [currentSupplier, currentHouse])

    const handleCardClick = () => {
        if (data.name != currentSupplier && vipAccess == false) {
            setShowModal(true);
        }
        else{
            setCurrentSupplier(data.name)
            setSpribe(true)
        }
    };

    return (
        <div className={Spribe ? "supplierCard selectCard card-enabled" : "supplierCard selectCardBlocked card-enabled"} onClick={handleCardClick}>
            <div className={Spribe ? "sc-content" : "sc-content-blocked"}>
                <img src={data.image} className={Spribe ? "image" : "image-blocked"} alt="Supplier" />
                <div className={Spribe ? "houseData supp-houseD" : "houseData supp-houseD lowopacity"}>
                    <Stats title={getLocalizedText('payment')} value={`$ ${formatBigNumber(data.payment)}`}/>
                    <Stats title={getLocalizedText('revenue')} value={`$ ${formatBigNumber(data.revenue)}`}/>
                </div>
            </div>
        </div>
    );
}