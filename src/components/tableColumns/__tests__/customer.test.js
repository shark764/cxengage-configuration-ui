import customer from '../customer';

describe('customer table column', () => {
  it('function returns correct object', () => {
    expect(customer()).toMatchSnapshot();
  });
  it('accessor returns the customer name', () => {
    expect(customer().accessor).toMatchSnapshot();
  });
  it('Cell returns the value wrapped in a span', () => {
    expect(customer().Cell({ value: 'mockValue' })).toMatchSnapshot();
  });
});
