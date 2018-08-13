/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { mapStateToProps, createFormName, formSubmission } from '../';
import {
  getSelectedEntityId,
  isCreating
} from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';
import { selectFlowIds } from '../../../../redux/modules/entities/flows/selectors';

jest.mock('../../../../redux/modules/entities/flows/selectors');
jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => false);
selectFormInitialValues.mockImplementation(() => ({ active: true }));
selectFlowIds.mockImplementation(() => [
  { value: 'mockValue', label: 'mockLabel' }
]);

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('createFormName', () => {
  it('returns proper values', () => {
    expect(createFormName()).toMatchSnapshot();
  });
});

describe('formSubmission', () => {
  const values = {
    name: 'mockName',
    value: 'mockValue',
    channelType: 'mockChannel',
    desciption: 'mockDescription'
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
