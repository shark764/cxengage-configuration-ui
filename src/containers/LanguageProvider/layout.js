import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import { translationMessagesList, mappedLocalesOptions } from '../../i18n';

const storage = window.localStorage;

export default class LanguageProvider extends Component {
  componentWillMount() {
    const locale =
      storage.getItem('locale') ||
      mappedLocalesOptions
        .reduce((list, { value }) => [...list, value], [])
        .find(val => val === window.navigator.language);
    if (locale) {
      this.props.changeLocale(locale);
    }
  }

  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={translationMessagesList[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  changeLocale: PropTypes.func,
  children: PropTypes.element.isRequired
};
