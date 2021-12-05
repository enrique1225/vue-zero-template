const i18nService = {
    defaultLanguage: "en",

    languages: [{
            lang: "en",
            name: "Deutsch",
            flag: process.env.BASE_URL + "media/svg/flags/162-germany.svg"
        },
        {
            lang: "en",
            name: "Dutch (Nederlands)",
            flag: process.env.BASE_URL + "media/svg/flags/237-netherlands.svg"
        },
        {
            lang: "en",
            name: "English",
            flag: process.env.BASE_URL + "media/svg/flags/226-united-states.svg"
        },
        {
            lang: "en",
            name: "English (UK)",
            flag: process.env.BASE_URL + "media/svg/flags/260-united-kingdom.svg"
        },
        {
            lang: "en",
            name: "Español (México)",
            flag: process.env.BASE_URL + "media/svg/flags/021-mexico.svg"
        },
        {
            lang: "en",
            name: "Español (Spanish)",
            flag: process.env.BASE_URL + "media/svg/flags/128-spain.svg"
        },
        {
            lang: "en",
            name: "Français",
            flag: process.env.BASE_URL + "media/svg/flags/019-france.svg"
        },
        {
            lang: "en",
            name: "Italiano",
            flag: process.env.BASE_URL + "media/svg/flags/013-italy.svg"
        },
        {
            lang: "en",
            name: "Português (Brasil)",
            flag: process.env.BASE_URL + "media/svg/flags/011-brazil.svg"
        },
        {
            lang: "en",
            name: "Pусский",
            flag: process.env.BASE_URL + "media/svg/flags/248-russia.svg"
        },
        {
            lang: "en",
            name: "Tiếng Việt",
            flag: process.env.BASE_URL + "media/svg/flags/220-vietnam.svg"
        },
        {
            lang: "en",
            name: "Türkçe",
            flag: process.env.BASE_URL + "media/svg/flags/218-turkey.svg"
        },
        {
            lang: "en",
            name: "العربية",
            flag: process.env.BASE_URL + "media/svg/flags/133-saudi-arabia.svg"
        },
        {
            lang: "en",
            name: " 简体中文 ",
            flag: process.env.BASE_URL + "media/svg/flags/034-china.svg"
        }

    ],

    /**
     * Keep the active language in the localStorage
     * @param lang
     */
    setActiveLanguage(lang) {
        localStorage.setItem("language", lang);
    },

    /**
     * Get the current active language
     * @returns {string | string}
     */
    getActiveLanguage() {
        return localStorage.getItem("language") || this.defaultLanguage;
    }
};

export default i18nService;