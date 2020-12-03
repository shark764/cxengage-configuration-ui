/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createStore } from 'redux';
import { fromJS } from 'immutable';
import { IntlProvider } from 'react-intl';
import enUS from 'serenova-client-strings/config/en-US.json';
enUS['app.test.mockMessage'] = 'mock message'; // Mock message we can use in tests

export const mockStore = createStore(state => state);
export const supervisorToolbarMockStore = createStore(state =>
  fromJS({ SupervisorToolbar: {} })
);
export const getIntlContext = () => {
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intlProvider = new IntlProvider(
    { locale: 'en-US', messages: enUS },
    {}
  );
  const { intl } = intlProvider.getChildContext();
  return intl;
};