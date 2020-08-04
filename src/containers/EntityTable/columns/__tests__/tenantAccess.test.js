import { tenantAccessColumn } from '../tenantAccess';
import { currentTenantId } from '../../../../redux/modules/userData/selectors';

jest.mock('../../../../redux/modules/userData/selectors');
currentTenantId.mockReturnValue('tenant-1');

describe('tenantAccessColumn', () => {
  it('is configured correctly', () => {
    expect(tenantAccessColumn).toMatchSnapshot();
  });
  describe('accessor', () => {
    it('returns "enabled" when invitationStatus has been accepted', () => {
      expect(tenantAccessColumn.accessor({ invitationStatus: 'enabled' })).toEqual('Enabled');
    });
    it('returns "disabled" when invitationStatus is disabled', () => {
      expect(tenantAccessColumn.accessor({ invitationStatus: 'disabled' })).toEqual('Disabled');
    });
    it('returns "invited" when invitationStatus is sent', () => {
      expect(tenantAccessColumn.accessor({ invitationStatus: 'invited' })).toEqual('Invited');
    });
    it('returns "pending" when invitationStatus is pending of confirmation', () => {
      expect(tenantAccessColumn.accessor({ invitationStatus: 'pending' })).toEqual('Pending');
    });
    it('returns "expired" when invitationStatus has reach expire time', () => {
      expect(tenantAccessColumn.accessor({ invitationStatus: 'expired' })).toEqual('Expired');
    });
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(tenantAccessColumn.Cell({ value: 'enabled', row: { invitationStatus: 'enabled' } })).toMatchSnapshot();
    });
  });
  describe('filterMethod', () => {
    it('returns true when filter is "all"', () => {
      expect(tenantAccessColumn.filterMethod({ value: 'all' })).toBe(true);
    });
    it('compares filter id to "Enabled" when filter value is "enabled"', () => {
      expect(
        tenantAccessColumn.filterMethod({ value: 'Enabled', id: 'invitationStatus' }, { invitationStatus: 'Enabled' })
      ).toBe(true);
      expect(
        tenantAccessColumn.filterMethod({ value: 'Enabled', id: 'invitationStatus' }, { invitationStatus: 'Disabled' })
      ).toBe(false);
    });
    it('compares filter id to "Disabled" when filter value is "disabled"', () => {
      expect(
        tenantAccessColumn.filterMethod({ value: 'Disabled', id: 'invitationStatus' }, { invitationStatus: 'Disabled' })
      ).toBe(true);
      expect(
        tenantAccessColumn.filterMethod({ value: 'Disabled', id: 'invitationStatus' }, { invitationStatus: 'Enabled' })
      ).toBe(false);
    });
    it('compares filter id to "Pending" when filter value is "pending"', () => {
      expect(
        tenantAccessColumn.filterMethod({ value: 'Pending', id: 'invitationStatus' }, { invitationStatus: 'Pending' })
      ).toBe(true);
      expect(
        tenantAccessColumn.filterMethod({ value: 'Pending', id: 'invitationStatus' }, { invitationStatus: 'Expired' })
      ).toBe(false);
    });
  });
});
