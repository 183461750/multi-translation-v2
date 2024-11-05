const langMap = {
    auto: "auto",
    zh: "zh-CN",
    "zh-Hans": "zh-CN",
    "zh-Hant": "zh-TW",
    en: "en",
    ja: "ja",
    ko: "ko",
    fr: "fr",
    de: "de",
    es: "es",
    it: "it",
    ru: "ru",
    pt: "pt",
    nl: "nl",
    pl: "pl",
    ar: "ar",
    vi: "vi",
    th: "th"
};

function langMapReverse(lang) {
    if (lang === 'zh-CN') return 'zh-Hans';
    if (lang === 'zh-TW') return 'zh-Hant';
    return lang;
}

exports.langMap = langMap;
exports.langMapReverse = langMapReverse;

exports.supportLanguages = function() {
    return Object.keys(langMap);
}; 