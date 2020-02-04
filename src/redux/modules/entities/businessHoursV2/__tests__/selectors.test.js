import { fromJS } from 'immutable';
import { selectBusinessHoursV2FormInitialValues, getBusinessHourV2Drafts } from '../selectors';

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
      active: true
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
