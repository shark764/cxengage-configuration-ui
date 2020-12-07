/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { fromJS } from 'immutable';
import { IntlProvider } from 'react-intl';
import { shallow } from 'enzyme';

export const mockStore = createStore(state => state);
export const supervisorToolbarMockStore = createStore(state =>
  fromJS({ SupervisorToolbar: {} })
);

// Construct a new `IntlProvider` instance by passing `props` and
// `context` as React would, then call `getChildContext()` to get the
// React Intl API, complete with the `format*()` functions.
const intlProvider = new IntlProvider(
  {locale: 'en'}, {}
);
const { intl } = intlProvider.getChildContext();

export const getIntlContext = () => {
  return intl;
};

// When using React-Intl `injectIntl` on components, props.intl is required.
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node) {
  return shallow(nodeWithIntlProp(node), { context: { intl } });
}