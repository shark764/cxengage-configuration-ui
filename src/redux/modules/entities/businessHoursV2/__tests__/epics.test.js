import { ActionsObservable } from 'redux-observable';
import { Map, List } from 'immutable';
import 'rxjs/add/operator/take';

import {
  createBusinessHour,
  createDraft,
  fetchActiveVersion,
  fetchVersionsAndDrafts,
  UpdateDraft,
  toggleBusinessHoursV2Entity,
  PublishDraft,
  SaveDraftBeforePublish,
  changeIntervalsHours,
  unselectBusinessHourVersion,
  selectBusinessHourVersionWhenUpdated,
  updateBusinessHourV2,
  RemoveBusinessHoursDraft,
  FetchActualTenantInfo
} from '../epics';
import { mockStore } from '../../../../../utils/testUtils';

import { sdkPromise } from '../../../../../utils/sdk';

import {
  getCurrentEntity,
  getSelectedEntity,
  getCurrentSubEntity,
  getSelectedEntityId,
  getSelectedSubEntityId,
  getSelectedEntityStatus,
  getSelectedSubEntity
} from '../../selectors';
import { getAllEntities } from '../../../../../containers/EntityTable/selectors';
import { getFormValues } from '../../../form/selectors';
import { currentTenantId } from '../../../userData/selectors';

jest.mock('../../selectors');
jest.mock('../../../../../containers/EntityTable/selectors');
jest.mock('../../../../../utils/sdk');
jest.mock('../../../form/selectors');
jest.mock('../../../userData/selectors');

// This doesn't feel the right way to do this but it's the only way to make the snapshots to be consistent regardless of timezone
jest.mock('moment', () => {
  const moment = jest.requireActual('moment');
  const mockedMoment = () => moment.utc('2018-05-24');
  mockedMoment.utc = () => ({
    ...mockedMoment,
    format: () => '2018-05-24T00:00:00Z'
  });
  mockedMoment.defineLocale = () => {};
  mockedMoment.locale = () => {};

  return mockedMoment;
});

describe('createBusinessHour', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'CREATE_ENTITY',
      entityName: 'businessHoursV2'
    });
    sdkPromise.mockResolvedValue({
      result: {
        id: 'mock-id'
      }
    });
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
  beforeEach(() => {
    sdkPromise.mockResolvedValue({
      result: {
        id: 'version-id'
      }
    });
  });

  afterAll(() => {
    sdkPromise.mockReset();
  });

  describe('The business hour draft is created with all its values and saved to the redux state', () => {
    const action = ActionsObservable.of({
      type: 'CREATE_DRAFT_BUSINESS_HOURS_V2',
      businessHourId: 'mock-id',
      values: {
        draftName: 'mock-name',
        description: 'description',
        timezone: 'timezone',
        rules: []
      }
    });
    it('returns CREATE_DRAFT_BUSINESS_HOURS_V2_FULFILLED', done => {
      createDraft(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  describe('The business hour draft is created with missing values and saved to the redux state', () => {
    const action = ActionsObservable.of({
      type: 'CREATE_DRAFT_BUSINESS_HOURS_V2',
      businessHourId: 'mock-id',
      values: {
        draftName: 'mock-name',
        rules: [
          {
            name: 'a rule'
          }
        ]
      }
    });
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
    beforeAll(() => {
      sdkPromise.mockResolvedValue({
        result: 'mock-value'
      });
    });

    it('returns SET_BUSINESS_HOUR_VERSIONS_AND_DRAFTS', done => {
      fetchVersionsAndDrafts(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Fetches versions and drafts for selected business hours but only fetches versions correctly', () => {
    beforeAll(() => {
      sdkPromise
        .mockResolvedValueOnce({
          result: 'mock-value'
        })
        .mockRejectedValueOnce("Couldn't fetch drafts for selected business hour");
    });
    it('it returns SET_BUSINESS_HOUR_VERSIONS_AND_DRAFTS only with versions and FETCH_DRAFTS_BUSINESS_HOURS_REJECTED', done => {
      fetchVersionsAndDrafts(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Fetches versions and drafts for selected business hours that also has an activeVersion', () => {
    beforeAll(() => {
      sdkPromise.mockResolvedValue({
        result: 'mock-value'
      });
      getSelectedEntity.mockReturnValue(
        Map({
          id: 'business-hour-id',
          activeVersion: 'business-hour-active-version'
        })
      );
    });
    it('it returns SET_BUSINESS_HOUR_VERSIONS_AND_DRAFTS and SET_SELECTED_BUSINESS_HOUR_VERSION', done => {
      fetchVersionsAndDrafts(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Fetches versions and drafts for selected business but both requests fail', () => {
    beforeAll(() => {
      sdkPromise.mockRejectedValue('error');
    });
    it('it returns FETCH_DRAFTS_BUSINESS_HOURS_REJECTED and FETCH_VERSIONS_BUSINESS_HOURS_REJECTED', done => {
      fetchVersionsAndDrafts(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  afterAll(() => {
    getAllEntities.mockReset();
    getCurrentEntity.mockReset();
  });

  afterEach(() => {
    sdkPromise.mockReset();
  });
});

describe('UpdateDraft', () => {
  const draftFormValuesMock = {
    name: 'draft name',
    description: 'a draft description',
    timezone: 'Americas/El_Salvador'
  };

  const rulesFormValuesMock = List([
    {
      name:
        'Super long name test Super long name test Super long name test (should display ellipsis) Super long name test',
      id: '123',
      type: 'regular-hours',
      startDate: '2020-01-16T00:00:00Z',
      endDate: '2020-01-30T00:00:00Z',
      repeats: 'monthly',
      hours: {
        allDay: false,
        intervals: [
          {
            start: 300,
            end: 1310
          },
          {
            start: 0,
            end: 260
          }
        ]
      },
      on: {
        type: 'day',
        value: 2
      }
    },
    {
      name: 'rule 2',
      id: '456',
      type: 'one-time-extended-times',
      startDate: '2020-01-16T00:00:00Z',
      hours: {
        allDay: true
      }
    }
  ]);

  const getFormValuesMockImplementation = (state, formName) =>
    formName === 'draft:edit' ? draftFormValuesMock : rulesFormValuesMock;

  beforeAll(() => {
    getSelectedSubEntityId.mockReturnValue('draft-id');
    getCurrentEntity.mockReturnValue('businessHoursV2');
    getCurrentSubEntity.mockReturnValue('drafts');
    getSelectedEntityId.mockReturnValue('business-hour-v2-id');
    sdkPromise.mockReturnValue(
      new Promise(resolve =>
        resolve({
          result: 'updated-draft'
        })
      )
    );
    getFormValues.mockImplementation(getFormValuesMockImplementation);
  });

  let action;

  describe('Updates a draft only sending the draft form values', () => {
    it('updates the draft taking into account the rules form values and emits UPDATE_SUB_ENTITY_FULFILLED', done => {
      action = ActionsObservable.of({
        type: 'UPDATE_SUB_ENTITY',
        values: draftFormValuesMock
      });
      UpdateDraft(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Updates a draft only sending the rules form values', () => {
    it('updates the draft taking into account the draft form values and emits UPDATE_SUB_ENTITY_FULFILLED', done => {
      action = ActionsObservable.of({
        type: 'UPDATE_SUB_ENTITY',
        values: {
          rules: rulesFormValuesMock.toJS()
        }
      });
      UpdateDraft(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Updates a draft only sending the rules form values as an empty array', () => {
    it('updates the draft taking into account the draft form values and sending the rules attribute as null and emits UPDATE_SUB_ENTITY_FULFILLED', done => {
      action = ActionsObservable.of({
        type: 'UPDATE_SUB_ENTITY',
        values: {
          rules: []
        }
      });
      UpdateDraft(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  afterAll(() => {
    getSelectedSubEntityId.mockReset();
    getCurrentEntity.mockReset();
    getCurrentSubEntity.mockReset();
    getSelectedEntityId.mockReset();
    sdkPromise.mockReset();
    getFormValues.mockReset();
  });
});

describe('toggleBusinessHoursV2Entity', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'TOGGLE_ENTITY'
    });
  });

  beforeAll(() => {
    getSelectedEntityStatus.mockReturnValue(true).mockReturnValueOnce(false);
    getCurrentEntity.mockReturnValue('businessHoursV2');
    getSelectedEntityId.mockReturnValue('business-hours-v2-id');
    sdkPromise.mockResolvedValue({
      result: 'updated-draft'
    });
  });

  describe("When toggling a business hour that's not active", () => {
    it("it's set to active and emits TOGGLE_ENTITY_FULFILLED", done => {
      toggleBusinessHoursV2Entity(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  describe("When toggling a business hour that's active", () => {
    it("it's set to not active and emits TOGGLE_ENTITY_FULFILLED", done => {
      toggleBusinessHoursV2Entity(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  afterAll(() => {
    getSelectedEntityStatus.mockReset();
    getCurrentEntity.mockReset();
    getSelectedEntityId.mockReset();
    sdkPromise.mockReset();
  });
});

describe('PublishDraft', () => {
  let action;
  beforeAll(() => {
    getSelectedEntityId.mockReturnValue('business-hour-id');
    getSelectedSubEntity.mockReturnValue(
      Map({
        name: 'draft name',
        rules: []
      })
    );
    getSelectedSubEntityId.mockReturnValue('draft-id');
    sdkPromise.mockResolvedValue({
      result: {
        id: 'version-id'
      }
    });
  });

  describe('An initial draft is being published', () => {
    it('a new version is created emiting PUBLISH_BUSINESS_HOURS_V2_DRAFT_FULFILLED and the business hour the draft belongs to is updated, setting the new version as its active version and activating it by emitting UPDATE_ENTITY with the needed values', done => {
      action = ActionsObservable.of({
        type: 'PUBLISH_BUSINESS_HOURS_V2_DRAFT',
        values: Map({
          versionName: 'Initial draft',
          makeActive: true,
          isInitialDraft: true
        })
      });
      PublishDraft(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  describe('An draft is being published ', () => {
    it('a new version is created emiting PUBLISH_BUSINESS_HOURS_V2_DRAFT_FULFILLED and it will be set as the active version of the business hour it belongs to, emitting UPDATE_ENTITY with the needed values too', done => {
      action = ActionsObservable.of({
        type: 'PUBLISH_BUSINESS_HOURS_V2_DRAFT',
        values: Map({
          versionName: 'Initial draft',
          makeActive: true
        })
      });
      PublishDraft(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  describe('An draft is being published ', () => {
    it("a new version is created emiting PUBLISH_BUSINESS_HOURS_V2_DRAFT_FULFILLED but it won't be set as the activeVersion of the business hour it belongs to", done => {
      action = ActionsObservable.of({
        type: 'PUBLISH_BUSINESS_HOURS_V2_DRAFT',
        values: Map({
          versionName: 'Initial draft'
        })
      });
      PublishDraft(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });

  afterAll(() => {
    getSelectedEntityId.mockReset();
    getSelectedSubEntity.mockReset();
    getSelectedSubEntityId.mockReset();
    sdkPromise.mockReset();
  });
});

describe('SaveDraftBeforePublish', () => {
  it('emits the draft form submission action, waits for the draft to be updated and then emits PUBLISH_BUSINESS_HOURS_V2_DRAFT', done => {
    const action$ = ActionsObservable.from([
      {
        type: 'SAVE_BEFORE_PUBLISH_BUSINESS_HOURS_V2_DRAFT',
        values: Map({
          draftName: 'draftName',
          makeActive: false,
          isInitialDraft: false
        })
      },
      {
        type: 'UPDATE_SUB_ENTITY_FULFILLED'
      }
    ]);
    SaveDraftBeforePublish(action$).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });

  // For some reason this unit test does not generate the complete snapshot, leaving it in here si somewhere down the line it works fine
  it("emits the draft form submission action, but the update fails so PUBLISH_BUSINESS_HOURS_V2_DRAFT_REJECTED it's emitted", done => {
    const action$ = ActionsObservable.from([
      {
        type: 'SAVE_BEFORE_PUBLISH_BUSINESS_HOURS_V2_DRAFT',
        values: Map({
          draftName: 'draftName',
          makeActive: false,
          isInitialDraft: false
        })
      },
      {
        type: 'UPDATE_SUB_ENTITY_REJECTED'
      }
    ]);
    SaveDraftBeforePublish(action$).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('changeIntervalsHours', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'businessHoursV2:rules',
        field: 'rules[1]'
      },
      payload: {
        hours: {
          allDay: false,
          intervals: [
            {
              start: 510,
              end: 960
            },
            {
              start: 620,
              end: 0
            }
          ]
        }
      }
    });
  });
  it('When changing and end time interval to 12:00 AM it should emit a redux-form field change action for the rule so instead of setting 0 as minute on day for the end time interval, sets 1440', done => {
    changeIntervalsHours(action).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('unselectBusinessHourVersion', () => {
  let action;
  beforeAll(() => {
    getCurrentEntity.mockReturnValue('businessHoursV2');
  });
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'SET_SELECTED_ENTITY_ID'
    });
  });
  it('when unselecting a business hours it also set the selected version as null', done => {
    unselectBusinessHourVersion(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('selectBusinessHourVersionWhenUpdated', () => {
  it("when a business hour it's updated and it has an active version, set that active version as the selected active version", done => {
    const action = ActionsObservable.of({
      type: 'UPDATE_ENTITY_FULFILLED',
      response: {
        result: {
          activeVersion: 'active-version-id'
        }
      },
      entityName: 'businessHoursV2'
    });
    selectBusinessHourVersionWhenUpdated(action).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('updateBusinessHourV2', () => {
  beforeAll(() => {
    sdkPromise.mockResolvedValue('mocked-response');
  });

  it('when updating a business hour succesfully it should emit UPDATE_ENTITY_FULFILLED', done => {
    const action = ActionsObservable.of({
      type: 'UPDATE_ENTITY',
      entityName: 'businessHoursV2',
      entityId: 'business-hour-id',
      values: {
        name: 'business hours name',
        activeVersion: 'version-id'
      }
    });
    updateBusinessHourV2(action).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });

  afterAll(() => {
    sdkPromise.mockReset();
  });
});

describe('RemoveBusinessHoursDraft', () => {
  beforeAll(() => {
    sdkPromise.mockResolvedValue('mocked-response');
    getCurrentEntity.mockReturnValue('businessHoursV2');
    getSelectedEntityId.mockReturnValue('business-hours-id');
  });

  it('when succesfully removing a dratf it emits REMOVE_LIST_ITEM_FULFILLED', done => {
    const action = ActionsObservable.of({
      type: 'REMOVE_LIST_ITEM',
      listItemId: 'draft-id'
    });
    RemoveBusinessHoursDraft(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });

  afterAll(() => {
    sdkPromise.mockReset();
    getCurrentEntity.mockReset();
    getSelectedEntityId.mockReset();
  });
});

describe('FetchActualTenantInfo', () => {
  beforeAll(() => {
    getCurrentEntity.mockReturnValue('businessHoursV2');
    currentTenantId.mockReturnValue('mockTenantId');
  });

  it('when creating a new draft, it emits an action to fetch actual tenant info', done => {
    const action = ActionsObservable.of({
      type: 'CREATE_DRAFT_BUSINESS_HOURS_V2'
    });
    FetchActualTenantInfo(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });

  it('when selecting a draft, it emits an action to fetch actual tenant info', done => {
    const action = ActionsObservable.of({
      type: 'CREATE_DRAFT_BUSINESS_HOURS_V2'
    });
    FetchActualTenantInfo(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });

  afterAll(() => {
    getCurrentEntity.mockReset();
    currentTenantId.mockReset();
  });
});
