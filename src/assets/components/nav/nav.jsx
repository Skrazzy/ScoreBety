import './nav.css'
import arrow from '../../images/chevron-right.svg';
import logo from '../../images/logo.png'

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ModalLanguage } from './modalLanguage';


import brflag from '../../images/languages/br.png'
import usaflag from '../../images/languages/usa.png'
import esflag from '../../images/languages/es.png'
import { useState } from 'react';

export function Nav({ vipAccess, currentLang, setCurrentLang }) {


    const localizedTexts = {
        vipButton: {
            'ptBR': 'Membro VIP',
            'en': 'VIP Member',
            'es': 'Miembro VIP'
        },
        vipAccessButton: {
            'ptBR': 'Acesso VIP',
            'en': 'VIP Access',
            'es': 'Acceso VIP'
        }
    };
    const getLocalizedText = (key) => {
        return localizedTexts[key][currentLang] || localizedTexts[key]['ptBR']; // Default to Portuguese if lang is not found or key is missing
    };

    useEffect(() => {
    }, [vipAccess])


    const navigate = useNavigate()

    function backHome() {
        navigate('/')
    }

    const [langOpen, setLangOpen] = useState(false)



    return (
        <>
            {langOpen ? <ModalLanguage br={brflag} usa={usaflag} es={esflag} setCurrentLang={setCurrentLang} setLangOpen={setLangOpen} currentLang={currentLang} /> :
                ''
            }


            <nav className="vip-container">
                <img src='https://i.postimg.cc/cJHkz9Mw/scorebet.webp' width={120} onClick={() => backHome()} ></img>

                <div id='currentLang' onClick={() => setLangOpen(true)}>
                    <img src={
                        currentLang == 'en' ? usaflag : (currentLang == 'es' ? esflag : brflag)
                    } width={25} />
                </div>
                {vipAccess 
                    ? <button className="vip-button">{getLocalizedText('vipButton')}</button>
                    : <a href='https://checkout.perfectpay.com.br/pay/PPU38CNDESA' target='_blank' rel='noreferrer'><button className="vip-button">{getLocalizedText('vipAccessButton')} <img src={arrow} alt="Arrow" /></button></a>
                }
            </nav >
        </>
    )

}

