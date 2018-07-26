import monitoringColumn, {
  helperFunctions,
  MonitorFilter
} from '../monitoring';
import React from 'react';
// import {Provider} from 'react-redux';
import { shallow } from 'enzyme';
// import InteractionMonitoringLayout, { getTableRowProps } from '../Layout';
// import { createStore } from 'redux';
// import {fromJS} from 'immutable';
// import { mockInteraction } from '../../../tools/testInteractions';
// import { mockStore } from 'TestUtils';

describe('monitoringColumn configuration object', () => {
  it('configurations show method returns false when value is false', () => {
    const configObject = monitoringColumn(
      false,
      'mockTable',
      '0000-0000-0000-0000',
      'connected'
    );
    expect(configObject).toMatchSnapshot();
  });
  it('configurations show method returns true when value is true', () => {
    const configObject = monitoringColumn(
      true,
      'mockTable',
      '0000-0000-0000-0000',
      'connected'
    );
    expect(configObject).toMatchSnapshot();
  });
});

describe('Calling monitoringColumn methods should fire proper functions', () => {
  const filter = { id: 'monitored', value: 'All' };
  const row = { monitored: [], monitoring: [] };

  const configObjectMethodsTest = monitoringColumn(
    true,
    'mockTable',
    '0000-0000-0000-0000',
    'connected'
  );

  const accessorSpy = jest.spyOn(helperFunctions, 'accessor');
  const monitoringFilterMethodSpy = jest.spyOn(
    helperFunctions,
    'monitoringFilterMethod'
  );
  const monitorFilterSpy = jest.spyOn(helperFunctions, 'monitorFilter');
  const CellSpy = jest.spyOn(helperFunctions, 'Cell');

  it('calls accessor', () => {
    expect(configObjectMethodsTest.accessor({ monitors: [1, 2, 3] })).toEqual([
      1,
      2,
      3
    ]);
    expect(accessorSpy).toHaveBeenCalledTimes(1);
  });
  it('calls filter method', () => {
    configObjectMethodsTest.filterMethod(filter, row);
    expect(monitoringFilterMethodSpy).toHaveBeenCalledTimes(1);
  });
  it('returns filter component', () => {
    configObjectMethodsTest.Filter({ onChange: () => {} });
    expect(monitorFilterSpy).toHaveBeenCalledTimes(1);
  });
  it('returns cell component', () => {
    configObjectMethodsTest.Cell({ value: {}, row });
    expect(CellSpy).toHaveBeenCalledTimes(1);
  });
});

describe('monitoringColumn Cell renders', () => {
  it('does not render in non-voice channels', () => {
    const row = {
      interactionId: '0000-0000-0000-0000',
      channel: 'sms',
      monitoring: [{ endTimestamp: '2018-02-20T14:24:41.519Z' }]
    };
    const cell = shallow(
      helperFunctions.Cell({}, row, '0000-0000-0000-0000', 'offline')
    );
    expect(cell).toMatchSnapshot();
  });
  it('monitor button is disabled when monitoring id matches the rows id', () => {
    const row = {
      interactionId: '0000-0000-0000-0000',
      channel: 'voice',
      monitoring: [
        { id: '0000-0000-0000-0000', endTimestamp: '2018-02-20T14:24:41.519Z' }
      ]
    };
    const cell = shallow(
      helperFunctions.Cell({}, row, '0000-0000-0000-0000', 'offline')
    );
    expect(cell).toMatchSnapshot();
  });
  it('monitor button is disabled when monitoring status is connecting', () => {
    const row = {
      interactionId: '0000-0000-0000-0000',
      channel: 'voice',
      monitoring: [
        { id: '0000-0000-0000-0000', endTimestamp: '2018-02-20T14:24:41.519Z' }
      ]
    };
    const cell = shallow(
      helperFunctions.Cell({}, row, '1111-1111-1111-1111', 'connecting')
    );
    expect(cell).toMatchSnapshot();
  });
  it('1 person previously monitored the call', () => {
    const row = {
      interactionId: '0000-0000-0000-0000',
      channel: 'voice',
      monitoring: [{ endTimestamp: '2018-02-20T14:24:41.519Z' }]
    };
    const cell = shallow(
      helperFunctions.Cell({}, row, '0000-0000-0000-0000', 'offline')
    );
    expect(cell).toMatchSnapshot();
  });

  it('1 person is activly monitoring the call', () => {
    const row = {
      interactionId: '0000-0000-0000-0000',
      channel: 'voice',
      monitoring: [{ endTimestamp: null }]
    };
    const cell = shallow(
      helperFunctions.Cell({}, row, '0000-0000-0000-0000', 'offline')
    );
    expect(cell).toMatchSnapshot();
  });
});

describe('monitoringColumn Cells onclick handler works as expected', () => {
  it('calls monitor call onClick', () => {
    const row = {
      interactionId: '0000-0000-0000-0000',
      channel: 'voice',
      monitoring: [{ endTimestamp: '2018-02-20T14:24:41.519Z' }]
    };
    const event = {
      stopPropagation: function() {
        return row.interactionId;
      }
    };
    const cell = shallow(
      helperFunctions.Cell({}, row, '0000-0000-0000-0000', 'offline')
    );
    expect(cell.instance().monitorInteractionRequestor(event)).toEqual(
      row.interactionId
    );
  });
});

describe('monitoringFilterMethod', () => {
  const row = { monitored: [1, 2, 3, 4] };
  const row2 = { monitored: [] };
  it('returns All results, given the All value', () => {
    const filter = { id: 'monitored', value: 'All' };
    expect(helperFunctions.monitoringFilterMethod(filter, row)).toEqual(true);
    expect(helperFunctions.monitoringFilterMethod(filter, row2)).toEqual(true);
  });
  it('returns monitored calls, given the Monitored value and there are monitored calls available', () => {
    const filter = { id: 'monitored', value: 'Monitored' };
    expect(helperFunctions.monitoringFilterMethod(filter, row)).toEqual(true);
    expect(helperFunctions.monitoringFilterMethod(filter, row2)).toEqual(false);
  });
  it('returns non-monitored calls , ', () => {
    const filter = { id: 'monitored', value: 'Not Monitored' };
    expect(helperFunctions.monitoringFilterMethod(filter, row)).toEqual(false);
    expect(helperFunctions.monitoringFilterMethod(filter, row2)).toEqual(true);
  });
});

describe('MonitorFilter components', () => {
  it('renders properly', () => {
    const renderedMonitorFilter = shallow(
      <MonitorFilter onChange={() => {}} />
    );
    expect(renderedMonitorFilter).toMatchSnapshot();
  });
});
