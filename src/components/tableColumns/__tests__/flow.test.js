import flow from '../flow';

describe('flow table column', () => {
  it('function returns correct object', () => {
    expect(flow()).toMatchSnapshot();
  });
  it('accessor returns the flow name', () => {
    expect(flow().accessor).toMatchSnapshot();
  });
  it('Cell returns the value wrapped in a span', () => {
    expect(flow().Cell({ value: 'mockValue' })).toMatchSnapshot();
  });
});
