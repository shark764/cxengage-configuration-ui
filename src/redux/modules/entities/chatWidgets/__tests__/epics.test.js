import { ActionsObservable } from 'redux-observable';
import { mockStore } from '../../../../../utils/testUtils';
import { sdkPromise } from '../../../../../utils/sdk';
import { getCurrentEntity, getSelectedEntityId } from '../../../entities/selectors';
import { selectFormInitialValues } from '../../../form/selectors';
import { FetchSidePanelChatWidgetData, FetchSidePanelChatWidgetDataFulfilled } from '../epics';

jest.mock('../../../../../utils/sdk');
sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));

jest.mock('../../../form/selectors');
selectFormInitialValues.mockReturnValue({ 'mock-initial-values': 'mock-value' });

jest.mock('../../../entities/selectors');
getCurrentEntity.mockReturnValue('chatWidgets');
getSelectedEntityId.mockReturnValue('mock-chat-widget-id');

describe('chatWidgets epics', () => {
  it('FetchSidePanelChatWidgetData', done => {
    const action = ActionsObservable.of({
      type: 'SET_SELECTED_ENTITY_ID'
    });
    FetchSidePanelChatWidgetData(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });

  it('FetchSidePanelChatWidgetDataFulfilled', done => {
    const action = ActionsObservable.of({
      type: 'SET_SELECTED_ENTITY_ID_FULFILLED',
      response: { result: 'results' }
    });
    FetchSidePanelChatWidgetDataFulfilled(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
