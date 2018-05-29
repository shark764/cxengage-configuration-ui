import startDateColumn, { helperFunctions } from '../startDate';
import { shallow } from 'enzyme';

describe('startDate Column configuration', () => {
  const columnConfigObject = startDateColumn(
    '2018-02-20T14:24:41.519Z',
    'mockTableType'
  );
  it('returns the proper object column configuration object', () => {
    expect(columnConfigObject).toMatchSnapshot();
  });
  it('accessor returns proper value', () => {
    expect(columnConfigObject.accessor('2018-02-20T14:24:41.519Z'));
  });
  it('Cell', () => {
    expect(columnConfigObject.Cell({ value: '2018-02-20T14:24:41.519Z' }));
  });
  describe('filterMethod', () => {
    it('returns true (all results) when date is zero or an empty string', () => {
      expect(
        columnConfigObject.filterMethod({
          value: 'After:0',
          id: '0000-0000-0000-0000'
        })
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod({
          value: 'After:',
          id: '0000-0000-0000-0000'
        })
      ).toEqual(true);
    });
    it('after a date filters correctly', () => {
      // time stamp example here is 1527130800
      expect(
        columnConfigObject.filterMethod(
          { value: 'After:05/24/2018', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': 1427130800 }
        )
      ).toEqual(false);
      expect(
        columnConfigObject.filterMethod(
          { value: 'After:05/24/2018', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': 1627130800 }
        )
      ).toEqual(true);
    });
    it('before a date filters correctly', () => {
      // time stamp example here is 1527130800
      expect(
        columnConfigObject.filterMethod(
          { value: 'Before:05/24/2018', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': 1427130800 }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'Before:05/24/2018', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': 1627130800 }
        )
      ).toEqual(false);
    });
  });
});

describe('startDate Filter renders properly', () => {
  const columnConfigObject = startDateColumn(
    '2018-02-20T14:24:41.519Z',
    'mockTableType'
  );
  it('renders the default filter', () => {
    const wrapper = shallow(
      columnConfigObject.Filter({ onChange: answerKey => ({ answerKey }) })
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the After filter', () => {
    const wrapper = shallow(
      columnConfigObject.Filter({
        filter: { value: 'After:0' },
        onChange: answerKey => ({ answerKey })
      })
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the Before filter', () => {
    const wrapper = shallow(
      columnConfigObject.Filter({
        filter: { value: 'Before:0' },
        onChange: answerKey => ({ answerKey })
      })
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('filterArray method, default filter', () => {
    const wrapper = shallow(
      columnConfigObject.Filter({ onChange: answerKey => ({ answerKey }) })
    );
    expect(
      wrapper.instance().changeAfterBefore({ target: { value: '05/24/2018' } })
    ).toEqual({ answerKey: '05/24/2018:' });
  });
  it('filterArray method, custom filter', () => {
    const wrapper = shallow(
      columnConfigObject.Filter({
        filter: { value: 'Before:8' },
        onChange: answerKey => ({ answerKey })
      })
    );
    expect(
      wrapper.instance().changeAfterBefore({ target: { value: '05/24/2018' } })
    ).toEqual({ answerKey: '05/24/2018:8' });
  });
  it('beforeOrAfterOnChange method', () => {
    const wrapper = shallow(
      columnConfigObject.Filter({
        filter: { value: 'After:0' },
        onChange: answerKey => ({ answerKey })
      })
    );
    expect(
      wrapper.instance().changeAfterBefore({ target: { value: '05/24/2018' } })
    ).toEqual({ answerKey: '05/24/2018:0' });
  });
  it('inputOnChange method', () => {
    const wrapper = shallow(
      columnConfigObject.Filter({
        filter: { value: 'After:0' },
        onChange: answerKey => ({ answerKey })
      })
    );
    expect(
      wrapper.instance().changeDateInput({ target: { value: 'newValue' } })
    ).toEqual({ answerKey: 'After:newValue' });
  });
});
