/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from 'TestUtils';
import SidePanelActions, { mapStateToProps, actions } from '../';

jest.mock('../../../redux/modules/entities');
jest.mock('../../../redux/modules/form/selectors', () => ({
  isFormInvalid: () => true,
  isFormPristine: () => false
}));

jest.mock('../../../redux/modules/entities/selectors', () => ({
  isSaving: () => true,
  getSelectedEntityFormId: () => 'mock selected entity form id'
}));

describe('SidePanelActions Renders', () => {
  it('renders', () => {
    shallow(
      <SidePanelActions
        store={mockStore}
      />
    );
  });
});

describe('mapStateToProps', () => {
  it('maps the selectors to the object correctly', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('actions', () => {
  it('maps the redux actions to the object correctly', () => {
    expect(actions).toMatchSnapshot();
  });
});