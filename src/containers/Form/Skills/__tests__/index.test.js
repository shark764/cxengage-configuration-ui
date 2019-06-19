/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { Map } from 'immutable';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import SkillsForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues, getCurrentFormValueByFieldName } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isInherited.mockImplementation(() => false);
getCurrentFormValueByFieldName.mockImplementation(() => true);
isCreating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(
  () =>
    new Map({
      id: 'mockId',
      name: 'mockName',
      active: true,
      hasProficiency: false
    })
);

describe('Skills Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<SkillsForm store={store}>Child</SkillsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
