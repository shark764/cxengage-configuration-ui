import { ActionsObservable } from 'redux-observable';
import { mockStore } from '../../../../../utils/testUtils';
import { sdkPromise } from '../../../../../utils/sdk';
import { getCurrentEntity, getSelectedEntityId } from '../../../entities/selectors';
import { selectFacebookIntegrationsFormInitialValues } from '../../../entities/facebookIntegrations/selectors';
import {
  FetchSidePanelFacebookIntegrationData,
  FetchSidePanelFacebookIntegrationDataFulfilled
} from '../epics';

jest.mock('../../../../../utils/sdk');
sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));

jest.mock('../../../entities/facebookIntegrations/selectors');
selectFacebookIntegrationsFormInitialValues.mockReturnValue({ 'mock-initial-values': 'mock-value' });

jest.mock('../../../entities/selectors');
getCurrentEntity.mockReturnValue('facebookIntegrations');
getSelectedEntityId.mockReturnValue('mock-facebook-integration-id');

describe('facebookIntegrations epics', () => {
  it('FetchSidePanelFacebookIntegrationData', done => {
    const action = ActionsObservable.of({
      type: 'SET_SELECTED_ENTITY_ID'
    });
    FetchSidePanelFacebookIntegrationData(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });

  it('FetchSidePanelFacebookIntegrationDataFulfilled', done => {
    const action = ActionsObservable.of({
      type: 'SET_SELECTED_ENTITY_ID_FULFILLED',
      response: { result: 'results' }
    });
    FetchSidePanelFacebookIntegrationDataFulfilled(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
