import { constructGeneralTextColumn } from '../../../containers/EntityTable/columns/genericTextColumn';

export function forecastCallVolumeColumns() {
  return [
    constructGeneralTextColumn('queueName'),
    constructGeneralTextColumn('interval'),
    constructGeneralTextColumn('forecast'),
    constructGeneralTextColumn('actual'),
    constructGeneralTextColumn('forecastRunRate'),
  ];
}

export function slaColumns() {
  return [
    constructGeneralTextColumn('queue'),
    constructGeneralTextColumn('interval'),
    constructGeneralTextColumn('sla', 'SLA'),
  ];
}

export function queueAbandonsColumns() {
  return [
    constructGeneralTextColumn('queue'),
    constructGeneralTextColumn('queueAbandons', 'Queue Abandons'),
    constructGeneralTextColumn('queueAbandonRate', 'Queue Abandon Rate'),
    constructGeneralTextColumn('avgQueueAbandonTime', 'Avg Queue Abandon Time'),
  ];
}
