import { fromJS } from 'immutable';
import { selectBusinessHoursV2FormInitialValues, selectBusinessHoursEntityVersions } from '../selectors';

import { selectFormInitialValues } from '../../../form/selectors';
import { getSelectedEntity } from '../../selectors';

jest.mock('../../../form/selectors');
jest.mock('../../selectors');

describe('selectBusinessHoursV2FormInitialValues', () => {
  it('Return initial form values when creating a new entity', () => {
    getSelectedEntity.mockImplementation(() => {});
    expect(selectBusinessHoursV2FormInitialValues()).toMatchSnapshot();
  });
  it('Return initial form values when updating an entity', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      versions: []
    });
    getSelectedEntity.mockImplementation(() => initialState);
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(selectBusinessHoursV2FormInitialValues()).toMatchSnapshot();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe('selectBusinessHoursEntityVersions', () => {
  it('Return a empty array if the businessHour has no versions', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      versions: []
    });
    expect(selectBusinessHoursEntityVersions(initialState)).toMatchSnapshot();
  });
  it('Return an array if the businessHour has versions', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      versions: [{ name: 'name-1', id: 'id-1' }]
    });
    expect(selectBusinessHoursEntityVersions(initialState)).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
});
