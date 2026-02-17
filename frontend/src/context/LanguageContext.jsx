import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    // Get saved language from localStorage or default to Marathi (false = Marathi, true = English)
    const [isEnglish, setIsEnglish] = useState(() => {
        const saved = localStorage.getItem('language');
        return saved === 'english';
    });

    // Save language preference whenever it changes
    useEffect(() => {
        localStorage.setItem('language', isEnglish ? 'english' : 'marathi');
    }, [isEnglish]);

    const toggleLanguage = () => {
        setIsEnglish(prev => !prev);
    };

    const t = (englishText, marathiText) => {
        return isEnglish ? englishText : marathiText;
    };

    const value = {
        isEnglish,
        setIsEnglish,
        toggleLanguage,
        t, // translation helper function
        language: isEnglish ? 'english' : 'marathi'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
