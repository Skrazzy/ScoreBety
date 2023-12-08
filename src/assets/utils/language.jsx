import { useEffect } from "react";

export function Language({setCurrentLang}) {
    useEffect(() => {
        const getLanguageFromURL = () => {
            const queryParams = new URLSearchParams(window.location.search);
            const lang = queryParams.get('lang');

            if (lang && (lang === 'ptBR' || lang === 'es' || lang === 'en')) {
                console.log(lang);
                setCurrentLang(lang);
            } else {
                const storedLang = localStorage.getItem('currentLang');
                if (storedLang) {
                    setCurrentLang(storedLang);
                }
            }
        };

        getLanguageFromURL();
    }, [setCurrentLang]);
}
