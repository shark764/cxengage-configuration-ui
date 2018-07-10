import presence from '../presence';

describe('presence table column', () => {
  it('function returns correct object', () => {
    expect(presence()).toMatchSnapshot();
  });
  it('accessor returns the presence name', () => {
    expect(presence().accessor).toMatchSnapshot();
  });
  it('Cell returns the value wrapped in a span', () => {
    expect(presence().Cell({ value: 'mockValue' })).toMatchSnapshot();
  });
});
