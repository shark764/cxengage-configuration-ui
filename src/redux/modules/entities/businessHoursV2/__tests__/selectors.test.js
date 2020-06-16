import { fromJS, Map } from 'immutable';
import {
  selectBusinessHoursV2FormInitialValues,
  selectBusinessHoursEntityVersions,
  selectBusinessHoursV2Data,
  getSelectedBusinessHourV2Version,
  panelHeaderBusinessHoursV2,
  selectBusinessHoursV2RulesFormInitalValues,
  selectBusinessHoursV2DraftFormInitalValues,
  selectDrafts,
  selectRules
} from '../selectors';

import { selectFormInitialValues } from '../../../form/selectors';
import { getSelectedEntity, getSelectedSubEntity, getEntityData, sidePanelHeader } from '../../selectors';
import { getCurrentTenantId, getCurrentTenantTimezone } from '../../../userData/selectors';
import { generateUUID } from 'serenova-js-utils/uuid'

jest.mock('../../../form/selectors');
jest.mock('../../selectors');
jest.mock('serenova-js-utils/uuid');
jest.mock('../../../userData/selectors');

describe('selectBusinessHoursV2FormInitialValues', () => {
  it('Return initial form values when creating a new entity', () => {
    getSelectedEntity.mockImplementation(() => {});
    expect(selectBusinessHoursV2FormInitialValues()).toMatchSnapshot();
  });
  it('Return initial form values when updating an entity', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      versions: []
    });
    getSelectedEntity.mockImplementation(() => initialState);
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(selectBusinessHoursV2FormInitialValues()).toMatchSnapshot();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe('getSelectedBusinessHourV2Version', () => {
  it('gets the selected version id of the business hour', () => {
    const state = fromJS({
      Entities: { businessHoursV2: { selectedVersion: 'version-id' } }
    });
    expect(getSelectedBusinessHourV2Version(state)).toMatchSnapshot();
  });
});

describe('selectBusinessHoursV2Data', () => {
  it('gets the list of business hour of the current tenant', () => {
    getCurrentTenantId.mockReturnValue('mockTenantId');
    getEntityData.mockReturnValue(fromJS([
      {
        tenantId: 'mockTenantId'
      },
      {
        tenantId: 'anotherTenantMockId'
      },
      {
        tenantId: 'mockTenantId'
      }
    ]));
    expect(selectBusinessHoursV2Data()).toMatchSnapshot();
  });

  afterEach(() => {
    getEntityData.mockReset();
    getCurrentTenantId.mockReset();
  })
});

describe('selectBusinessHoursEntityVersions', () => {
  it('Return undefined if the businessHour has no versions', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      items: [{ name: 'name-1', id: 'id-1', rules: null }],
      versions: undefined
    });
    getSelectedEntity.mockImplementation(() => initialState);
    expect(selectBusinessHoursEntityVersions(initialState)).toMatchSnapshot();
  });
  it('Return an array if the businessHour has versions', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true,
      versions: [
        { 
          name: 'name-1', 
          id: 'id-1', 
          rules: [
            { 
              name: 'rule-01', 
              id: '01' 
            }
          ]
        }
      ]
    });
    getSelectedEntity.mockImplementation(() => initialState);
    expect(selectBusinessHoursEntityVersions(initialState)).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
});

describe('panelHeaderBusinessHoursV2', () => {
  it('Returns panelHeaderBusinessHoursV2 business hours panel information', () => {
    const initialState = fromJS({
      title: "Business Hours Title",
      createdAt: "Created on Apr 6, 2020 7:48 AM",
      toggleStatus: true
    });
    sidePanelHeader.mockImplementation(() => initialState);
    expect(panelHeaderBusinessHoursV2()).toMatchSnapshot();
  });
  it('Returns panelHeaderBusinessHoursV2 selected subentity name', () => {
    const initialState = new Map({ 
      name: "Sub Entity Name"
    })
    getSelectedEntity.mockImplementation(() => initialState);
    getSelectedSubEntity.mockImplementation(() => initialState);
    expect(panelHeaderBusinessHoursV2(initialState)).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
});

describe('selectBusinessHoursV2RulesFormInitalValues', () => {
  const mockDate = new Date('2019-01-01T18:00:00')
  const RealDate = Date;
  it('Return initial form values when creating a new rule', () => {
    const state = new Map({
      Entities: { businessHoursV2: { selectedVersion: undefined } }
    });
    getSelectedSubEntity.mockReturnValue(Map({ }));
    expect(selectBusinessHoursV2RulesFormInitalValues(state)).toMatchSnapshot();
  });
  it('Return initial form values when updating a rule', () => {
    const state = fromJS({
      Entities: { businessHoursV2: { selectedVersion: 'version-id' } }
    });
    getSelectedEntity.mockReturnValue(
      fromJS({
        versions: [{ name: 'name-1', id: 'version-id', rules: [{ name: 'rule-01', id: '01' }] }]
      })
    );
    expect(selectBusinessHoursV2RulesFormInitalValues(state)).toMatchSnapshot();
  });

  beforeEach(() => {
    global.Date = class extends Date {
      constructor () {
        super()
        return mockDate
      }
    }
    jest.resetAllMocks();
  });
  afterEach(() => {
    global.Date = RealDate;
  });
});

describe('selectBusinessHoursV2DraftFormInitalValues', () => {
  it('Return initial form values when updating a draft', () => {
    getSelectedSubEntity.mockReturnValue(fromJS({
      name: 'draft-01',
      timezone: 'draft-timezone-01',
      description: 'draft-description-01',
      created: '2014-04-23T18:25:43.511Z',
      updated: '2014-04-23T18:25:43.511Z'
  }))
    expect(selectBusinessHoursV2DraftFormInitalValues()).toMatchSnapshot();
  });
  it('Return initial form values when creating a new draft', () => {
    getCurrentTenantTimezone.mockReturnValue(fromJS("Etc/GMT+12"))
    expect(selectBusinessHoursV2DraftFormInitalValues({})).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
});

describe('selectDrafts', () => {
  it('Return an array of the selected businessHour active version drafts', () => {
    getSelectedEntity.mockImplementation(() => initialState);
    const initialState = fromJS({
      id: 'mockId',
      version: 'Draft',
      name: 'draft-name',
      shared: false,
      active: true,
      items: [{ name: 'name-1', id: 'id-1', rules: [{ name: 'draft-rule-01', id: '01' }] }]
    });
    expect(selectDrafts(initialState)).toMatchSnapshot();
  });
  it('Return undefined of the selected businessHour active version without drafts', () => {
    getSelectedEntity.mockImplementation(() => initialState);
    const initialState = fromJS({
      id: 'mockId',
      version: 'Draft',
      name: 'draft-name',
      shared: false,
      active: true,
      items: undefined
    });
    expect(selectDrafts(initialState)).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
});

describe('selectRules', () => {
  it('Return an array of the selected businessHour active version rules', () => {
    const initialState = fromJS({
      rules: [
        { 
          name: 'rule-01', 
          id: generateUUID.mockReturnValue('rule-id'),
          startDate: '2012-04-23T18:25:43.511Z'
        }
      ]
    });
    getSelectedSubEntity.mockImplementation(() => initialState);
    expect(selectRules(initialState)).toMatchSnapshot();
  });
  it('Returns array of selected version of businessHour', () => {
    getSelectedEntity.mockReturnValue(fromJS({
      versions : [
      {
        id: 'mock-id',
        rules: [
          {
           id: generateUUID.mockReturnValue('rule-id'),
           name: 'selected-rule-name',
           startDate: '2012-04-23T18:25:43.511Z'
          }
        ]
      }
    ]
  }))
    const initialState = fromJS({
      Entities: {
        businessHoursV2: {
          selectedVersion: 'mock-id'
        }
      }
    });
    expect(selectRules(initialState)).toMatchSnapshot();
  });
  it('Returns undefined if no active or selected version of businessHour', () => {
    const initialState = fromJS({
      Entities: {
        businessHoursV2: {
          selectedVersion: undefined
        }
      }
    });
    getSelectedEntity.mockImplementation(() => initialState);
    expect(selectRules(initialState)).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
});

