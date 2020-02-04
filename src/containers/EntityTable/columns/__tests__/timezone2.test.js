import { timezoneColumn2 } from '../timezone2';

describe('timezoneColumn2', () => {
  it('is configured correctly', () => {
    expect(timezoneColumn2).toMatchSnapshot();
  });
  describe('accessor', () => {
    it("returns a version timezone when there's an active version and it's found on the versions list", () => {
      expect(
        timezoneColumn2.accessor({
          activeVersion: 'active-version',
          versions: [
            {
              id: 'active-version',
              timezone: 'Timezone 1'
            }
          ]
        })
      ).toEqual('Timezone 1');
    });
    it('returns nothing when there\'s no "active version"', () => {
      expect(timezoneColumn2.accessor({})).toBeFalsy();
    });
    it("returns nothing when active version doesn't match any value on the versions list", () => {
      expect(
        timezoneColumn2.accessor({
          activeVersion: 'active-version',
          versions: [
            {
              id: 'no-active-version',
              timezone: 'Timezone 2'
            }
          ]
        })
      ).toBeFalsy();
    });
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(timezoneColumn2.Cell({ value: 'Timezone 1' })).toMatchSnapshot();
    });
  });
});
