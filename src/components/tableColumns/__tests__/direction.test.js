import direction from '../direction';

describe('direction table column', () => {
  it('function returns correct object', () => {
    expect(direction('All', 'mockTable')).toMatchSnapshot();
  });
});

describe('direction table filter method', () => {
  it('fitler value all returns true', () => {
    expect(
      direction('All', 'mockTable').filterMethod({ value: 'All' }, {})
    ).toEqual(true);
  });
  it('filter value Inbound returns rows matching inbound ', () => {
    expect(
      direction('Inbound', 'mockTable').filterMethod(
        { value: 'Inbound', id: 'inbound' },
        { inbound: 'inbound' }
      )
    ).toEqual(true);
  });
  it("filter value Inbound doesn't match rows matching outbound ", () => {
    expect(
      direction('Inbound', 'mockTable').filterMethod(
        { value: 'Inbound', id: 'inbound' },
        { outbound: 'outbound' }
      )
    ).toEqual(false);
  });
  it('filter value Outbound returns rows matching outbound ', () => {
    expect(
      direction('Outbound', 'mockTable').filterMethod(
        { value: 'Outbound', id: 'outbound' },
        { outbound: 'outbound' }
      )
    ).toEqual(true);
  });
  it("filter value Outbound doesn't match rows matching inbound ", () => {
    expect(
      direction('Outbound', 'mockTable').filterMethod(
        { value: 'Outbound', id: 'outbound' },
        { inbound: 'inbound' }
      )
    ).toEqual(false);
  });
});

describe('direction Filter method returns the filter menu', () => {
  it('returns the proper component', () => {
    expect(
      direction('All', 'mockTable').Filter(() => {}, 'mockTable')
    ).toMatchSnapshot();
  });
});
