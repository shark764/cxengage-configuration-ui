import { ActionsObservable } from 'redux-observable';
import { createDraftAfterCreatingBusinessHour, handleFullFilledDraftCreation } from '../epics';
import { mockStore } from '../../../../../utils/testUtils';

import { getCurrentEntity, getSelectedEntityId } from '../../selectors';

jest.mock('../../selectors');

describe('createDraftAfterCreatingBusinessHour', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'CREATE_ENTITY_FULFILLED'
    });
  });

  describe("The new entity created is a businessHour's V2 one", () => {
    beforeAll(() => {
      getCurrentEntity.mockReturnValue('businessHoursV2');
      getSelectedEntityId.mockReturnValue('mock-id');
    });
    it('returns CREATE_SUB_ENTIITY', done => {
      createDraftAfterCreatingBusinessHour(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
});

describe('handleFullFilledDraftCreation', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'CREATE_SUB_ENTITY_FULFILLED',
      response: {
        result: {
          id: 'sub-entity-mock-id'
        }
      }
    });
  });

  describe("The new sub-entity created is a businessHour's V2 draft one", () => {
    beforeAll(() => {
      getCurrentEntity.mockReturnValue('businessHoursV2');
      getSelectedEntityId.mockReturnValue('mock-id');
    });
    it('returns SET_SELECTED_SUB_ENTITY_ID', done => {
      handleFullFilledDraftCreation(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
});
