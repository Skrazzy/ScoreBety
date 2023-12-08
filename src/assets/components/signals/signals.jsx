import seedrandom from "seedrandom";

export const GetSignals = ({ game, round, currentLang }) => {


    const localizedTexts = {
        withdrawIn: {
            'pt': 'Retirar em',
            'en': 'Withdraw at',
            'es': 'Retirar en'
        },
        skipRound: {
            'pt': 'Pular Rodada',
            'en': 'Skip Round',
            'es': 'Saltar Ronda'
        },
        enterInRed: {
            'pt': 'Entrem no vermelho',
            'en': 'Enter in red',
            'es': 'Entrar en rojo'
        },
        // ... add more translations for each piece of text used in signals ...
    };

    const getLocalizedText = (key) => {
        return localizedTexts[key][currentLang] || localizedTexts[key]['pt'];
    };

    const gameName = (typeof game == "object" && game != null ? game.name : "x")
    const seed = `${game}${round}`

    console.log(seed)
    const rng = seedrandom(seed)

    const getCrashSignal = (mode = 0) => { //aviator
        let results = [];

        const maxValues = {
            0: 1.5,
            1: 2.0,
            2: 8.0,
        };
        const max = maxValues[mode];

        const generateNumber = () => {
            let num;
            do {
                num = rng() * max;
            } while (num <= 1.17);
            return num.toFixed(2);
        };

        for (let i = 0; i < 3; i++) {
            results.push(`${getLocalizedText('withdrawIn')} <strong class="highlighted"> ${generateNumber()}x </strong>`);
        }

        // 35% chance to skip a round
        if (rng() < 0.35) {
            results[1] = getLocalizedText('skipRound');
        }

        return results.join('<br/>');
    };
    const getMinesSignal = (quanty) => { //mines
        let newGrid = Array(5).fill(Array(5).fill('🟦')); // Resetting the grid
        newGrid = JSON.parse(JSON.stringify(newGrid)); // Deep copy
        let count = 0;
        const positions = [];

        while (count < quanty) {
            const x = Math.floor(rng() * 5);
            const y = Math.floor(rng() * 5);
            const position = `${x}-${y}`;

            if (!positions.includes(position)) {
                newGrid[x][y] = '⭐';
                positions.push(position);
                count++;
            }
        }

        // Convert the grid to a string (or HTML)
        const gridString = newGrid.map(row => row.join('')).join('<br/>');
        return gridString;
    };
    const getFortuneSignal = () => { //tigrin
        const random = () => Math.floor(rng() * (10 - 3) + 3);

        const normal = random();
        const turbo = random();
        
        const localizedNormal = {
            'pt': 'normal',
            'en': 'normal',
            'es': 'normal'
        };
    
        const localizedTurbo = {
            'pt': 'turbo',
            'en': 'turbo',
            'es': 'turbo'
        };
    
        const localizedAnd = {
            'pt': 'e',
            'en': 'and',
            'es': 'y'
        };
    
        const localizedAlternating = {
            'pt': 'alternado',
            'en': 'alternating',
            'es': 'alternando'
        };
    
        return `<strong class="highlighted">${normal}x ${localizedNormal[currentLang]}</strong> ${localizedAnd[currentLang]} <br/> <strong class="highlighted">${turbo}x ${localizedTurbo[currentLang]}</strong> ${localizedAlternating[currentLang]}`;
    };
    const getRouletteSignal = () => {
        // Localized roulette signals
        const signals = {
            'pt': [
                `Entrem no <strong class="highlighted"> vermelho </strong>`,
                `Entrem no <strong class="highlighted"> preto </strong>`,
                `Joguem nos <strong class="highlighted"> pares </strong>`,
                `Joguem nos <strong class="highlighted"> ímpares </strong>`,
                `Entrem no <strong class="highlighted"> 1 a 18 </strong>`,
                `Entrem no <strong class="highlighted"> 19 a 36 </strong>`,
                `Entrem na <strong class="highlighted"> 1ª </strong> e <strong class="highlighted"> 2ª </strong> coluna`,
                `Entrem na <strong class="highlighted"> 1ª </strong> e <strong class="highlighted"> 3ª </strong> coluna`,
                `Entrem na <strong class="highlighted"> 2ª </strong> e <strong class="highlighted"> 3ª </strong> coluna`,
                `Entrem na <strong class="highlighted"> 1ª </strong> e <strong class="highlighted"> 2ª </strong> dúzia`,
                `Entrem na <strong class="highlighted"> 1ª </strong> e <strong class="highlighted"> 3ª </strong> dúzia`,
                `Entrem na <strong class="highlighted"> 2ª </strong> e <strong class="highlighted"> 3ª </strong> dúzia`
            ],
            'en': [
                `Enter in <strong class="highlighted"> red </strong>`,
                `Enter in <strong class="highlighted"> black </strong>`,
                `Bet on <strong class="highlighted"> even </strong>`,
                `Bet on <strong class="highlighted"> odd </strong>`,
                `Enter in <strong class="highlighted"> 1 to 18 </strong>`,
                `Enter in <strong class="highlighted"> 19 to 36 </strong>`,
                `Enter in <strong class="highlighted"> 1st </strong> and <strong class="highlighted"> 2nd </strong> column`,
                `Enter in <strong class="highlighted"> 1st </strong> and <strong class="highlighted"> 3rd </strong> column`,
                `Enter in <strong class="highlighted"> 2nd </strong> and <strong class="highlighted"> 3rd </strong> column`,
                `Enter in <strong class="highlighted"> 1st </strong> and <strong class="highlighted"> 2nd </strong> dozen`,
                `Enter in <strong class="highlighted"> 1st </strong> and <strong class="highlighted"> 3rd </strong> dozen`,
                `Enter in <strong class="highlighted"> 2nd </strong> and <strong class="highlighted"> 3rd </strong> dozen`
            ],
            'es': [
                `Entrar en <strong class="highlighted"> rojo </strong>`,
                `Entrar en <strong class="highlighted"> negro </strong>`,
                `Apuesta a <strong class="highlighted"> pares </strong>`,
                `Apuesta a <strong class="highlighted"> impares </strong>`,
                `Entrar en <strong class="highlighted"> 1 a 18 </strong>`,
                `Entrar en <strong class="highlighted"> 19 a 36 </strong>`,
                `Entrar en <strong class="highlighted"> 1ª </strong> y <strong class="highlighted"> 2ª </strong> columna`,
                `Entrar en <strong class="highlighted"> 1ª </strong> y <strong class="highlighted"> 3ª </strong> columna`,
                `Entrar en <strong class="highlighted"> 2ª </strong> y <strong class="highlighted"> 3ª </strong> columna`,
                `Entrar en <strong class="highlighted"> 1ª </strong> y <strong class="highlighted"> 2ª </strong> docena`,
                `Entrar en <strong class="highlighted"> 1ª </strong> y <strong class="highlighted"> 3ª </strong> docena`,
                `Entrar en <strong class="highlighted"> 2ª </strong> y <strong class="highlighted"> 3ª </strong> docena`
            ]
        };
    
        const chosenSignals = signals[currentLang] || signals['pt'];
    
        const complements = ["1 tentativa", "2 tentativas", "3 tentativas"];
        const randomSignal = chosenSignals[Math.floor(rng() * chosenSignals.length)];
        const randomComplement = complements[Math.floor(rng() * complements.length)];
    
        return `${randomSignal}`;
    };
    
    // Usage Example
    

    const getTwiceSignal = (op1, op2) => { //double
        const random = () => Math.floor(rng() * 2);

        const twiceOptions = [op1, op2]


        return twiceOptions[random()]

    }
    const getSquadSignal = (op1, op2, op3, op4) => { //quatro opções
        const random = () => Math.floor(rng() * 4);

        const squadOptions = [op1, op2, op3, op4]


        return squadOptions[random()]

    }



    /* ifs */

    function loadSignals(game) {

        let finalMessage
        let sinal



        if (game == "Mines") {
            finalMessage = getMinesSignal(5)

        }

        if (game === "Aviator" || game === "Spaceman") {
            finalMessage = getCrashSignal()
        }




        if (game === "Fortune Tiger") {
            finalMessage = getFortuneSignal();
        }

        if (game === "Roleta") {
            sinal = getRouletteSignal();
            finalMessage = `${sinal} <br/>
        `


        }

        /*VIP GAMES*/

        if (game === "Fortune Rabbit") {
            finalMessage = getFortuneSignal();
        }

        if (game === "Fortune Ox") {
            finalMessage = getFortuneSignal();
        }


        if (game === "BacBo") {
            const localizedOption1 = {
                'pt': 'Entre no Azul',
                'en': 'Enter in Blue',
                'es': 'Entra en Azul'
            };
            const localizedOption2 = {
                'pt': 'Entre no Vermelho',
                'en': 'Enter in Red',
                'es': 'Entra en Rojo'
            };
            const localizedMessage = {
                'pt': 'Esse tá fácil! Aposte e marque o EMPATE.',
                'en': 'This one is easy! Bet and mark the TIE.',
                'es': '¡Este es fácil! Apuesta y marca el EMPATE.'
            };
            sinal = getTwiceSignal(`<strong class="highlighted">${localizedOption1[currentLang]}</strong>`, `<strong class="highlighted">${localizedOption2[currentLang]}</strong>`);
            finalMessage = `${localizedMessage[currentLang]} <br/> ${sinal}`;
        }
        
        if (game === "DragonTiger") {
            const localizedOption1 = {
                'pt': 'Aposte no Dragão',
                'en': 'Bet on the Dragon',
                'es': 'Apuesta al Dragón'
            };
            const localizedOption2 = {
                'pt': 'Aposte no Tigre',
                'en': 'Bet on the Tiger',
                'es': 'Apuesta al Tigre'
            };
            const localizedMessage = {
                'pt': 'É sinalzinho que vocês querem? Aposte e marque o EMPATE.',
                'en': 'Looking for a signal? Bet and mark the TIE.',
                'es': '¿Buscando una señal? Apuesta y marca el EMPATE.'
            };
            sinal = getTwiceSignal(`<strong class="highlighted">${localizedOption1[currentLang]}</strong>`, `<strong class="highlighted">${localizedOption2[currentLang]}</strong>`);
            finalMessage = `${localizedMessage[currentLang]} <br/> ${sinal}`;
        }
        
        if (game === "FootballStudio") {
            const localizedOption1 = {
                'pt': 'Aposte na Casa',
                'en': 'Bet on Home',
                'es': 'Apuesta en Casa'
            };
            const localizedOption2 = {
                'pt': 'Aposte no Visitante',
                'en': 'Bet on Away',
                'es': 'Apuesta en Visitante'
            };
            const localizedMessage = {
                'pt': 'É sinalzinho que vocês querem? Lembre-se de marcar o EMPATE.',
                'en': 'Want a signal? Remember to mark the TIE.',
                'es': '¿Quieres una señal? Recuerda marcar el EMPATE.'
            };
            sinal = getTwiceSignal(`<strong class="highlighted">${localizedOption1[currentLang]}</strong>`, `<strong class="highlighted">${localizedOption2[currentLang]}</strong>`);
            finalMessage = `${localizedMessage[currentLang]} <br/> ${sinal}`;
        }
        
        if (game === "LightingDice") {
            const localizedOptions = {
                'pt': ['NÚMERO ALTO', 'NÚMERO BAIXO', 'QUALQUER DUPLO', 'QUALQUER TRIPLO'],
                'en': ['HIGH NUMBER', 'LOW NUMBER', 'ANY DOUBLE', 'ANY TRIPLE'],
                'es': ['NÚMERO ALTO', 'NÚMERO BAJO', 'CUALQUIER DOBLE', 'CUALQUIER TRIPLE']
            };
            const localizedMessage = {
                'pt': 'Podem apostar em',
                'en': 'You can bet on',
                'es': 'Pueden apostar en'
            };
            sinal = getSquadSignal(...localizedOptions[currentLang]);
            finalMessage = `${localizedMessage[currentLang]} <strong class="highlighted">${sinal}!!</strong>`;
        }
        

        if (game == "NinjaCrash") {
            sinal = Math.floor(rng() * (4 - 2) + 2);
            const localizedMessage = {
                'pt': 'Entrem e façam',
                'en': 'Enter and make',
                'es': 'Entrar y hacer'
            };
            finalMessage = `${localizedMessage[currentLang]} <strong class="highlighted">${sinal}</strong>`;
        }
        
        return finalMessage

    }

    console.log(loadSignals(game))

    return loadSignals(game);
}
