import React, { useState, useEffect } from 'react';
import './terminal.css';
import { Timer } from '../timer/timer';
import { GetSignals } from '../../signals/signals';

export function Terminal({ house, supplier, game, currentLang }) {

  const localizedTexts = {
    startingProcess: {
      'pt': 'Iniciando o processo de Frustração via',
      'en': 'Starting the Frustration process via',
      'es': 'Iniciando el proceso de Frustración vía'
    },
    connectingAPI: {
      'pt': 'Conectando à API',
      'en': 'Connecting to API',
      'es': 'Conectando a la API'
    },
    downloadingConfig: {
      'pt': 'Baixando configuração',
      'en': 'Downloading configuration',
      'es': 'Descargando configuración'
    },
    creatingRequest: {
      'pt': 'Criando requisição Inject',
      'en': 'Creating Inject request',
      'es': 'Creando solicitud de Inject'
    },
    sendingRequest: {
      'pt': 'Enviando requisição à api',
      'en': 'Sending request to api',
      'es': 'Enviando solicitud a la api'
    },
    changingAccountStatus: {
      'pt': 'Alternado status da conta',
      'en': 'Changing account status',
      'es': 'Cambiando el estado de la cuenta'
    },
    success: {
      'pt': 'Sucesso!',
      'en': 'Success!',
      'es': '¡Éxito!'
    },
    accountFrustrated: {
      'pt': 'Conta frustrada com SUCESSO!',
      'en': 'Account successfully frustrated!',
      'es': '¡Cuenta frustrada con ÉXITO!'
    },
    increasedChances: {
      'pt': 'Suas chances de ganho na casa foram aumentadas em até 8x',
      'en': 'Your winning chances in the house have been increased up to 8x',
      'es': 'Tus posibilidades de ganar en la casa han aumentado hasta 8 veces'
    },
    newSignalGenerated: {
      'pt': 'Um novo sinal será gerado em:',
      'en': 'A new signal will be generated in:',
      'es': 'Una nueva señal se generará en:'
    },
    playNow: {
      'pt': 'Jogar Agora',
      'en': 'Play Now',
      'es': 'Jugar Ahora'
    },
    searchEntries: {
      'pt': 'BUSCAR ENTRADAS',
      'en': 'SEARCH ENTRIES',
      'es': 'BUSCAR ENTRADAS'
    }
    // Add more keys and translations as needed
  };

  const getLocalizedText = (key) => {
    return localizedTexts[key][currentLang] || localizedTexts[key]['pt']; // Default to Portuguese if lang is not found
  };


  const [animRun, setAnimRun] = useState(false)

  function formatString(inputString) {
    return inputString.replace(/\s+/g, '_').toLowerCase();
  }

  const [hideClasses, setHideClasses] = useState(false);
  const hideClassesCallback = (shouldHide) => {
    setHideClasses(shouldHide);
  };

  const fHouse = formatString(house);
  const fSupplier = formatString(supplier);
  const fGame = formatString(game);

  const [currentTask, setCurrentTask] = useState(0);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [successVisible, setSuccessVisible] = useState(false);
  const [signalVisible, setSignalVisible] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0);

  const randomTime = () => Math.floor(Math.random() * (5000 - 900 + 1) + 900);
  const randomTimeUpdate = () => Math.floor(Math.random() * (1200 - 900 + 1) + 900);
  const tasks = Array.from({ length: 9 }, () => randomTime());

  const randomSuccessTime = () => Math.floor(Math.random() * (10 - 3 + 1) + 3) * 60 * 1000;

  useEffect(() => {


    /*     ANIMATION APPEAR*/
    setTimeout(setAnimRun(true), 200)


    function processTask(index) {
      if (index >= tasks.length - 1) {
        setSuccessVisible(true);
        setRemainingTime(randomSuccessTime());
        return;
      }

      setCurrentTask(index + 1);

      if (index === 3) {
        let interval = setInterval(() => {
          setLoadingPercentage((prev) => {
            const increment = Math.floor(Math.random() * 10);
            const nextValue = prev + increment;

            if (nextValue >= 100) {
              clearInterval(interval);
              setLoadingPercentage(100);
              processTask(index + 1);
              return 100;
            }
            return nextValue;
          });
        }, randomTimeUpdate());
      } else {
        setTimeout(() => {
          processTask(index + 1);
        }, tasks[index]);
      }
    }

    processTask(0);
  }, []);


  const [signalMsg, setSignalMsg] = useState('oi');
  const [round, setRound] = useState(Math.floor(Math.random() * 100) + 1);
  const [cGame, setCGame] = useState('pato')


  useEffect(() => {
    setCGame(game)
    setSignalMsg(GetSignals({ game: game, round, currentLang }));
    console.log(signalMsg == undefined)
  }, [game, round]);

  return (
    <div id="terminalSection" className={animRun ? `t-afteranim` : `t-beforeanim`}>
      <div className="t-labels-holder">
        <p className='tLabel secondText'> {`${house} > ${supplier} > ${game}`} </p>
        <p className='tLabel secondText'> Terminal </p>
      </div>
      {successVisible == false &&
        <div id="terminal">
          {currentTask >= 1 && <p><span className='t-grey'>{getLocalizedText('startingProcess').split(' ')[0]}</span> {getLocalizedText('startingProcess').split(' ').slice(1).join(' ')} <span className='t-orange'>Inject</span></p>}
          {currentTask >= 2 && <p>{getLocalizedText('connectingAPI')}</p>}
          {currentTask >= 3 && <p>Conectando à <span className='t-green'>{fHouse}</span>.<span className='t-pink'>{fGame}</span></p>}
          {currentTask >= 4 && <p>{getLocalizedText('downloadingConfig')} <span className="t-grey"> // [{'.'.repeat(loadingPercentage / 10)}] {loadingPercentage}%</span></p>}
          {currentTask >= 5 && <p>{getLocalizedText('creatingRequest').split(' ')[0]} <span className='t-red'>{getLocalizedText('creatingRequest').split(' ')[1]}</span> {getLocalizedText('creatingRequest').split(' ').slice(2).join(' ')}</p>}
          {currentTask >= 6 && <p>{getLocalizedText('sendingRequest').split(' ')[0]} <span className='t-red'>{getLocalizedText('sendingRequest').split(' ')[1]}</span> à <span className='t-yellow'>api</span>.<span className='t-green'>{fSupplier}</span>.co/<span className='t-pink'>{fGame}</span></p>}
          {currentTask >= 7 && <p><span className='t-white'>{getLocalizedText('changingAccountStatus')}</span></p>}
          {currentTask >= 8 && <p><span className='t-grey'>{getLocalizedText('success')}</span></p>}
        </div>}

      {successVisible && (
        <div className={`success-overlay ${successVisible ? 'show-success' : ''}`}>
          <div className="sc-stroke">
            <div className="success-content">

              {signalVisible == false &&
                <div className="headerContent">
                  <h1>{getLocalizedText('accountFrustrated')}</h1>
                  <p className={`Time-Left ${hideClasses ? 'hidden' : ''}`}>{getLocalizedText('increasedChances')}</p>
                </div>}

              {signalVisible &&
                <>
                  <div className="timerHolder">
                    <h2>{getLocalizedText('newSignalGenerated')}</h2>
                    <Timer hideClassesCallback={hideClassesCallback} round={round} setRound={setRound} game={cGame} />
                  </div>


                  <div className=" fixedSC">
                    <div className="signalContent">
                      <span dangerouslySetInnerHTML={{ __html: signalMsg }}></span>
                    </div>
                  </div>

                </>}







              {signalVisible == false &&
                <a href={signalMsg != undefined ? '#' : '#iframe'}>
                  <button className={`sucess-button`} onClick={() => { signalMsg != undefined ? setSignalVisible(true) : '' }}>
                    {signalMsg != undefined ? getLocalizedText('searchEntries') : getLocalizedText('playNow')}
                  </button>
                </a>
              }
              {signalVisible && <a href='#iframe'><button className={`sucess-button`}>{getLocalizedText('playNow')}</button></a>}
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}
