import { fromJS } from 'immutable';
import { getReportingEvents, getStringifyReportingEvents } from '../selectors';

describe('getReportingEvents', () => {
  const initialState = fromJS({
    Entities: {
      reportingEvents: ['event1', 'event2']
    }
  });
  it('gets the reporting events', () => {
    expect(getReportingEvents(initialState)).toEqual(fromJS(['event1', 'event2']));
  });
});

describe('getStringifyReportingEvents', () => {
  const initialState = fromJS({
    Entities: {
      reportingEvents: ['event1', 'event2']
    }
  });
  it('gets the reporting events as string', () => {
    expect(getStringifyReportingEvents(initialState)).toEqual(JSON.stringify(['event1', 'event2'], null, 2));
  });
});
