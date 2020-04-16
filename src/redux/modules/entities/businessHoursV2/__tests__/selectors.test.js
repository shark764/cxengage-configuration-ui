import { fromJS } from 'immutable';
import {
  selectBusinessHoursV2FormInitialValues,
  getBusinessHourV2Drafts,
  selectBusinessHoursEntityVersions,
  selectBusinessHoursRules
} from '../selectors';

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

describe('getBusinessHourV2Drafts', () => {
  it('Return a empty array if the businessHour has no drafts', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true
    });
    expect(getBusinessHourV2Drafts.resultFunc(initialState)).toMatchSnapshot();
  });
  it("Return a empty array if the drafts attribute on the businessHours it's not a list", () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      drafts: 'bad-value'
    });
    expect(getBusinessHourV2Drafts.resultFunc(initialState)).toMatchSnapshot();
  });
  it("Return drafts array if the businessHour has a draft attribute and it's a list", () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      drafts: [
        {
          name: 'name-1',
          id: 'mock-id-1'
        },
        {
          name: 'name-2',
          id: 'mock-id-2'
        }
      ]
    });
    expect(getBusinessHourV2Drafts.resultFunc(initialState)).toMatchSnapshot();
  });

  beforeEach(() => {
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

describe('selectBusinessHoursRules', () => {
  it('Return a empty array if the version has no rules', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      versions: [{ name: 'name-1', id: 'id-1', rules: [] }]
    });
    expect(selectBusinessHoursRules(initialState)).toMatchSnapshot();
  });
  it('Return an array if the version has rules', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      versions: [{ name: 'name-1', id: 'id-1', rules: [{ id: 'id-1' }] }]
    });
    expect(selectBusinessHoursRules(initialState)).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
});
