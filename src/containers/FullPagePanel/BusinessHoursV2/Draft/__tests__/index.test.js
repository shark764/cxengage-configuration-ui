import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import DraftFullPagePanel, { mapStateToProps, actions } from '../';

import { getFormValues } from '../../../../../redux/modules/form/selectors';
import { isSubEntitySaving, userHasUpdatePermission } from '../../../../../redux/modules/entities/selectors';
import {
  draftFormsAreDirty,
  draftFormsAreInvalid,
  shouldPublishDraft,
  selectBusinessHoursEntityVersions,
  isPublishingDraft
} from '../../../../../redux/modules/entities/businessHoursV2/selectors';

jest.mock('../../../../../redux/modules/entities/selectors');
jest.mock('../../../../../redux/modules/entities/businessHoursV2/selectors');
jest.mock('../../../../../redux/modules/form/selectors');

isSubEntitySaving.mockReturnValue(false);
userHasUpdatePermission.mockReturnValue(true);
draftFormsAreDirty.mockReturnValue(true);
draftFormsAreInvalid.mockReturnValue(false);
shouldPublishDraft.mockReturnValue(true);
selectBusinessHoursEntityVersions.mockReturnValue([
  {
    name: 'Version 1'
  },
  {
    name: 'version 2'
  }
]);
isPublishingDraft.mockReturnValue(false);
getFormValues.mockImplementation(
  (state, formName) =>
    formName === 'draft:edit'
      ? 'draftName'
      : List([
          {
            id: 'rule-id-1',
            name: 'rule name',
            type: 'regular-hours',
            startDate: new Date('1995-12-17'),
            repeats: 'weekly',
            every: 1,
            on: ['monday', 'wednesday', 'friday'],
            hours: {
              allDay: true
            }
          },
          {
            id: 'rule-id-2',
            name: 'rule name 2',
            type: 'blackout-exceptions',
            startDate: new Date('1995-12-17'),
            endDate: new Date('2000-12-17'),
            repeats: 'monthy',
            every: 1,
            on: {
              type: 'last',
              value: 'sunday'
            },
            hours: {
              allDay: false,
              intervals: [
                {
                  start: 540,
                  end: 1020
                }
              ]
            }
          }
        ])
);

describe('DraftFullPagePanel', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<DraftFullPagePanel store={store}>Child</DraftFullPagePanel>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('Actions', () => {
  it('map properly', () => {
    expect(actions).toMatchSnapshot();
  });
});
