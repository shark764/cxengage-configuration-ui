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
