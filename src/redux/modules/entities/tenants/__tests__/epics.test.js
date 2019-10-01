import { ActionsObservable } from 'redux-observable';
import { fetchTenants } from '../epics';
import { mockStore } from '../../../../../utils/testUtils';
import { fetchData } from '../../';

import { sdkPromise, errorManager } from '../../../../../utils/sdk';
import { userHasPermissions } from '../../selectors';

jest.mock('../../../../../utils/sdk');
jest.mock('../../selectors');
jest.mock('../../../userData/selectors');

errorManager.mockReturnValue('mock error manager');

describe('fetchTenants', () => {
  let action;
  beforeEach(() => {
    sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
    action = ActionsObservable.of(fetchData('tenants'));
  });
  afterEach(() => {
    sdkPromise.mockClear();
  });

  describe('user has permission to fetch all tenants on the platform', () => {
    beforeAll(() => {
      userHasPermissions.mockReturnValue(true);
    });
    it('calls the sdk function to get all tenants on Platform', done => {
      fetchTenants(action, mockStore).subscribe(() => {
        expect(sdkPromise).toMatchSnapshot();
        done();
      });
    });
    it('returns FETCH_DATA_FULFILLED', done => {
      fetchTenants(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
  describe("user has only permission to fetch the tenant he's in", () => {
    beforeAll(() => {
      userHasPermissions.mockReturnValueOnce(false).mockReturnValue(true);
    });
    it('calls the sdk function to get info from the tenant the user is in', done => {
      fetchTenants(action, mockStore).subscribe(() => {
        expect(sdkPromise).toMatchSnapshot();
        done();
      });
    });
    it('returns FETCH_DATA_FULFILLED', done => {
      fetchTenants(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
  describe("user has no permission to fetch all tenants and to manage the tenant he's in", () => {
    beforeAll(() => {
      userHasPermissions.mockReturnValue(false);
    });
    it("returns FETCH_DATA_FULFILLED with the data as an empty array as the API result since it didn't make any API request", done => {
      fetchTenants(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
});
