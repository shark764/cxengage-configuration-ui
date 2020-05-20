import { ActionsObservable } from 'redux-observable';
import { createBusinessHour, createDraft, fetchActiveVersion, fetchVersionsAndDrafts } from '../epics';
import { mockStore } from '../../../../../utils/testUtils';

import { sdkPromise } from '../../../../../utils/sdk';

import { getCurrentEntity } from '../../selectors';
import { getAllEntities } from '../../../../../containers/EntityTable/selectors';

jest.mock('../../selectors');
jest.mock('../../../../../containers/EntityTable/selectors');
jest.mock('../../../../../utils/sdk');

describe('createBusinessHour', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'CREATE_ENTITY',
      entityName: 'businessHoursV2'
    });
    sdkPromise.mockReturnValue(
      new Promise(resolve =>
        resolve({
          result: {
            id: 'mock-id'
          }
        })
      )
    );
  });

  afterAll(() => {
    sdkPromise.mockReset();
  });

  describe("The new entity being created is a businessHour's V2 one", () => {
    it('returns CREATE_ENTITY_FULFILLED and CREATE_DRAFT_BUSINESS_HOURS_V2', done => {
      createBusinessHour(action).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
});

describe('createDraft', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'CREATE_DRAFT_BUSINESS_HOURS_V2',
      businessHourId: 'mock-id',
      values: {
        draftName: 'mock-name'
      }
    });
    sdkPromise.mockReturnValue(
      new Promise(resolve =>
        resolve({
          result: {
            id: 'version-id'
          }
        })
      )
    );
  });

  afterAll(() => {
    sdkPromise.mockReset();
  });

  describe('The business hour draft is created and saved to the redux state', () => {
    it('returns CREATE_DRAFT_BUSINESS_HOURS_V2_FULFILLED', done => {
      createDraft(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
});

describe('fetchActiveVersion', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'FETCH_DATA_FULFILLED',
      entityName: 'businessHoursV2'
    });
    sdkPromise
      .mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            result: {
              id: 'business-hour1-active-version'
            }
          })
        )
      )
      .mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            result: {
              id: 'business-hour2-active-version'
            }
          })
        )
      )
      .mockReturnValueOnce(new Promise((resolve, reject) => reject('Error')))
      .mockReturnValue(
        new Promise(resolve =>
          resolve({
            result: {
              id: 'business-hour-active-version'
            }
          })
        )
      );
    getCurrentEntity.mockReturnValue('businessHoursV2');
    getAllEntities.mockReturnValue([
      {
        id: 'business-hour-1',
        activeVersion: 'business-hour1-active-version'
      },
      {
        id: 'business-hour-2',
        activeVersion: 'business-hour2-active-version'
      },
      {
        id: 'business-hour-3'
      },
      {
        id: 'business-hour-4',
        activeVersion: 'business-hour4-active-version'
      }
    ]);
  });

  describe('Fetches active version for all business hours that have one', () => {
    it('returns FETCH_ACTIVE_VERSION_BUSINESS_HOUR_FULFILLED', done => {
      fetchActiveVersion(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  afterAll(() => {
    sdkPromise.mockReset();
    getCurrentEntity.mockReset();
    getAllEntities.mockReset();
  });
});

describe('fetchVersionsAndDrafts', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'SET_SELECTED_ENTITY_ID',
      entityName: 'businessHoursV2',
      entityId: 'business-hour1-versions'
    });
    sdkPromise
      .mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            result: {
              id: 'business-hour1-versions',
              businessHourId: 'business-hour-1'
            }
          })
        )
      )
      .mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            result: {
              id: 'business-hour1-draft',
              businessHourId: 'business-hour-1'
            }
          })
        )
      );
    getCurrentEntity.mockReturnValue('businessHoursV2');
    getAllEntities.mockReturnValue([
      {
        id: 'business-hour1-versions',
        versions: [
          {
            id: '1',
            name: 'version-1'
          },
          {
            id: '2',
            name: 'version-2'
          }
        ]
      }
    ]);
  });

  describe('Fetches versions and drafts for selected business hours', () => {
    it('returns SET_BUSINESS_HOUR_VERSIONS_AND_DRAFTS', done => {
      fetchVersionsAndDrafts(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  afterAll(() => {
    sdkPromise.mockReset();
    getCurrentEntity.mockReset();
  });
});
