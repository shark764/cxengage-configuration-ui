/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../utils/testUtils';
import SidePanelActions, { mapStateToProps, actions } from '../';

jest.mock('../../../redux/modules/entities/messageTemplates/selectors', () => ({
  isDisplayContentInHtml: () => true
}));

jest.mock('../../../redux/modules/entities');
jest.mock('../../../redux/modules/form/selectors', () => ({
  isFormInvalid: () => true,
  isFormPristine: () => false,
  isFormDirty: () => true
}));

jest.mock('../../../redux/modules/entities/selectors', () => ({
  isSaving: () => true,
  isBulkUpdating: () => true,
  getSelectedEntityFormId: () => 'mock selected entity form id',
  getSelectedEntity: () => 'mock selected entity',
  getSelectedEntityId: () => 'mock selected entity id',
  getSelectedEntityBulkChangeItems: () => 'mock bulk selected'
}));

describe('SidePanelActions Renders', () => {
  it('renders', () => {
    shallow(<SidePanelActions store={mockStore} />);
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
