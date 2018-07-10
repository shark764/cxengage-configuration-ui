import channel from '../channel';

describe('channel table column', () => {
  it('function returns correct object', () => {
    expect(channel()).toMatchSnapshot();
  });
  it('accessor returns the channel name', () => {
    expect(channel().accessor).toMatchSnapshot();
  });
  it('Cell returns the value wrapped in a span', () => {
    expect(channel().Cell({ value: 'mockValue' })).toMatchSnapshot();
  });
});
