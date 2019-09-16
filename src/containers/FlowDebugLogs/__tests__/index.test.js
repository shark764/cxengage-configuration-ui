import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../utils/testUtils';
import {
  getReportingEvents,
  getStringifyReportingEvents,
  getStringifyReportingEventsRawData
} from '../../../redux/modules/entities/reportingEvents/selectors';
import FlowDebugLayout, { mapStateToProps } from '../';

jest.mock('../../../redux/modules/entities/reportingEvents/selectors');
getReportingEvents.mockImplementation(() => {
  return { eventName: 'event', eventId: 'id' };
});
getStringifyReportingEvents.mockImplementation(() => 'mock-string-data');
getStringifyReportingEventsRawData.mockImplementation(() => 'mock-string-data');

describe('FlowDebugLayout Renders', () => {
  it('renders', () => {
    const rendered = shallow(<FlowDebugLayout store={mockStore} />);
    expect(rendered).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
