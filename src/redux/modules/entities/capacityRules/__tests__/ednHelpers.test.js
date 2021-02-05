import { ednRuleToImmutable, jsRuletoEdn } from '../ednHelpers';

describe('ednRuleToImmutable', () => {
  it('parse a edn string rule with no voice value to an immutablejs object', () => {
    expect(ednRuleToImmutable('{[:sms :email] 2 [:work-item] 5}')).toMatchSnapshot();
  });

  it('parse a edn string rule with only voice value to an immutablejs object', () => {
    expect(ednRuleToImmutable('{[:voice] 1}')).toMatchSnapshot();
  });

  it('parse a edn string rule with voice and other several channels value to an immutablejs object', () => {
    expect(ednRuleToImmutable('{[:voice] 1 [:sms :email] 2 [:work-item] 5}')).toMatchSnapshot();
  });
});

describe('jsRuletoEdn', () => {
  it('parse a javascript rule with a false voice value to an edn string', () => {
    expect(
      jsRuletoEdn({
        voice: false,
        groups: [
          {
            channels: ['sms', 'email'],
            interactions: 2,
          },
          {
            channels: ['work-item'],
            intreactions: 4,
          },
        ],
      })
    ).toMatchSnapshot();
  });

  it('parse a javascript rule with a true voice value to a edn string', () => {
    expect(
      jsRuletoEdn({
        voice: true,
        groups: [],
      })
    ).toMatchSnapshot();
  });

  it('parse a edn string rule with voice and other several channels value to an immutablejs object', () => {
    expect(
      jsRuletoEdn({
        voice: true,
        groups: [
          {
            channels: ['sms', 'email'],
            interactions: 2,
          },
          {
            channels: ['work-item'],
            intreactions: 4,
          },
        ],
      })
    ).toMatchSnapshot();
  });
});
