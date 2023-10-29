


import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { HouseCard } from '../components/cards/houseCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';



import chooseHouse from '../images/chooseHouse.svg'
import chooseSupplier from '../images/chooseSupplier.svg'
import { SupplierCard } from '../components/cards/supplierCard';
import { GameCard } from '../components/cards/gameCard';

import logo from '../images/logo.png'
import arrow from '../images/chevron-right.svg'
import './home.css'
import { Nav } from '../components/nav/nav.jsx';




export function Home({ data, setSGame, selectedGame, setShowModal, currentHouse, setCurrentHouse, currentSupplier, setCurrentSupplier, vipAccess, setVipAccess }) {



    const location = useLocation();
    const navigate = useNavigate();
    const hasNavigatedAway = useRef(false); // flag variable

    useEffect(() => {
        if (typeof (selectedGame) === 'object' && selectedGame !== null) {

            navigate('/frustrar');
            hasNavigatedAway.current = true; // Set the flag to true when navigating away
        }
    }, [selectedGame]);

    useEffect(() => {
        if ((location.pathname === '/' || location.pathname === '/verberat') && hasNavigatedAway.current) {

            setSGame(null); // Replace this with your logic to clear the selectedGame
            hasNavigatedAway.current = false; // Reset the flag
        }
    }, [location]);

    useEffect(() => {

        if (location.pathname == "/verberat") {
            setVipAccess(true)
        }
        if (location.pathname == "/" && vipAccess) {
            navigate("/verberat")
        }
    }, [])

    return <>


        {/* Escolha sua casa de apostas */}
        <section className='hSection'>
            <div className="miniSectionTitle marginSpacings"><img src={chooseHouse} /><p className='mainText'>Escolha a Casa de Apostas</p></div>
            {
                <Swiper
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    spaceBetween={16}
                    className="mySwiper"
                >
                    {data.map((current, index) =>
                        <SwiperSlide key={index}>
                            <HouseCard data={current} setShowModal={setShowModal} currentHouse={currentHouse} setCurrentHouse={setCurrentHouse} vipAccess={vipAccess} setCurrentSupplier={setCurrentSupplier} currentSupplier={currentSupplier} />
                        </SwiperSlide>
                    )}
                </Swiper>
            }
        </section>
        {/* Escolha o seu Fornecedor */}
        <section className='hSection'>

            <div className="miniSectionTitle marginSpacings"><img src={chooseSupplier} /><p className='mainText'>Escolha o Fornecedor</p></div>
            {
                <Swiper
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    spaceBetween={16}
                    className="mySwiper"
                >
                    {
                        data.find((current) => current.casino === currentHouse).suppliers.some(supplier => supplier.name === currentSupplier) ?
                            data.find((current) => current.casino === currentHouse).suppliers.map((current, index) =>

                                <SwiperSlide key={index}>
                                    <SupplierCard data={current} currentHouse={currentHouse} setShowModal={setShowModal} currentSupplier={currentSupplier} setCurrentSupplier={setCurrentSupplier} vipAccess={vipAccess} />
                                </SwiperSlide>
                            ) : ''
                    }
                </Swiper>
            }
        </section>

        {/* Jogos Disponíveis */}
        <div id="enabledGames" className='hSection'>
            <h1 className='mainText'> Jogos Disponíveis </h1>


            {
                <Swiper
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    spaceBetween={16}
                    className="mySwiper"
                >{
                        data.find((current) => current.casino === currentHouse).suppliers.find((current) => current.name === currentSupplier).games.map((current, index) =>
                            <SwiperSlide key={index}>
                                <GameCard data={current}
                                    setSGame={setSGame} />
                            </SwiperSlide>
                        )}
                </Swiper>}
        </div>
    </>
}