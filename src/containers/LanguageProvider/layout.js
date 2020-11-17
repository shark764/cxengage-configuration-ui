import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { isInIframe } from 'serenova-js-utils/browser';

import { translationMessagesList, mappedLocalesOptions } from '../../i18n';

const storage = window.localStorage;

export default class LanguageProvider extends Component {
  componentDidMount() {
    const locale = location.hash.includes('alpha')
      ? storage.getItem('locale') ||
        mappedLocalesOptions
          .reduce((list, { value }) => [...list, value], [])
          .find(
            (val) => val === window.navigator.language || val.split('-')[0] === window.navigator.language.split('-')[0]
          )
      : 'en-US';
    if (locale) {
      this.changeLocale(locale);
    }
    addEventListener('message', this.handleMessage);

    // Tell config1 config2 is ready so it locale can be changed
    if (!isInIframe()) {
      window.parent.postMessage(
        {
          module: 'config2ReadyToSetLocale',
        },
        '*'
      );
    }
  }

  componentWillUnmount() {
    removeEventListener('message', this.handleMessage);
  }

  handleMessage = ({ data: { message, locale } }) => {
    if (message === 'changeLocale' && locale) {
      this.changeLocale(locale);
    }
  };

  changeLocale = (locale) => {
    storage.setItem('locale', locale);
    this.props.changeLocale(locale);
  };

  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={translationMessagesList[this.props.locale]}>
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  changeLocale: PropTypes.func,
  children: PropTypes.element.isRequired,
};
