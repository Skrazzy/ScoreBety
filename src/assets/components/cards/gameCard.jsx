import { Stats } from "../stats/stats"
import { useState, useEffect } from "react";
import { ProgressBar } from "./gameProgress";
import seedrandom from "seedrandom";


export function GameCard({ data, setSGame, currentLang }) {

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
        // Add more keys and translations as needed
    };

    const getLocalizedText = (key) => {
        return localizedTexts[key][currentLang] || localizedTexts[key]['pt']; // Default to Portuguese if lang is not found
    };

    const [quality, setQuality] = useState('normal')
    const [newGamePercentage, setNgp] = useState(0)

    useEffect(() => {

        // Calculate the remaining time until the next 15-minute mark
        const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();

        const timeToNextQuarterHour = (15 - (minutes % 15) - 1) * 60 * 1000 + (60 - seconds) * 1000 + (1000 - milliseconds);

        // Function to update the random game percentage
        const updateGamePercentage = () => {
            const today = new Date();
            const day = today.getDate();
            const rng = seedrandom(day.toString());
            const randomFactor = rng();

            function calcNgp() {
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

                // Apply the barrier logic
                if (newNgp >= 100) {
                    const specialRng = seedrandom(today.toISOString());
                    newNgp = Math.floor(specialRng() * (98 - 88 + 1) + 88).toFixed(0);
                }

                setNgp(newNgp);
            }

            calcNgp();
        };

        // Update the game percentage immediately and schedule further updates
        updateGamePercentage();
        const intervalId = setInterval(updateGamePercentage, 15 * 60 * 1000);

        // Schedule an update for the next 15-minute mark
        setTimeout(() => {
            updateGamePercentage();
            clearInterval(intervalId);
            setInterval(updateGamePercentage, 15 * 60 * 1000);
        }, timeToNextQuarterHour);

        // Clear interval on unmount
        return () => {
            clearInterval(intervalId);
        };
    }, [data]);

    const gameImg = data.image
    const gameRev = formatBigNumber(data.revenue)
    const gamePay = formatBigNumber(data.revenue * 0.2)




    function formatBigNumber(number) {
        if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M';
        } if (number >= 1e3) {
            return (number / 1e3).toFixed(0) + 'K';
        } else {
            return number;
        }


    }

    useEffect(() => {


        if (newGamePercentage >= 60) {
            setQuality('good')
        }
        else if (newGamePercentage >= 25) {
            setQuality('normal')
        }
        else if (newGamePercentage < 25) {
            setQuality('bad')
        }

    }, [newGamePercentage])

    const handleCardClick = () => {
        setSGame(data)
/*         window.location.href = 'frustrar';
 */    };


    return (
        <div className="gameCard-stroke selectCard card-enabled" onClick={handleCardClick}>
            <div className="gameCard-ui sc-content">
                <div className="imgfade"></div>
                <img src={gameImg} className="gameImage" alt="Game" />
                <div className="houseData gms-houseD">
                    <Stats
                        title={getLocalizedText('payment')}
                        value={`$ ${gamePay}`}
                    />
                    <Stats
                        title={getLocalizedText('revenue')}
                        value={`$ ${gameRev}`}
                    />
                </div>
                <ProgressBar valorVariavel={newGamePercentage} quality={quality} />
            </div>
        </div>
    );
}