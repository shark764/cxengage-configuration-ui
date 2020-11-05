/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import Layout from './layout';

import { entitiesMetaData } from '../../redux/modules/entities/metaData';
import { getHelpLink } from '../EntityTable/selectors';
import {
  setFilterValue,
  setFilterDate,
  setShowHideGraph
} from '../../redux/modules/reporting/forecastDashboards/index';
import {
  isDependentEntitesFetched,
  getQueues,
  getSelectedFilterOption,
  selectShowHideGraph
} from '../../redux/modules/reporting/forecastDashboards/selectors';

export const mapStateToProps = state => ({
  pageTitle: entitiesMetaData['forecastDashboards'] ? entitiesMetaData['forecastDashboards'].pageTitle : '',
  pageHelpLink: getHelpLink(state),
  isDependentEntitesFetched: isDependentEntitesFetched(state),
  queues: getQueues(state),
  getSelectedQueue: getSelectedFilterOption(state, 'queue'),
  getSelectedChannel: getSelectedFilterOption(state, 'channel'),
  getSelectedDirection: getSelectedFilterOption(state, 'direction'),
  isForeCastVolumeGraphHidden: selectShowHideGraph(state, 'forecastCallVolume'),
  isSlaGraphHidden: selectShowHideGraph(state, 'sla'),
  isCallAbandonGraphHidden: selectShowHideGraph(state, 'callAbandons')
});

export const actions = {
  setFilterValue,
  setFilterDate,
  setShowHideGraph
};

export default connect(mapStateToProps, actions)(Layout);
