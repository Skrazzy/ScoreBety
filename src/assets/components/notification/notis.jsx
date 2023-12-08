import React, { useState, useEffect, useMemo } from 'react';
import { NotiBadge } from './notiBadge.jsx';
import './notis.css'

export function Notis({ data, currentLang }) {

    const [namesA, setNamesA] = useState(['FortuneTiger'])
    const currentHour = new Date().getHours()
    const [count, setCount] = useState(0);
    const [badges, setBadges] = useState([]);
    const [isUserPresent, setIsUserPresent] = useState(true);

    const handleVisibilityChange = () => {
        setIsUserPresent(!document.hidden);
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        const interval = isUserPresent ? setInterval(() => {
            setCount(oldCount => oldCount + 1);
        }, 4000) : null;

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isUserPresent]);
    useEffect(() => {
        if (count > 0) {
            let randomType;
            const giftChance = Math.random(); // generates a random number between 0 and 1
            if (giftChance <= 1 / 20) {
                randomType = 'gift';
            } else {
                randomType = 'pix';
            }

            const names = [
                "Luiz", "Lula",
                "João", "Joca",
                "Felipe", "Lipe",
                "Gabriel", "Gabi",
                "Lucas", "Luquinhas",
                "Matheus", "Teteu",
                "Bruno", "Bru",
                "Ricardo", "Rico",
                "Gustavo", "Gus",
                "Carlos", "Cacá",
                "Diogo", "Digo",
                "Fernando", "Nando",
                "Thiago", "Tiago", "Thia",
                "Vitor", "Vitinho",
                "Jorge", "Jorginho",
                "Alexandre", "Xande",
                "Leandro", "Léo",
                "Cássio", "Cassinho",
                "Cauê", "Cau",
                "Rafael", "Rafa",
                "Rodrigo", "Digo",
                "Henrique", "Rique",
                "Murilo", "Muri",
                "Vinícius", "Vini",
                "Yuri", "Yu",
                "Wesley", "Wes",
                "Victor", "Vic",
                "Caio", "Cai",
                "André", "Dé",
                "Pedro", "Peu",
                "Eduardo", "Dudu",
                "Leonardo", "Léo",
                "Daniel", "Dani",
                "Paulo", "Paulinho",
                "Igor", "Igão",
                "Otávio", "Tavinho",
                "César", "Cesinha",
                "Arthur", "Tu",
                "Samuel", "Sam",
                "Renato", "Rê",
                "Willian", "Will",
                "Marcos", "Marquinho",
                "Isaac", "Zac",
                "Douglas", "Doug",
                "Júlio", "Ju",
                "Fabrício", "Fá",
                "Márcio", "Marcinho",
                "Roberto", "Beto",
                "Guilherme", "Gui",
                "Fábio", "Fabinho",
                "Rogério", "Roger",
                "José", "Zé",
                "André", "Dedé",
                "Antônio", "Tonho",
                "Marcelo", "Celo",
                "Cláudio", "Cau",
                "Sérgio", "Serginho",
                "Maria", "Mari",
                "Ana", "Aninha",
                "Beatriz", "Bia",
                "Julia", "Juju",
                "Luiza", "Lu",
                "Larissa", "Lari",
                "Isabela", "Bela",
                "Fernanda", "Nanda",
                "Gabriela", "Gabi",
                "Carolina", "Carol",
                "Amanda", "Mandi",
                "Bruna", "Bru",
                "Camila", "Cami",
                "Rafaela", "Rafa",
                "Leticia", "Leti",
                "Vitória", "Vivi",
                "Mariana", "Mari",
                "Daniela", "Dani",
                "Stefany", "Stef",
                "Alice", "Lice",
                "Eduarda", "Duda",
                "Clara", "Clarinha",
                "Jéssica", "Jess",
                "Nathalia", "Nati",
                "Sabrina", "Bri",
                "Samantha", "Sam",
                "Vanessa", "Nessa"
            ];
            const games = namesA;
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomGame = games[Math.floor(Math.random() * games.length)];

            // Conditional value based on the type
            let randomValue;
            if (randomType === 'gift') {
                randomValue = Math.floor(Math.random() * (3400 - 900 + 1) + 900); // generates a random number between 900 and 3400
            } else {
                randomValue = (Math.random() * 1000).toFixed(2); // generates a random number between 0 and 1000
            }

            const newBadge = { id: Date.now(), type: randomType, name: randomName, value: randomValue, game: randomGame };

            setBadges(oldBadges => {
                if (oldBadges.length >= 15) {
                    return [...oldBadges.slice(1), newBadge];
                }
                return [...oldBadges, newBadge];
            });
        }
    }, [count]);

    useEffect(() => {

        let setNamesArray = [];

        data.map(c => c.games.map(c => {
            setNamesArray.push(c.name)
        }))

        console.log(setNamesArray)
        
        setNamesA(setNamesArray);
   
    }, [])


    return (
        <section className='notiSection'>
            <div className="notiTrack">
                {badges.map((badge) => (
                    <NotiBadge key={badge.id} {...badge} currentLang={currentLang}/>
                ))}
            </div>
        </section>
    );
}
