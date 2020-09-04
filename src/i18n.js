import { addLocaleData } from 'react-intl';
import csLocaleData from 'react-intl/locale-data/cs';
import deLocaleData from 'react-intl/locale-data/de';
import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';
import frLocaleData from 'react-intl/locale-data/fr';
import itLocaleData from 'react-intl/locale-data/it';
import nlLocaleData from 'react-intl/locale-data/nl';
import nbLocaleData from 'react-intl/locale-data/nb';
import plLocaleData from 'react-intl/locale-data/pl';
import ptLocaleData from 'react-intl/locale-data/pt';
import fiLocaleData from 'react-intl/locale-data/fi';
import svLocaleData from 'react-intl/locale-data/sv';
import koLocaleData from 'react-intl/locale-data/ko';
import jaLocaleData from 'react-intl/locale-data/ja';
import zhLocaleData from 'react-intl/locale-data/zh';

import csCzTranslationMessages from 'serenova-client-strings/config/cs-CZ.json';
import deDeTranslationMessages from 'serenova-client-strings/config/de-DE.json';
import enGbTranslationMessages from 'serenova-client-strings/config/en-GB.json';
import enUsTranslationMessages from 'serenova-client-strings/config/en-US.json';
import esEsTranslationMessages from 'serenova-client-strings/config/es-ES.json';
import fiFiTranslationMessages from 'serenova-client-strings/config/fi-FI.json';
import frCaTranslationMessages from 'serenova-client-strings/config/fr-CA.json';
import frFrTranslationMessages from 'serenova-client-strings/config/fr-FR.json';
import itItTranslationMessages from 'serenova-client-strings/config/it-IT.json';
import jaJpTranslationMessages from 'serenova-client-strings/config/ja-JP.json';
import koKrTranslationMessages from 'serenova-client-strings/config/ko-KR.json';
import nbNoTranslationMessages from 'serenova-client-strings/config/nb-NO.json';
import nlNlTranslationMessages from 'serenova-client-strings/config/nl-NL.json';
import plPlTranslationMessages from 'serenova-client-strings/config/pl-PL.json';
import ptBrTranslationMessages from 'serenova-client-strings/config/pt-BR.json';
import svSeTranslationMessages from 'serenova-client-strings/config/sv-SE.json';
import zhCnTranslationMessages from 'serenova-client-strings/config/zh-CN.json';
import zhTwTranslationMessages from 'serenova-client-strings/config/zh-TW.json';

addLocaleData(csLocaleData);
addLocaleData(deLocaleData);
addLocaleData(enLocaleData);
addLocaleData(esLocaleData);
addLocaleData(frLocaleData);
addLocaleData(itLocaleData);
addLocaleData(nlLocaleData);
addLocaleData(nbLocaleData);
addLocaleData(plLocaleData);
addLocaleData(ptLocaleData);
addLocaleData(fiLocaleData);
addLocaleData(svLocaleData);
addLocaleData(koLocaleData);
addLocaleData(jaLocaleData);
addLocaleData(zhLocaleData);

export const formatTranslationMessages = (locale, messages) => {
  // This default message should be defined based on region (en-US for Americas and en-GB for EU)
  // but for the time being this should be good enough
  const defaultFormattedMessages = locale === 'en-US' ? {} : enUsTranslationMessages;
  return { ...defaultFormattedMessages, ...messages };
};

export const mappedLocalesOptions = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'de-DE', label: 'Deutsche (Deutschland)' },
  { value: 'en-GB', label: 'English (Great Britain)' },
  { value: 'es-ES', label: 'Español (España)' }, // Castilian Spanish - Grande!!
  { value: 'fr-CA', label: 'Français (Canada)' },
  { value: 'fr-FR', label: 'Français (France)' },
  { value: 'pl-PL', label: 'Polski (Polska)' },
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'cs-CZ', label: 'Čeština (Czech Republic)' },
  { value: 'fi-FI', label: 'Suomi (Suomessa)' }, // Standard Finnish
  { value: 'it-IT', label: 'Italiano (Italia)' },
  { value: 'ja-JP', label: '日本語 (日本)' }, // Standard Japanese
  { value: 'ko-KR', label: '한국어 (한국)' }, // Standard Korean
  { value: 'nb-NO', label: 'Norsk (Norge)' }, // Standard Norwegian
  { value: 'nl-NL', label: 'Nederlands (Nederland)' },
  { value: 'sv-SE', label: 'Svenska (Sverige)' }, // Standard Swedish
  { value: 'zh-CN', label: '简体中文 (中国)' }, // Simplified Chinese
  { value: 'zh-TW', label: '繁體中文 (中文 - 台灣)' } // Traditional Chinese - Taiwan
];

export const translationMessagesList = {
  'de-DE': formatTranslationMessages('de-DE', deDeTranslationMessages),
  'en-GB': formatTranslationMessages('en-GB', enGbTranslationMessages),
  'en-US': formatTranslationMessages('en-US', enUsTranslationMessages),
  'es-ES': formatTranslationMessages('es-ES', esEsTranslationMessages),
  'fr-CA': formatTranslationMessages('fr-CA', frCaTranslationMessages),
  'fr-FR': formatTranslationMessages('fr-FR', frFrTranslationMessages),
  'pl-PL': formatTranslationMessages('pl-PL', plPlTranslationMessages),
  'pt-BR': formatTranslationMessages('pt-BR', ptBrTranslationMessages),
  'cs-CZ': formatTranslationMessages('cs-CZ', csCzTranslationMessages),
  'fi-FI': formatTranslationMessages('fi-FI', fiFiTranslationMessages),
  'it-IT': formatTranslationMessages('it-IT', itItTranslationMessages),
  'ja-JP': formatTranslationMessages('ja-JP', jaJpTranslationMessages),
  'ko-KR': formatTranslationMessages('ko-KR', koKrTranslationMessages),
  'nb-NO': formatTranslationMessages('nb-NO', nbNoTranslationMessages),
  'nl-NL': formatTranslationMessages('nl-NL', nlNlTranslationMessages),
  'sv-SE': formatTranslationMessages('sv-SE', svSeTranslationMessages),
  'zh-CN': formatTranslationMessages('zh-CN', zhCnTranslationMessages),
  'zh-TW': formatTranslationMessages('zh-TW', zhTwTranslationMessages)
};
