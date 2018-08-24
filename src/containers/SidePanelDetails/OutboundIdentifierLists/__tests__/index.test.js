/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { mapStateToProps } from '../';
import {
  getSelectedEntity,
  userHasUpdatePermission,
  getEntityListMembers
} from '../../../../redux/modules/entities/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(() => {});
userHasUpdatePermission.mockImplementation(() => true);
getEntityListMembers.mockImplementation(() => 'mockListMembers');

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
