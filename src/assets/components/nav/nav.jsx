import './nav.css'
import arrow from '../../images/chevron-right.svg';

import logo from '../../images/logo.png'


import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export function Nav({ vipAccess }) {

    useEffect(() => {
    }, [vipAccess])


    const navigate = useNavigate()

    function backHome() {
        navigate('/')
    }

    return (
        <nav className="vip-container">
            <h1 style={{color :"white"}}>Esperando Logo</h1>

            {

                vipAccess ? <button className="vip-button"> Membro VIP</button> : <a href='https://checkout.perfectpay.com.br/pay/PPU38CNDESA' target='_blank'><button className="vip-button">Acesso VIP <img src={arrow} /></button></a>

            }
        </nav >
    )

}

