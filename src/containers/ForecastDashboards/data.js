/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 * The forecast API is not ready yet, until then this sample data will be used to display the dashboards.
*/

// forecast call volume data:

export const forecastCallVolumeChartData = [
  { name: '11:30-12:00', actualCalls: 20, forecastedCalls: 10 },
  { name: '11:00-11:30', actualCalls: 30, forecastedCalls: 20 },
  { name: '10:30-11:00', actualCalls: 40, forecastedCalls: 25 },
  { name: '10:00-10:30', actualCalls: 50, forecastedCalls: 30 },
  { name: '9:30-10:00', actualCalls: 77, forecastedCalls: 45 },
  { name: '9:00-9:30', actualCalls: 86, forecastedCalls: 50 },
  { name: '8:30-9:00', actualCalls: 90, forecastedCalls: 67 },
  { name: '8:00-8:30', actualCalls: 123, forecastedCalls: 90 }
];

export const forecastCallVolumeTableData = [
  { queueName: 'a', interval: '8:00-8:30', forecast: '28', actual: '25', forecastRunRate: '89%' },
  { queueName: 'b', interval: '8:30-9:00', forecast: '47', actual: '55', forecastRunRate: '117%' },
  { queueName: 'c', interval: '9:00-9:30', forecast: '52', actual: '62', forecastRunRate: '119%' }
];

export const forecastCallVolumeDataKeys = ['actualCalls', 'forecastedCalls'];

// sla data:

export const slaChartData = [
  { name: '11:30-12:00', sla: '80' },
  { name: '11:00-11:30', sla: '30' },
  { name: '10:30-11:00', sla: '40' },
  { name: '10:00-10:30', sla: '50' },
  { name: '9:30-10:00', sla: '77' },
  { name: '9:00-9:30', sla: '86' },
  { name: '8:30-9:00', sla: '82' },
  { name: '8:00-8:30', sla: '90' },
  { name: '7:30-8:00', sla: '100' },
  { name: '7:00-7:30', sla: '110' },
  { name: '6:30-7:00', sla: '120' },
  { name: '6:00-6:30', sla: '130' },
  { name: '5:30-6:00', sla: '140' },
  { name: '5:00-5:30', sla: '150' },
  { name: '4:30-5:00', sla: '160' },
  { name: '4:00-4:30', sla: '170' }
];

export const slaTableData = [
  { queue: 'a', interval: '8:00-8:30', sla: '28' },
  { queue: 'b', interval: '8:30-9:00', sla: '47' },
  { queue: 'c', interval: '9:00-9:30', sla: '52' }
];

export const slaDataKeys = ['sla'];

export const slaGuageData = [{ name: 'sla', value: 75 }];

export const slaGuageDataKey = 'value';

// call abandon data:

export const callAbandonsChartData = [
  { name: '11:30-12:00', queueAbandons: 20 },
  { name: '11:00-11:30', queueAbandons: 30 },
  { name: '10:30-11:00', queueAbandons: 40 },
  { name: '10:00-10:30', queueAbandons: 50 },
  { name: '9:30-10:00', queueAbandons: 77 },
  { name: '9:00-9:30', queueAbandons: 86 },
  { name: '8:30-9:00', queueAbandons: 90 },
  { name: '8:00-8:30', queueAbandons: 123 }
];

export const callAbandonsTableData = [
  { queue: 'a', queueAbandons: 0, queueAbandonRate: '1.10%', avgQueueAbandonTime: '0:00:00:00' },
  { queue: 'b', queueAbandons: 3, queueAbandonRate: '0.00%', avgQueueAbandonTime: '0:00:02:00' },
  { queue: 'c', queueAbandons: 2, queueAbandonRate: '2.4%', avgQueueAbandonTime: '0:00:01:24' }
];

export const callAbandonsDataKeys = ['queueAbandons'];

// localization Data:

export const channelOptions = [
  { label: 'Voice', value: 'voice' },
  { label: 'Sms', value: 'sms' },
  { label: 'Email', value: 'email' },
  { label: 'Messaging', value: 'messaging' },
  { label: 'Work Item', value: 'workItem' }
];

export const directionOptions = [
  { label: 'Inbound', value: 'inbound' },
  { label: 'Outbound', value: 'outbound' },
  { label: 'Agent Initiated', value: 'agentInitiated' }
];

export const chartNames = {};
