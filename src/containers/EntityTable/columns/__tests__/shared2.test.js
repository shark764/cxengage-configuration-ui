import { sharedColumn2 } from '../shared2';
import { currentTenantId } from '../../../../redux/modules/userData/selectors';

jest.mock('../../../../redux/modules/userData/selectors');
currentTenantId.mockReturnValue('tenant-1');

describe('sharedColumn2', () => {
  it('is configured correctly', () => {
    expect(sharedColumn2).toMatchSnapshot();
  });
  describe('accessor', () => {
    it('returns "Inherited" when it\'s an inherited business hours', () => {
      expect(sharedColumn2.accessor({ tenantId: 'tenant-2', shared: false })).toEqual('Inherited');
    });
    it('returns "No" when it isn\'t an inherited business hour and it isn\'t shared', () => {
      expect(sharedColumn2.accessor({ tenantId: 'tenant-1', shared: false })).toEqual('No');
    });
    it('returns "Yes" when it isn\'t an inherited business hour but it\'s shared one', () => {
      expect(sharedColumn2.accessor({ tenantId: 'tenant-1', shared: true })).toEqual('Yes');
    });
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(sharedColumn2.Cell({ value: 'Inherited' })).toMatchSnapshot();
    });
  });
  describe('filterMethod', () => {
    it('returns true when filter is "all"', () => {
      expect(sharedColumn2.filterMethod({ value: 'all' })).toBe(true);
    });
    it('compares filter id to "Yes" when filter value is "yes"', () => {
      expect(sharedColumn2.filterMethod({ value: 'yes', id: 'shared' }, { shared: 'Yes' })).toBe(true);
      expect(sharedColumn2.filterMethod({ value: 'yes', id: 'shared' }, { shared: 'No' })).toBe(false);
    });
    it('compares filter id to "No" when filter value is "no"', () => {
      expect(sharedColumn2.filterMethod({ value: 'no', id: 'shared' }, { shared: 'No' })).toBe(true);
      expect(sharedColumn2.filterMethod({ value: 'no', id: 'shared' }, { shared: 'Yes' })).toBe(false);
    });
  });
});
