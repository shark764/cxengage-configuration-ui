import { fromJS } from 'immutable';
import {
  selectCapacityRulesFormInitialValues,
  getCapacityRulesSelector,
  selectCapacityRuleVersions,
  selectCapacityRuleVersionFormInitialValues,
} from '../selectors';

import { selectFormInitialValues } from '../../../form/selectors';
import { getSelectedEntity, getSelectedSubEntity } from '../../selectors';

jest.mock('../../../form/selectors');
jest.mock('../../selectors');
jest.mock('serenova-js-utils/uuid');
jest.mock('../../../userData/selectors');

describe('selectCapacityRulesFormInitialValues', () => {
  it('Return initial form values when creating a new entity', () => {
    getSelectedEntity.mockImplementation(() => {});
    expect(selectCapacityRulesFormInitialValues()).toMatchSnapshot();
  });
  it('Return initial form values when updating an entity', () => {
    const initialState = fromJS({
      name: '',
      activeVersion: 'activeVersionMockId',
      id: 'mockId',
      ruleSet: '{[:voice] 1 [:email :messaging] 2}',
    });
    getSelectedEntity.mockImplementation(() => initialState);
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(selectCapacityRulesFormInitialValues()).toMatchSnapshot();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe('getCapacityRulesSelector', () => {
  it('gets the capacity rules of a user', () => {
    const state = fromJS({
      Entities: {
        capacityRules: {
          data: [
            {
              name: 'mockName1',
              active: true,
              activeVersion: 'mockActiveVersion',
              id: 'mockId',
              activeRule: {
                name: 'v1',
                version: 'mockVersion',
                ruleSet: '{[:voice] 1 [:email :messaging] 2}',
              },
            },
          ],
        },
      },
    });
    expect(getCapacityRulesSelector(state)).toMatchSnapshot();
  });
});

describe('selectCapacityRuleVersions', () => {
  it('Return empty array if the capacity rules has no versions', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      name: 'mockName',
      versions: undefined,
    });
    getSelectedEntity.mockImplementation(() => initialState);
    expect(selectCapacityRuleVersions(initialState)).toMatchSnapshot();
  });
  it('Return an array if the capacity rules has versions', () => {
    const initialState = fromJS({
      id: 'mockId1',
      name: 'mockName',
      numericOrderVersion: 'v1',
      versions: [
        {
          id: 'mockId1',
          capacityRuleId: 'capacityRuleId1',
          numericOrderVersion: 'v1',
          name: 'c1',
          ruleSet: '{[:voice] 1 [:email :messaging] 4}',
        },
        {
          id: 'mockId2',
          capacityRuleId: 'capacityRuleId2',
          numericOrderVersion: 'v1',
          name: 'c2',
          ruleSet: '{[:voice] 1 [:email :messaging] 2}',
        },
      ],
    });
    getSelectedEntity.mockImplementation(() => initialState);
    expect(selectCapacityRuleVersions(initialState)).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
});

describe('selectCapacityRuleVersionFormInitialValues', () => {
  it('Return initial form values when creating a new version', () => {
    getSelectedEntity.mockImplementation(() => {});
    expect(selectCapacityRuleVersionFormInitialValues()).toMatchSnapshot();
  });
  it('Return initial form values when updating a version', () => {
    const initialState = fromJS({
      name: '',
      activeVersion: 'activeVersionMockId',
      id: 'mockId',
      ruleSet: '{[:voice] 1 [:email :messaging] 2}',
    });
    getSelectedSubEntity.mockImplementation(() => initialState);
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(selectCapacityRuleVersionFormInitialValues()).toMatchSnapshot();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
