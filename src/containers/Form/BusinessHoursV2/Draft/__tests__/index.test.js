import React from 'react';
import { createStore } from 'redux';
import { Map } from 'immutable';
import { shallow } from 'enzyme';

import DraftForm, { mapStateToProps, mapDispatchToProps } from '../';

import {
  isSubEntitySaving,
  isInherited,
  userHasUpdatePermission
} from '../../../../../redux/modules/entities/selectors';
import { selectTimezonesDropDownList } from '../../../../../redux/modules/entities/timezones/selectors';
import {
  isPublishingDraft,
  selectBusinessHoursV2DraftFormInitalValues
} from '../../../../../redux/modules/entities/businessHoursV2/selectors';

jest.mock('../../../../../redux/modules/entities/selectors');
jest.mock('../../../../../redux/modules/entities/timezones/selectors');
jest.mock('../../../../../redux/modules/entities/businessHoursV2/selectors');

isSubEntitySaving.mockReturnValue(false);
isInherited.mockReturnValue(false);
userHasUpdatePermission.mockReturnValue(true);

selectTimezonesDropDownList.mockReturnValue([
  {
    value: 'timezone1',
    label: 'timezone 1'
  },
  {
    value: 'timezone2',
    label: 'Timezone 2'
  }
]);

isPublishingDraft.mockReturnValue(false);
selectBusinessHoursV2DraftFormInitalValues.mockReturnValue(
  Map({
    created: new Date('1995-12-17'),
    updated: new Date('1995-12-17')
  })
);

describe('DraftForm renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<DraftForm store={store}>Child</DraftForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  it('maps the dispatch to the props correctly', () => {
    expect(mapDispatchToProps()).toMatchSnapshot();
  });
});
