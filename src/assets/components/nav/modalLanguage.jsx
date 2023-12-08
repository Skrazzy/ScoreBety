

export function ModalLanguage({ br, es, usa, setCurrentLang, setLangOpen, currentLang }) {


    const localizedText = {
        title: {
            'pt': 'Selecione o seu idioma',
            'en': 'Select your language',
            'es': 'Seleccione su idioma'
        },
        closeButton: {
            'pt': 'Fechar',
            'en': 'Close',
            'es': 'Cerrar'
        }
    };

    // Function to get the localized text
    const getLocalizedText = (key) => {
        return localizedText[key][currentLang] || localizedText[key]['pt']; // Default to Portuguese
    };


    function setLanguage(selectedLanguage, ) {
       setCurrentLang(selectedLanguage)
       setLangOpen(false)
    }
    return (
        <div id="modalLang">
        <div id="langList">
            <div className="lang" onClick={() => setLanguage('pt')}> <img src={br} alt="Portuguese" /> </div>
            <div className="lang" onClick={() => setLanguage('es')}> <img src={es} alt="Spanish" /> </div>
            <div className="lang" onClick={() => setLanguage('en')}> <img src={usa} alt="English" /> </div>
        </div>
        <h1 id="title">{getLocalizedText('title')}</h1>
        <button id="closeBtnLang" onClick={() => setLangOpen(false)}>{getLocalizedText('closeButton')}</button>
    </div>
    )
}