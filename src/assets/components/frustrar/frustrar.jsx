import React, { useEffect, useState } from "react";
import './frustrar.css';
import arrow from '../../images/chevron-right.svg';
import logo from '../../images/logo.png';
import seedrandom from "seedrandom";


import { Terminal } from "./terminal/terminal";
import { useNavigate } from 'react-router-dom';
import { Stats } from "../stats/stats";
import { Nav } from "../nav/nav";
import { FrustrarProgressBar } from "./frustrarProgressBar/frustrarProgressBar";
import { Scrollbar } from "../scrollbar/scrollbar";

export function Frustrar({ data, vipAccess, currentLang }) {

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
        gameInfo: {
            'pt': 'O sistema irá te identificar como um jogador “frustrado” e vai fazer com que suas chances de ganhar aumentem em 8 vezes',
            'en': 'The system will identify you as a "frustrated" player and will increase your chances of winning by 8 times',
            'es': 'El sistema te identificará como un jugador "frustrado" y aumentará tus posibilidades de ganar 8 veces'
        },
        frustrateButton: {
            'pt': 'Frustrar Conta',
            'en': 'Frustrate Account',
            'es': 'Frustrar Cuenta'
        },
        depositRecommendation: {
            'pt': 'É recomendável depositar um valor mínimo de 30 reais para maior assertividade do algorítmo',
            'en': 'It is recommended to deposit a minimum amount of 30 reais for greater accuracy of the algorithm',
            'es': 'Se recomienda depositar un mínimo de 30 reales para una mayor precisión del algoritmo'
        }
        // Add more keys and translations as needed
    };

    const getLocalizedText = (key) => {
        return localizedTexts[key][currentLang] || localizedTexts[key]['pt']; // Default to Portuguese if lang is not found
    };

    const navigate = useNavigate();

    const [quality, setQuality] = useState('normal');
    const [newGamePercentage, setNewGamePercentage] = useState(0);
    const [gameRev, setGameRev] = useState('');
    const [gamePay, setGamePay] = useState('');

    function formatBigNumber(number) {
        if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M';
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(0) + 'K';
        } else {
            return number;
        }
    }

    useEffect(() => {
        if (typeof data === 'string') {
            if(vipAccess==true){

            };
        }
        if (data == null) {
            
            navigate('/');
        }
        if (data !== 'string' && data !== null) {
            const gamePercentage = (data.revenuePercentage * 3).toFixed(0);
            setGameRev(formatBigNumber(data.revenue));
            setGamePay(formatBigNumber(data.revenue * 0.2));
        }
    }, [data]);

    useEffect(() => {
        const updateGamePercentage = () => {
            if (data && data.revenuePercentage) {
                const today = new Date();
                const day = today.getDate();
                const rng = seedrandom(day.toString());
                const randomFactor = rng();

                let newNgp;

                if (data.revenuePercentage <= 2) {
                    newNgp = (data.revenuePercentage * (randomFactor * 9 + 1)).toFixed(0);
                }
                if (data.revenuePercentage > 2) {
                    newNgp = (data.revenuePercentage * (randomFactor * 6 + 1)).toFixed(0);
                }
                if (data.revenuePercentage > 5) {
                    newNgp = (data.revenuePercentage * (randomFactor * 3 + 1)).toFixed(0);
                }
                if (data.revenuePercentage > 10) {
                    newNgp = (data.revenuePercentage * (randomFactor * 4 + 1)).toFixed(0);
                }
                if (data.revenuePercentage > 17) {
                    newNgp = (data.revenuePercentage * (randomFactor * 2.5 + 1)).toFixed(0);
                }

                if (newNgp >= 100) {
                    const specialRng = seedrandom(today.toISOString());
                    newNgp = Math.floor(specialRng() * (98 - 88 + 1) + 88).toFixed(0);
                }

                setNewGamePercentage(newNgp);
            }
        };

        updateGamePercentage();
        const intervalId = setInterval(updateGamePercentage, 15 * 60 * 1000);

        const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        const timeToNextQuarterHour = (15 - (minutes % 15) - 1) * 60 * 1000 + (60 - seconds) * 1000 + (1000 - milliseconds);

        setTimeout(() => {
            updateGamePercentage();
            clearInterval(intervalId);
            setInterval(updateGamePercentage, 15 * 60 * 1000);
        }, timeToNextQuarterHour);

        return () => {
            clearInterval(intervalId);
        };
    }, [data]);

    useEffect(() => {
        if (newGamePercentage >= 60) {
            setQuality('good');
        } else if (newGamePercentage >= 25) {
            setQuality('normal');
        } else if (newGamePercentage < 25) {
            setQuality('bad');
        }
    }, [newGamePercentage]);

    const handleCardClick = () => {
        setSGame(data);
    };

    const [showTerminal, setShowTerminal] = useState(false);

    function runFrustrar() {
        console.log('frustrado ok');
        setShowTerminal(true);
    }

    return (
        <div className="container">
            <Scrollbar/>
            <div className="box">
                <div className={`box-content ${showTerminal ? "none" : ""}`}>
                    <h1 className="game-title">{data==null? '' : data.name}</h1>
                    <div className="fBarFrustrar">
                        <FrustrarProgressBar valorVariavel={newGamePercentage} quality={quality} />
                    </div>
                    <div className="game-info-container">
                    <p className="game-info">{getLocalizedText('gameInfo')}</p>
                        <div className="game-pay-reve">
                            <Stats
                                title={getLocalizedText('payment')}
                                value={`$ ${gamePay}`}
                            />
                            <Stats
                                title={getLocalizedText('revenue')}
                                value={`$ ${gameRev}`}
                            />
                        </div>
                    </div>
                    <button className="frustrate-button" onClick={runFrustrar}>{getLocalizedText('frustrateButton')}</button>
                </div>
                {showTerminal && (
                    <Terminal house={data.houseName} supplier={data.supplierName} game={data.name} currentLang={currentLang} />
                )}
            </div>
            <h4>{getLocalizedText('depositRecommendation')}</h4>
            <iframe src={data==null? '' : data.link} frameBorder="0" id="iframe"></iframe>
        </div>
    );
}