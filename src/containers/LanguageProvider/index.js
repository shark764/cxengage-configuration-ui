import { connect } from 'react-redux';
import LanguageProviderLayout from './layout';

import { changeLocale } from '../../redux/modules/language';
import { selectCurrentLocale } from '../../redux/modules/language/selectors';

export function mapStateToProps(state) {
  return {
    locale: selectCurrentLocale(state)
  };
}

export const actions = {
  changeLocale
};

export default connect(mapStateToProps, actions)(LanguageProviderLayout);
