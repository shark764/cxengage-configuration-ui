/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import {
  getCurrentForm,
  selectFormInitialValues,
  getCurrentFormValueByFieldName
} from '../../../../redux/modules/form/selectors';
import DataAccessReportsForm, { mapStateToProps } from '../';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import {
  selectDashboards
  // selectStandardDashboards
} from '../../../../redux/modules/entities/dashboards/selectors';
import { selectHistoricalReportFolders } from '../../../../redux/modules/entities/historicalReportFolders/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));
getCurrentFormValueByFieldName.mockImplementation(() => 'realtime');

jest.mock('../../../../redux/modules/entities/dashboards/selectors');
selectDashboards.mockImplementation(() => ['mockName', 'mockName1', 'mockName2']);
// selectStandardDashboards.mockImplementation(() => ['mockName', 'mockName1', 'mockName2']);
jest.mock('../../../../redux/modules/entities/historicalReportFolders/selectors');
selectHistoricalReportFolders.mockImplementation(() => [{ name: 'mockName' }]);

describe('DataAccessReports Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<DataAccessReportsForm store={store}>Child</DataAccessReportsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
