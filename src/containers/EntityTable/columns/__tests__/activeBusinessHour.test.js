import { activeBusinessHourColumn } from '../activeBusinessHour';

describe('activeBusinessHourColumn', () => {
  it('is configured correctly', () => {
    expect(activeBusinessHourColumn).toMatchSnapshot();
  });
  describe('accessor', () => {
    it("returns a version name when there's an active version and it's found on the versions list", () => {
      expect(
        activeBusinessHourColumn.accessor({
          activeVersion: 'active-version',
          versions: [
            {
              id: 'active-version',
              name: 'Active Version'
            }
          ]
        })
      ).toEqual('Active Version');
    });
    it('returns nothing when there\'s no "active version"', () => {
      expect(activeBusinessHourColumn.accessor({})).toBeFalsy();
    });
    it("returns nothing when active version doesn't match any value on the versions list", () => {
      expect(
        activeBusinessHourColumn.accessor({
          activeVersion: 'active-version',
          versions: [
            {
              id: 'no-active-version',
              name: 'No Active Version'
            }
          ]
        })
      ).toBeFalsy();
    });
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(activeBusinessHourColumn.Cell({ value: 'Active Version' })).toMatchSnapshot();
    });
  });
});
