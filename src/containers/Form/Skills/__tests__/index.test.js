/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import SkillsForm, { mapStateToProps } from '../';
import { getSelectedEntityId, isInherited, isCreating } from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isInherited.mockImplementation(() => false);
isCreating.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

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
