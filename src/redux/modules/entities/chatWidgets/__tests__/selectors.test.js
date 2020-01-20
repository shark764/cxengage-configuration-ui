import { fromJS } from 'immutable';

import {
  selectChatWidgetFormInitialValues,
  getDigitalChannelsAppIds,
  getDigitalChannelsApp,
  getDisplayStyleIsButton
} from '../selectors';

import { getSelectedEntity } from '../../selectors';
import { selectFormInitialValues, getCurrentFormValueByFieldName } from '../../../form/selectors';

jest.mock('../../selectors');
getSelectedEntity.mockImplementation(() => fromJS({ appId: 'mock-app-id' }));

jest.mock('../../../form/selectors');
selectFormInitialValues.mockImplementation(() => 'mock form inital values');
getCurrentFormValueByFieldName.mockImplementation(() => 'button');

describe('selectChatWidgetFormInitialValues', () => {
  it('returns selectFormInitialValues for updates', () => {
    expect(selectChatWidgetFormInitialValues()).toEqual('mock form inital values');
  });
  describe('create', () => {
    beforeEach(() => {
      getSelectedEntity.mockReturnValueOnce(undefined);
    });
    it('returns initial values', () => {
      expect(selectChatWidgetFormInitialValues()).toMatchSnapshot();
    });
  });
});

describe('getDigitalChannelsAppIds', () => {
  it('maps digital channels to id and name', () => {
    const state = fromJS({
      Entities: { digitalChannelsApps: { data: [{ name: 'mock-name', id: 'mock-app-id', foo: 'bar' }] } }
    });
    expect(getDigitalChannelsAppIds(state)).toMatchSnapshot();
  });
  it('maps digital channels when at least one is available for assignment', () => {
    const state = fromJS({
      Entities: {
        digitalChannelsApps: {
          data: [
            { name: 'mock-name', id: 'mock-app-id', foo: 'bar' },
            { name: 'mock-name-2', id: 'mock-app-id-2', foo: 'bar' },
            { name: 'mock-name-3', id: 'mock-app-id-3', foo: 'bar' }
          ]
        },
        chatWidgets: { data: [{ appId: 'mock-app-id' }, { appId: 'mock-app-id-2' }] }
      }
    });
    expect(getDigitalChannelsAppIds(state)).toMatchSnapshot();
  });
  it('returns empty map when there is no app available for assignment', () => {
    const state = fromJS({
      Entities: {
        digitalChannelsApps: { data: [{ name: 'mock-name', id: 'mock-app-id', foo: 'bar' }] },
        chatWidgets: { data: [{ appId: 'mock-app-id' }] }
      }
    });
    expect(getDigitalChannelsAppIds(state)).toMatchSnapshot();
  });
});

describe('getDigitalChannelsApp', () => {
  it('gets the app of the selected chat widget', () => {
    const state = fromJS({
      Entities: { digitalChannelsApps: { data: [{ name: 'mock-name', id: 'mock-app-id', foo: 'bar' }] } }
    });
    expect(getDigitalChannelsApp(state)).toMatchSnapshot();
  });
});

describe('getDisplayStyleIsButton', () => {
  it('returns true when display style is button', () => {
    expect(getDisplayStyleIsButton()).toBe(true);
  });
});
