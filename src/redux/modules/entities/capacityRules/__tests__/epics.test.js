import { ActionsObservable } from 'redux-observable';
import { Map } from 'immutable';

import { FetchVersions, UpdateCapacityRule, CreateSubEntity } from '../epics';
import { mockStore } from '../../../../../utils/testUtils';
import { sdkPromise, errorManager } from '../../../../../utils/sdk';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntity } from '../../selectors';
import { selectCapacityRuleVersions } from '../selectors';

jest.mock('../../selectors');
jest.mock('../selectors');
jest.mock('../../../../../utils/sdk');

errorManager.mockReturnValue('Error message');

describe('FetchVersions', () => {
  let action;
  beforeAll(() => {
    action = ActionsObservable.of({
      type: 'SET_SELECTED_ENTITY_ID',
      entityId: 'capacity-rule-id',
    });

    sdkPromise.mockReturnValueOnce(new Promise((resolve, reject) => reject('Error'))).mockResolvedValue({
      result: {
        id: 'mock-id',
      },
    });
    getCurrentEntity.mockReturnValue('capacityRules');
  });

  afterAll(() => {
    sdkPromise.mockReset();
    getCurrentEntity.mockReset();
  });

  describe('Fetches versions of a selected capacity rule', () => {
    it("API call errors and and action that gets ignored by the store it's returned", (done) => {
      FetchVersions(action, mockStore).subscribe((actualOutputActions) => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
    it("Versions are fecthed correctly and FETCH_CAPACITY_RULE_VERSIONS it's emitted", (done) => {
      FetchVersions(action, mockStore).subscribe((actualOutputActions) => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
});

describe('UpdateCapacityRule', () => {
  beforeAll(() => {
    sdkPromise.mockReturnValueOnce(new Promise((resolve, reject) => reject('Error'))).mockResolvedValue({
      result: {
        id: 'mock-id',
      },
    });
  });

  afterAll(() => {
    sdkPromise.mockReset();
  });

  describe('a capacity rule its being updated', () => {
    it("API call to update a capacity rule fails and UPDATE_ENTITY_REJECTED it's emitted", (done) => {
      const action = ActionsObservable.of({
        type: 'UPDATE_ENTITY',
        entityId: 'capacity-rule-id',
        entityName: 'capacityRules',
        values: {
          name: 'test',
        },
      });
      UpdateCapacityRule(action, mockStore).subscribe((actualOutputActions) => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
    it("API call to update a capacity rule it's succesfull and the name of the capacity rule gets updated", (done) => {
      const action = ActionsObservable.of({
        type: 'UPDATE_ENTITY',
        entityId: 'capacity-rule-id',
        entityName: 'capacityRules',
        values: {
          name: 'test',
        },
      });
      UpdateCapacityRule(action, mockStore).subscribe((actualOutputActions) => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
    it("API call to update a capacity rule it's succesfull and the name and activeVersion of the capacity rule gets updated", (done) => {
      const action = ActionsObservable.of({
        type: 'UPDATE_ENTITY',
        entityId: 'capacity-rule-id',
        entityName: 'capacityRules',
        values: {
          name: 'test',
          activeVersion: 'active-version-id',
        },
      });
      UpdateCapacityRule(action, mockStore).subscribe((actualOutputActions) => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
});

describe('CreateSubEntity', () => {
  let action;
  beforeAll(() => {
    sdkPromise.mockReturnValueOnce(new Promise((resolve, reject) => reject('Error'))).mockResolvedValue({
      result: {
        id: 'mock-id',
        version: 'capacity-rule-version-id',
      },
    });
    getCurrentEntity.mockReturnValue('capacityRules');
    getSelectedEntityId.mockReturnValue('mock-id');
    getSelectedEntity.mockReturnValue(
      Map({
        name: 'capacity rule name',
      })
    );
    selectCapacityRuleVersions.mockReturnValueOnce(['hey']).mockReturnValue([]);
  });

  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'CREATE_SUB_ENTITY',
      values: {
        name: 'test',
        quantifier: 'all',
        rule: {
          voice: true,
          groups: [
            {
              channels: ['email', 'messaging'],
              interactions: 3,
            },
            {
              channels: ['work-item'],
              interactions: 4,
            },
          ],
        },
        rules: [
          {
            channels: ['voice'],
            max: 1,
            weight: 100,
          },
          {
            channels: ['email'],
            max: 4,
            weight: 100,
          },
          {
            channels: ['messaging'],
            max: 5,
            weight: 20,
          },
        ],
      },
    });
  });

  afterAll(() => {
    sdkPromise.mockReset();
    getCurrentEntity.mockReset();
    getSelectedEntityId.mockReset();
    getSelectedEntity.mockReset();
    selectCapacityRuleVersions.mockReset();
  });

  describe('a version its being created', () => {
    it("API call to create a new capacity rule version fails and CREATE_SUB_ENTITY_REJECTED it's emitted", (done) => {
      CreateSubEntity(action, mockStore).subscribe((actualOutputActions) => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });

    it("API call to create a capacity rule version it's succesfull", (done) => {
      CreateSubEntity(action, mockStore).subscribe((actualOutputActions) => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });

    it("API call to create the capacity rule it's made and succesfull and the current version being created it's set as the active version", (done) => {
      CreateSubEntity(action, mockStore).subscribe((actualOutputActions) => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
});
