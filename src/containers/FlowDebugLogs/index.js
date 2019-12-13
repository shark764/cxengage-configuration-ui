import { connect } from 'react-redux';
import FlowDebugLayout from './layout';
import { fetchReportingEvents } from '../../redux/modules/entities';
import {
  getReportingEvents,
  getStringifyReportingEvents,
  getStringifyReportingEventsRawData
} from '../../redux/modules/entities/reportingEvents/selectors';
import { isInIframe } from 'serenova-js-utils/browser';

export function mapStateToProps(state) {
  return {
    reportingEvents: getReportingEvents(state),
    reportingEventsString: getStringifyReportingEvents(state),
    reportingEventsRawData: getStringifyReportingEventsRawData(state),
    insideIframe: !isInIframe()
  };
}

export const actions = {
  fetchReportingEvents
};

export default connect(mapStateToProps, actions)(FlowDebugLayout);
