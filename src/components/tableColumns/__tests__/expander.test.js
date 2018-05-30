import expanderColumn from '../expander';

describe('Expander Column', () => {
  it('returns the proper exapnder column configuration object', () => {
    expect(expanderColumn()).toMatchSnapshot();
  });
  it('calling the expander column Expander method returns the correct jsx when expanded', () => {
    const expanderColum = expanderColumn();
    expect(expanderColum.Expander({ isExpanded: true })).toMatchSnapshot();
  });
  it('calling the expander column Expander method returns the correct jsx when NOT expanded', () => {
    const expanderColum = expanderColumn();
    expect(expanderColum.Expander({ isExpanded: false })).toMatchSnapshot();
  });
});
