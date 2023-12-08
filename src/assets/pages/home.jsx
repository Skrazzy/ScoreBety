import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useState, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { HouseCard } from '../components/cards/houseCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import chooseHouse from '../images/chooseHouse.svg';
import chooseSupplier from '../images/chooseSupplier.svg';
import { SupplierCard } from '../components/cards/supplierCard';
import { GameCard } from '../components/cards/gameCard';

export function Home({ data, setSGame, selectedGame, setShowModal, currentHouse, setCurrentHouse, currentSupplier, setCurrentSupplier, vipAccess, setVipAccess, currentLang }) {

    const localizedTexts = {
        chooseHouse: {
            'pt': 'Escolha a Casa de Apostas',
            'en': 'Choose the Betting House',
            'es': 'Elige la Casa de Apuestas'
        },
        chooseSupplier: {
            'pt': 'Escolha o Fornecedor',
            'en': 'Choose the Supplier',
            'es': 'Elige el Proveedor'
        },
        availableGames: {
            'pt': 'Jogos Disponíveis',
            'en': 'Available Games',
            'es': 'Juegos Disponibles'
        }
        // Add more keys and translations as needed
    };
    const getLocalizedText = (key) => {
        return localizedTexts[key][currentLang] || localizedTexts[key]['pt']; // Default to Portuguese if lang is not found
    };



    const location = useLocation();
    const navigate = useNavigate();
    const hasNavigatedAway = useRef(false);
    const [houseSwiper, setHouseSwiper] = useState(null);
    const [supplierSwiper, setSupplierSwiper] = useState(null);
    const [dataState, setData] = useState(data);

    const handleSliderItemClick = (index) => {
        const newData = [...dataState];
        const clickedItem = newData.splice(index, 1);
        newData.unshift(clickedItem[0]);
        setData(newData);
        houseSwiper.slideTo(0); // Mova o swiper de casas para a primeira posição
    };

    const handleSupplierClick = (supplierName) => {
        const newData = [...dataState];
        const selectedSupplier = dataState.find((current) => current.casino === currentHouse).suppliers.find((supplier) => supplier.name === supplierName);

        // Mova o fornecedor correspondente para a posição 1
        const supplierIndex = newData.find((current) => current.casino === currentHouse).suppliers.findIndex((supplier) => supplier.name === supplierName);
        const currentSuppliers = newData.find((current) => current.casino === currentHouse).suppliers;
        currentSuppliers.splice(supplierIndex, 1);
        currentSuppliers.unshift(selectedSupplier);

        // Atualize os dados
        const houseIndex = newData.findIndex((current) => current.casino === currentHouse);
        newData[houseIndex].suppliers = currentSuppliers;

        setData(newData);

        supplierSwiper.slideTo(0); // Mova o swiper de fornecedores para a primeira posição
    };

    useEffect(() => {
        if (typeof selectedGame === 'object' && selectedGame !== null) {
            navigate('/frustrar');
            hasNavigatedAway.current = true;
        }
    }, [selectedGame]);

    useEffect(() => {
        if ((location.pathname === '/' || location.pathname === '/verberat') && hasNavigatedAway.current) {
            setSGame(null);
            hasNavigatedAway.current = false;
        }
    }, [location]);

    useEffect(() => {
        if (location.pathname === "/verberat") {
            setVipAccess(true);
        }
        if (location.pathname === "/" && vipAccess) {
            navigate("/verberat");
        }
    }, [location, vipAccess]);

    return (
        <>
            {location.pathname === "/verberat" && (
                <section className='hSection'>
                    <div className="miniSectionTitle marginSpacings">
                        <img src={chooseHouse} />
                        <p className='mainText'>{getLocalizedText('chooseHouse')}</p>
                    </div>
                    <Swiper
                        slidesPerView={'auto'}
                        centeredSlides={false}
                        spaceBetween={16}
                        className="mySwiper"
                        onSwiper={(swiper) => setHouseSwiper(swiper)}
                    >
                        {dataState.map((current, index) => (
                            <SwiperSlide key={index}>
                                <div onClick={() => handleSliderItemClick(index)}>
                                    <HouseCard
                                        data={current}
                                        setShowModal={setShowModal}
                                        currentHouse={currentHouse}
                                        setCurrentHouse={setCurrentHouse}
                                        vipAccess={vipAccess}
                                        setCurrentSupplier={setCurrentSupplier}
                                        currentSupplier={currentSupplier}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}

            {location.pathname === "/" && (
                <section className='hSection'>
                    <div className="miniSectionTitle marginSpacings">
                        <img src={chooseHouse} />
                        <p className='mainText'>{getLocalizedText('chooseHouse')}</p>
                    </div>
                    <Swiper
                        slidesPerView={'auto'}
                        centeredSlides={false}
                        spaceBetween={16}
                        className="mySwiper"
                    >
                        {dataState.map((current, index) => (
                            <SwiperSlide key={index}>
                                <HouseCard
                                    data={current}
                                    setShowModal={setShowModal}
                                    currentHouse={currentHouse}
                                    setCurrentHouse={setCurrentHouse}
                                    vipAccess={vipAccess}
                                    setCurrentSupplier={setCurrentSupplier}
                                    currentSupplier={currentSupplier}
                                    currentLang={currentLang}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}

            {location.pathname === "/verberat" && (
                <section className='hSection'>
                    <div className="miniSectionTitle marginSpacings">
                        <img src={chooseSupplier} />
                        <p className='mainText'>{getLocalizedText('chooseSupplier')}</p>
                    </div>
                    <Swiper
                        slidesPerView={'auto'}
                        centeredSlides={false}
                        spaceBetween={16}
                        className="mySwiper"
                        onSwiper={(swiper) => setSupplierSwiper(swiper)}
                    >
                        {dataState.find((current) => current.casino === currentHouse).suppliers.map((current, index) => (
                            <SwiperSlide key={index}>
                                <div onClick={() => handleSupplierClick(current.name)}>
                                    <SupplierCard
                                        data={current}
                                        currentHouse={currentHouse}
                                        setShowModal={setShowModal}
                                        currentSupplier={currentSupplier}
                                        setCurrentSupplier={setCurrentSupplier}
                                        vipAccess={vipAccess}
                                        currentLang={currentLang}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}

            {location.pathname === "/" && (
                <section className='hSection'>
                    <div className="miniSectionTitle marginSpacings">
                        <img src={chooseSupplier} />
                        <p className='mainText'>{getLocalizedText('chooseSupplier')}</p>
                    </div>
                    <Swiper
                        slidesPerView={'auto'}
                        centeredSlides={false}
                        spaceBetween={16}
                        className="mySwiper"
                    >
                        {dataState.find((current) => current.casino === currentHouse).suppliers.map((current, index) => (
                            <SwiperSlide key={index}>
                                <SupplierCard
                                    data={current}
                                    currentHouse={currentHouse}
                                    setShowModal={setShowModal}
                                    currentSupplier={currentSupplier}
                                    setCurrentSupplier={setCurrentSupplier}
                                    vipAccess={vipAccess}
                                    currentLang={currentLang}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}

            <div id="enabledGames" className='hSection'>
            <h1 className='mainText'>{getLocalizedText('availableGames')}</h1>
                <Swiper
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    spaceBetween={16}
                    className="mySwiper"
                >
                    {dataState.find((current) => current.casino === currentHouse).suppliers.find((current) => current.name === currentSupplier).games.map((current, index) => (
                        <SwiperSlide key={index}>
                            <GameCard data={current} setSGame={setSGame} currentLang={currentLang} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
