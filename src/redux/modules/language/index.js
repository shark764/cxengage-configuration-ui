import { fromJS } from 'immutable';

export const changeLocale = languageLocale => ({
  type: 'CHANGE_LOCALE',
  locale: languageLocale
});

const storage = window.localStorage;

const initialState = fromJS({
  // This default locale should be defined based on region (en-US for Americas and en-GB for EU)
  // but for the time being this should be good enough
  currentLocale: storage.getItem('locale') || 'en-US'
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LOCALE':
      return state.set('currentLocale', action.locale);
    default:
      return state;
  }
}
