import React from 'react';
import { createStore } from 'redux';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import {
  selectBusinessHoursV2RulesFormInitalValues,
  selectRulesFormDisabled,
  selectRulesFormViewMode
} from '../../../../../redux/modules/entities/businessHoursV2/selectors';

import { userHasUpdatePermission } from '../../../../../redux/modules/entities/selectors';

import BusinessHoursV2RulesForm, { mapStateToProps } from '../';

jest.mock('redux-form/immutable', () => ({
  ...jest.requireActual('redux-form/immutable'),
  isDirty: () => () => true,
  isValid: () => () => true
}));

jest.mock('../../../../../redux/modules/entities/businessHoursV2/selectors');
jest.mock('../../../../../redux/modules/entities/selectors');

selectBusinessHoursV2RulesFormInitalValues.mockReturnValue(
  fromJS({
    rules: [
      {
        name: 'rule 1'
      },
      {
        name: 'rule 2'
      }
    ]
  })
);
selectRulesFormDisabled.mockReturnValue(false);
selectRulesFormViewMode.mockReturnValue(false);

userHasUpdatePermission.mockReturnValue(true);

describe('BusinessHoursV2RulesForm', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<BusinessHoursV2RulesForm store={store}>Child</BusinessHoursV2RulesForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
