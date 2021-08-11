import startTimeColumn from '../startTime';
import { shallow } from 'enzyme';

const FUTURE_DATE_IN_SECONDS = 16271308000; // Monday, August 13, 2485
const PAST_DATE_IN_SECONDS = 1427130800; // Monday, March 23, 2015

describe('startTimeColumn configuration object', () => {
  const columnConfigObject = startTimeColumn('2018-02-20T14:24:41.519Z', 'mockTableType', true);
  const columnConfigObjectTwentyFourHourFormat = startTimeColumn('2018-02-20T14:24:41.519Z', 'mockTableType', false);
  it('returns the proper object column configuration object', () => {
    expect(columnConfigObject).toMatchSnapshot();
  });
  it('accessor returns proper value', () => {
    expect(columnConfigObject.accessor('2018-02-20T14:24:41.519Z'));
  });
  it('Cell', () => {
    expect(columnConfigObject.Cell({ value: '2018-02-20T14:24:41.519Z' })).toMatchSnapshot();
    expect(
      columnConfigObjectTwentyFourHourFormat.Cell({
        value: '2018-02-20T14:24:41.519Z',
      })
    ).toMatchSnapshot();
  });
  describe('filterMethod', () => {
    // time stamp example is 1527130800
    it('returns true (all results) when input field does not contain proper input', () => {
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-0-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-0:00-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-0:0-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-00:0-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-:00-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-00:-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-00-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(true);
    });
    it('after: date filters correctly', () => {
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-00:00-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-00:00-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': PAST_DATE_IN_SECONDS }
        )
      ).toEqual(false);
    });
    it('before: time filters correctly', () => {
      expect(
        columnConfigObject.filterMethod(
          { value: 'Before-00:00-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': PAST_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'Before-00:00-AM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(false);
    });
    it('after: date filters correctly: PM', () => {
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-00:00-PM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'After-00:00-PM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': PAST_DATE_IN_SECONDS }
        )
      ).toEqual(false);
    });
    it('before: time filters correctly: PM', () => {
      expect(
        columnConfigObject.filterMethod(
          { value: 'Before-00:00-PM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': PAST_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'Before-00:00-PM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(false);
    });
    it('time is NaN , default it to 00:00', () => {
      expect(
        columnConfigObject.filterMethod(
          { value: 'Before-NaN:NaN-PM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': PAST_DATE_IN_SECONDS }
        )
      ).toEqual(true);
    });
    it('time filters correctly with a non zero value', () => {
      expect(
        columnConfigObject.filterMethod(
          { value: 'Before-01:00-PM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': PAST_DATE_IN_SECONDS }
        )
      ).toEqual(true);
      expect(
        columnConfigObject.filterMethod(
          { value: 'Before-01:00-PM', id: '0000-0000-0000-0000' },
          { '0000-0000-0000-0000': FUTURE_DATE_IN_SECONDS }
        )
      ).toEqual(false);
    });
  });
});

describe('startTimeColumn Filter', () => {
  describe('renders properly', () => {
    it('tweleve hour format , with default filter', () => {
      const columnConfigObject = startTimeColumn('2018-02-20T14:24:41.519Z', 'mockTableType', true);
      const wrapper = shallow(columnConfigObject.Filter({ onChange: (answerKey) => answerKey }));
      expect(wrapper).toMatchSnapshot();
    });
    it('tweleve hour format , with no filter', () => {
      const columnConfigObject = startTimeColumn('2018-02-20T14:24:41.519Z', 'mockTableType', true);
      const wrapper = shallow(columnConfigObject.Filter({ onChange: (answerKey) => answerKey }));
      expect(wrapper).toMatchSnapshot();
    });
    it('tweleve hour format , with filter', () => {
      const columnConfigObject = startTimeColumn('2018-02-20T14:24:41.519Z', 'mockTableType', true);
      const wrapper = shallow(
        columnConfigObject.Filter({
          filter: { value: 'Before-12:12-PM' },
          onChange: (answerKey) => answerKey,
        })
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('24 hour format, with default filter', () => {
      const columnConfigObject = startTimeColumn('2018-02-20T14:24:41.519Z', 'mockTableType', false);
      const wrapper = shallow(columnConfigObject.Filter({ onChange: (answerKey) => answerKey }));
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('filter components methods', () => {
    const columnConfigObject = startTimeColumn('2018-02-20T14:24:41.519Z', 'mockTableType', false);
    const wrapper = shallow(
      columnConfigObject.Filter({
        filter: { value: 'Before-12:12-PM' },
        onChange: (answerKey) => answerKey,
      })
    );
    const wrapperNoFilter = shallow(columnConfigObject.Filter({ onChange: (answerKey) => answerKey }));
    it('filterArray , with no filter', () => {
      expect(wrapper.instance().filterArray()).toEqual(['Before', '12:12', 'PM']);
    });
    it('filterArray , with default filter', () => {
      expect(wrapperNoFilter.instance().filterArray()).toEqual(['After', '00:00', 'AM']);
    });
    it('afterBeforeOnchange', () => {
      expect(wrapper.instance().afterBeforeOnchange({ target: { value: 'newValue' } })).toEqual('newValue-12:12-PM');
    });
    it('timeInputOnchange', () => {
      expect(wrapper.instance().timeInputOnchange({ target: { value: 'newValue' } })).toEqual('Before-newValue-PM');
    });
    it('amPmOnChange', () => {
      expect(wrapper.instance().amPmOnChange({ target: { value: 'newValue' } })).toEqual('Before-12:12-newValue');
    });
  });
});
