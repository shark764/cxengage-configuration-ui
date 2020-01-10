/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import ChatWidgetsForm, { mapStateToProps } from '../';

import {
  getSelectedEntityId,
  isSaving,
  isEntityFetching,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';
import {
  selectChatWidgetFormInitialValues,
  getDigitalChannelsAppIds,
  getDigitalChannelsApp,
  getDisplayStyleIsButton
} from '../../../../redux/modules/entities/chatWidgets/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntityId.mockReturnValue('mock-selected-entity-id');
isSaving.mockReturnValue('mock-is-saving');
isEntityFetching.mockReturnValue('mock-entity-is-fetching');
userHasUpdatePermission.mockReturnValue('mock-user-has-update-permission');

jest.mock('../../../../redux/modules/entities/chatWidgets/selectors');
selectChatWidgetFormInitialValues.mockReturnValue('mock-initial-values');
getDigitalChannelsAppIds.mockReturnValue('mock-app-ids');
getDigitalChannelsApp.mockReturnValue('mock-app');
getDisplayStyleIsButton.mockReturnValue('mock-is-button');

describe('ChatWidgets Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<ChatWidgetsForm store={store}>Child</ChatWidgetsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
