import elapsedTimeColumn, { helperFunctions } from '../elapsedTime';
import { shallow } from 'enzyme';

describe('ElapsedTime column', () => {
  const columnConfigObject = elapsedTimeColumn(300000, 'mockTableType');
  it('returns the proper object column configuration object', () => {
    expect(columnConfigObject).toMatchSnapshot();
  });
  it('calling the columns accessor method results in proper response or object', () => {
    expect(
      columnConfigObject.accessor({ currentStateDuration: 300000 })
    ).toEqual(300);
  });
  it('calling the columns Cell method results in proper response or object', () => {
    expect(columnConfigObject.Cell({ value: 300000 })).toMatchSnapshot();
  });
});
describe('calling the columns filterMethod method results in proper response or object', () => {
  const columnConfigObject = elapsedTimeColumn(300000, 'mockTableType');
  // No values...
  it('no filter results in all values', () => {
    const filter = {
      value: 'Greater Than:0:Seconds',
      id: '0000-0000-0000-0000'
    };
    const row = { '0000-0000-0000-0000': 300 };
    expect(columnConfigObject.filterMethod(filter, row)).toEqual(true);
  });
  it('filter greater or less than zero results in all values', () => {
    const filter = {
      value: 'Greater Than:0:Seconds',
      id: '0000-0000-0000-0000'
    };
    const row = { '0000-0000-0000-0000': 300 };
    expect(columnConfigObject.filterMethod(filter, row)).toEqual(true);
  });
  // Less than...
  it('filter "Less Than: " seconds', () => {
    const filter = {
      value: 'Less Than:300:Seconds',
      id: '0000-0000-0000-0000'
    };
    const row = { '0000-0000-0000-0000': 200 };
    expect(columnConfigObject.filterMethod(filter, row)).toEqual(true);
  });
  it('filter "Less Than: " minutes', () => {
    const filter = {
      value: 'Less Than:300:Minutes',
      id: '0000-0000-0000-0000'
    };
    const row = { '0000-0000-0000-0000': 200 };
    expect(columnConfigObject.filterMethod(filter, row)).toEqual(true);
  });
  // Greater than...
  it('filter "Greater Than: seconds" ', () => {
    const filter = {
      value: 'Greater Than:300:Seconds',
      id: '0000-0000-0000-0000'
    };
    const row = { '0000-0000-0000-0000': 400 };
    expect(columnConfigObject.filterMethod(filter, row)).toEqual(true);
  });
  it('filter "Greater Than: minutes" ', () => {
    const filter = {
      value: 'Greater Than:1:Minutes',
      id: '0000-0000-0000-0000'
    };
    const row = { '0000-0000-0000-0000': 1001 };
    expect(columnConfigObject.filterMethod(filter, row)).toEqual(true);
  });
});
describe('Time filter sub menu', () => {
  it('renders the time filter menu with default values', () => {
    const filter = { value: '', id: '0000-0000-0000-0000' };
    expect(
      helperFunctions.elapsedTimeFilter(filter, () => {}, 'mockTable')
    ).toMatchSnapshot();
  });
  it('renders the time filter menu, greater than in minutes', () => {
    const filter = {
      value: 'Greater Than:1:Minutes',
      id: '0000-0000-0000-0000'
    };
    expect(
      helperFunctions.elapsedTimeFilter(filter, () => {}, 'mockTable')
    ).toMatchSnapshot();
  });
  it('renders the time filter menu, greater than in seconds', () => {
    const filter = {
      value: 'Greater Than:1:Seconds',
      id: '0000-0000-0000-0000'
    };
    expect(
      helperFunctions.elapsedTimeFilter(filter, () => {}, 'mockTable')
    ).toMatchSnapshot();
  });
  it('renders the time filter menu, less than in minutes', () => {
    const filter = { value: 'Less Than:1:Minutes', id: '0000-0000-0000-0000' };
    expect(
      helperFunctions.elapsedTimeFilter(filter, () => {}, 'mockTable')
    ).toMatchSnapshot();
  });
  it('renders the time filter menu, less than in seconds', () => {
    const filter = { value: 'Less Than:1:Seconds', id: '0000-0000-0000-0000' };
    expect(
      helperFunctions.elapsedTimeFilter(filter, () => {}, 'mockTable')
    ).toMatchSnapshot();
  });
});
describe('columnFilterOnChangeEvents', () => {
  it('no inputSource passed in, filter shouldd remain unchanged', () => {
    const filter = { value: '0:0:0' };
    expect(
      helperFunctions.columnFilterOnChangeEvents(
        filter,
        changeValue => changeValue,
        { target: { value: 'newValue' } },
        ''
      )
    ).toEqual(['0', '0', '0']);
  });
  it('no filter results in default value returned', () => {
    const filter = undefined;
    expect(
      helperFunctions.columnFilterOnChangeEvents(
        filter,
        changeValue => changeValue,
        { target: { value: 'newValue' } },
        ''
      )
    ).toEqual(['Greater Than', 0, 'Minutes']);
  });
  it('greaterThanOrLessThan onChange', () => {
    const filter = { value: '0:0:0' };
    expect(
      helperFunctions.columnFilterOnChangeEvents(
        filter,
        changeValue => changeValue,
        { target: { value: 'newValue' } },
        'greaterThanOrLessThan'
      )
    ).toEqual('newValue:0:0');
  });
  it('timeInput onChange', () => {
    const filter = { value: '0:0:0' };
    expect(
      helperFunctions.columnFilterOnChangeEvents(
        filter,
        changeValue => changeValue,
        { target: { value: 'newValue' } },
        'timeInput'
      )
    ).toEqual('0:newValue:0');
  });
  it('secondsOrMinutes onChange', () => {
    const filter = { value: '0:0:0' };
    expect(
      helperFunctions.columnFilterOnChangeEvents(
        filter,
        changeValue => changeValue,
        { target: { value: 'newValue' } },
        'secondsOrMinutes'
      )
    ).toEqual('0:0:newValue');
  });
});
describe('helper functions map properly', () => {
  const columnConfigObject = elapsedTimeColumn(300000, 'mockTableType');
  const filter = { value: '0:0:0' };
  const onChange = changeValue => changeValue;
  const spy = jest.spyOn(helperFunctions, 'elapsedTimeFilter');
  it('Filter', () => {
    columnConfigObject.Filter(filter, onChange);
    expect(spy).toHaveBeenCalledTimes(6);
  });
});
describe('ElapsedTimeFilter', () => {
  it('renders properly and onchanges work', () => {
    const filter = { value: '0:0:0' };
    const onChange = changeValue => changeValue;
    const wrapper = shallow(
      helperFunctions.elapsedTimeFilter(filter, onChange, 'mockTable')
    );
    expect(
      wrapper.instance().greaterThanOnChange({ target: { value: 'newValue' } })
    ).toEqual('newValue:0:0');
    expect(
      wrapper.instance().minutesInputOnChange({ target: { value: 'newValue' } })
    ).toEqual('0:newValue:0');
    expect(
      wrapper.instance().timeToggleOnChange({ target: { value: 'newValue' } })
    ).toEqual('0:0:newValue');
  });
  it('renders a default properly when no filter is passed in', () => {
    const onChange = changeValue => changeValue;
    const wrapper = shallow(
      helperFunctions.elapsedTimeFilter(undefined, onChange, 'mockTable')
    );
    expect(wrapper).toMatchSnapshot();
  });
});
describe('formatFilter helper function', () => {
  it('various formats', () => {
    expect(helperFunctions.formatFilter('Greater Than:0:Minutes')).toEqual(
      ' +  0 Min'
    );
    expect(helperFunctions.formatFilter('Less Than:0:Minutes')).toEqual(
      ' -  0 Min'
    );
    expect(helperFunctions.formatFilter('Greater Than:0:Seconds')).toEqual(
      ' +  0 Sec'
    );
    expect(helperFunctions.formatFilter('Less Than:0:Seconds')).toEqual(
      ' -  0 Sec'
    );
  });
});
