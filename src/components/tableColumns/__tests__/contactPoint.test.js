import contactPoint from '../contactPoint';

describe('contactPoint table column', () => {
  it('function returns correct object', () => {
    expect(contactPoint()).toMatchSnapshot();
  });
  it('accessor returns the contactPoint name', () => {
    expect(contactPoint().accessor).toMatchSnapshot();
  });
  it('Cell returns the value wrapped in a span', () => {
    expect(contactPoint().Cell({ value: 'mockValue' })).toMatchSnapshot();
  });
});
