/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectWhatsappApps } from '../selectors';

jest.mock('../../selectors');
jest.mock('../../../form/selectors');

const initialState = fromJS({
  Entities: {
    whatsappApps: {
      data: [
        { id: 'mockId1', appId: 'mockAppId1', name: 'mockName1' },
        { id: 'mockId2', appId: 'mockAppId2', name: 'mockName2' },
      ],
    },
    whatsappIntegrations: {
      data: [{ id: 'mockId1', appId: 'mockAppId1', name: 'mockName1', clientDisconnectMinutes: 10 }],
    },
  },
});

describe('selectWhatsappApps', () => {
  it('Gets the correct IDPs', () => {
    expect(selectWhatsappApps(initialState)).toMatchSnapshot();
  });
  it('Does not get any IDPs from state', () => {
    expect(selectWhatsappApps(fromJS([]))).toMatchSnapshot();
  });
});
