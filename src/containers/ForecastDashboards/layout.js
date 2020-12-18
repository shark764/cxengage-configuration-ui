/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  PageHeader,
  Typeahead,
  DatePicker,
  Button,
  LoadingSpinnerSVG,
  RefreshIconSVG,
  BarChart,
  Gauge,
  ReportingWidget as Widget,
} from 'cx-ui-components';

import * as d from './data';
import StatTable from './table';
import {
  forecastCallVolumeColumns,
  slaColumns,
  queueAbandonsColumns,
} from '../../components/tableColumns/foreCastDashboards/columns';

const Loading = styled(LoadingSpinnerSVG)`
  position: absolute;
  top: calc(50% - ${(props) => props.size / 2}px);
  left: calc(50% - ${(props) => props.size / 2}px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #a9a9a9;
`;

const FiltersContainer = styled.div`
  display: flex;
  padding: 10px;
  border: 1px solid #999999;
  border-radius: 3px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Label = styled.label`
  font-size: 16px;
  text-align: left;
  margin-right: 3px;
  vertical-align: top;
  line-height: 35px;
`;

const Selector = styled(Typeahead)`
  display: inline-block;
  position: relative;
  height: 30px;
  width: 258px;
  color: #000000;
`;

const StyledButton = styled(Button)`
  width: 160px;
  border: none !important;
`;

const StatContainer = styled.div`
  margin-top: 20px;
`;

const ChartWrapper = styled.div`
  display: flex;
`;

const WidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-left: 100px;
`;

const StyledWidget = styled(Widget)`
  ${(props) => props.marginTop && 'margin-top: 10px'};
  border: 1px solid #999999;
  border-radius: 3px;
  height: 250px;
`;

const ChartName = styled.h2`
  display: inline-block;
  font-size: 21px;
  font-weight: 700;
  color: #474747;
  margin-bottom: 10px;
`;

const RefreshIcon = styled(RefreshIconSVG)`
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const customDatePickerStyle = {
  fontSize: '16px',
  borderRadius: '3px',
  minWidth: '271px',
  height: '36px',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  padding: '2px 35px 0 20px',
  border: '1px solid #ccc',
};

class ForecastDashboards extends Component {
  refreshIconToolTip = (switchToChart) => {
    switchToChart
      ? this.props.intl.formatMessage({
          id: 'forecastDashboards.toolTip.switchToChart',
          defaultMessage: 'Switch to Chart',
        })
      : this.props.intl.formatMessage({
          id: 'forecastDashboards.toolTip.switchToTable',
          defaultMessage: 'Switch to Table',
        });
  };

  render() {
    return (
      <Fragment>
        {this.props.isDependentEntitesFetching ? (
          <Loading size={60} />
        ) : (
          <Wrapper className="wrapper">
            <PageHeader
              text={this.props.intl.formatMessage({
                id: 'pageHeader.forecastDashboards',
                defaultMessage: 'Forecasting Dashboards',
              })}
              helpLink={this.props.pageHelpLink}
            />
            <FiltersContainer>
              <FilterWrapper>
                <Label>
                  <FormattedMessage id="label.date" defaultMessage="Date:" />
                </Label>
                <DatePicker
                  name="Date"
                  format="LL"
                  selectedDay=""
                  localeTimeZone="us"
                  disabled={this.props.disabled}
                  customStyle={customDatePickerStyle}
                  onClick={(e) => this.props.setFilterDate(e)}
                />
              </FilterWrapper>

              <FilterWrapper>
                <Label>
                  <FormattedMessage id="label.queue" defaultMessage="Queue:" />
                </Label>
                <Selector
                  listWidth={258}
                  listHeight={250}
                  noBackground={true}
                  customInputColor="#000"
                  placeholder={this.props.intl.formatMessage({
                    id: 'input.placeholder.select.queue',
                    defaultMessage: 'Select a Queue',
                  })}
                  options={this.props.queues}
                  noSuggestionsMessage={this.props.intl.formatMessage({
                    id: 'input.placeholder.noOptions',
                    defaultMessage: 'No Options',
                  })}
                  data-automation="queuesDropDownList"
                  selectedOption={this.props.getSelectedQueue}
                  onSelectedOptionChange={({ label, value }) => this.props.setFilterValue('queue', label, value)}
                />
              </FilterWrapper>

              <FilterWrapper>
                <Label>
                  <FormattedMessage id="label.direction" defaultMessage="Direction:" />
                </Label>
                <Selector
                  listWidth={258}
                  listHeight={250}
                  noBackground={true}
                  customInputColor="#000"
                  placeholder={this.props.intl.formatMessage({
                    id: 'input.placeholder.choose.direction',
                    defaultMessage: 'Choose Direction',
                  })}
                  options={d.directionOptions}
                  noSuggestionsMessage={this.props.intl.formatMessage({
                    id: 'input.placeholder.noOptions',
                    defaultMessage: 'No Options',
                  })}
                  data-automation="directionDropDownList"
                  selectedOption={this.props.getSelectedDirection}
                  onSelectedOptionChange={({ label, value }) => this.props.setFilterValue('direction', label, value)}
                />
              </FilterWrapper>

              <FilterWrapper>
                <Label>
                  <FormattedMessage id="label.channel" defaultMessage="Channel:" />
                </Label>
                <Selector
                  listWidth={258}
                  listHeight={250}
                  noBackground={true}
                  customInputColor="#000"
                  placeholder={this.props.intl.formatMessage({
                    id: 'input.placeholder.select.channel',
                    defaultMessage: 'Select a Channel',
                  })}
                  options={d.channelOptions}
                  noSuggestionsMessage={this.props.intl.formatMessage({
                    id: 'input.placeholder.noOptions',
                    defaultMessage: 'No Options',
                  })}
                  data-automation="channelDropDownList"
                  selectedOption={this.props.getSelectedChannel}
                  onSelectedOptionChange={({ label, value }) => this.props.setFilterValue('channel', label, value)}
                />
              </FilterWrapper>

              <FilterWrapper>
                <StyledButton
                  disabled={false}
                  buttonType="primary"
                  onClick={() => console.log('when apply button is clicked make an API request to get the stats')}>
                  <FormattedMessage id="button.text.apply" defaultMessage="Apply" />
                </StyledButton>
              </FilterWrapper>
              <FilterWrapper>
                <StyledButton
                  className="generatePdfBtn"
                  disabled={false}
                  buttonType="primary"
                  onClick={() => console.log('Generate PDF')}>
                  <FormattedMessage id="button.text.generatePdfReport" defaultMessage="Generate pdf report" />
                </StyledButton>
              </FilterWrapper>
            </FiltersContainer>

            <StatContainer>
              <ChartName>
                <FormattedMessage id="forecastDashboards.report.callVolume" defaultMessage="Forecast Call Volume" />
              </ChartName>
              <RefreshIcon
                title={this.refreshIconToolTip(this.props.isForeCastVolumeGraphHidden)}
                onClick={() => this.props.setShowHideGraph('forecastCallVolume')}
              />
              <ChartWrapper>
                {!this.props.isForeCastVolumeGraphHidden ? (
                  <BarChart
                    width="60%"
                    height={300}
                    data={d.forecastCallVolumeChartData}
                    dataKeys={d.forecastCallVolumeDataKeys}
                    xDataKey="name"
                  />
                ) : (
                  <StatTable columns={forecastCallVolumeColumns()} data={d.forecastCallVolumeTableData} />
                )}
                <WidgetWrapper>
                  <StyledWidget
                    label={this.props.intl.formatMessage({
                      id: 'forecastDashboards.widget.forecastRunRate',
                      defaultMessage: 'Forecast Run Rate',
                    })}
                    value="108%"
                    color="green"
                    componentType="info"
                  />
                </WidgetWrapper>
              </ChartWrapper>
            </StatContainer>

            <StatContainer>
              <ChartName>
                <FormattedMessage id="forecastDashboards.report.sla" defaultMessage="SLA" />
              </ChartName>
              <RefreshIcon
                title={this.refreshIconToolTip(this.props.isSlaGraphHidden)}
                onClick={() => this.props.setShowHideGraph('sla')}
              />
              <ChartWrapper>
                {!this.props.isSlaGraphHidden ? (
                  <BarChart width="60%" height={300} data={d.slaChartData} dataKeys={d.slaDataKeys} xDataKey="name" />
                ) : (
                  <StatTable columns={slaColumns()} data={d.slaTableData} />
                )}
                <WidgetWrapper>
                  <StyledWidget
                    label={this.props.intl.formatMessage({
                      id: 'forecastDashboards.widget.overall.sla',
                      defaultMessage: 'Overall SLA',
                    })}
                    marginTop="10px">
                    <Gauge width="100%" height={200} data={d.slaGuageData} dataKey={d.slaGuageDataKey} />
                  </StyledWidget>
                  <StyledWidget
                    label={this.props.intl.formatMessage({
                      id: 'forecastDashboards.widget.avgTimeToAnswer',
                      defaultMessage: 'Average Queue Time to Answer',
                    })}
                    value="00:06:32"
                    color="red"
                    componentType="info"
                  />
                </WidgetWrapper>
              </ChartWrapper>
            </StatContainer>

            <StatContainer>
              <ChartName>
                <FormattedMessage id="forecastDashboards.report.queueAbandons" defaultMessage="Queue Abandons" />
              </ChartName>
              <RefreshIcon
                title={this.refreshIconToolTip(this.props.isQueueAbandonsGraphHidden)}
                onClick={() => this.props.setShowHideGraph('queueAbandons')}
              />
              <ChartWrapper>
                {!this.props.isQueueAbandonsGraphHidden ? (
                  <BarChart
                    width="60%"
                    height={300}
                    data={d.queueAbandonsChartData}
                    dataKeys={d.queueAbandonsDataKeys}
                    xDataKey="name"
                  />
                ) : (
                  <StatTable columns={queueAbandonsColumns()} data={d.queueAbandonsTableData} />
                )}
                <WidgetWrapper>
                  <StyledWidget
                    label={this.props.intl.formatMessage({
                      id: 'forecastDashboards.widget.queueAbandonRate',
                      defaultMessage: 'Queue Abandon Rate',
                    })}
                    value="7.06%"
                    color="green"
                    componentType="info"
                  />
                  <StyledWidget
                    label={this.props.intl.formatMessage({
                      id: 'forecastDashboards.widget.avgQueueAbandonTime',
                      defaultMessage: 'Average Queue Abandon Time',
                    })}
                    value="00:55:00'"
                    color="red"
                    componentType="info"
                    marginTop="10px"
                  />
                </WidgetWrapper>
              </ChartWrapper>
            </StatContainer>
          </Wrapper>
        )}
      </Fragment>
    );
  }
}

export default injectIntl(ForecastDashboards);

ForecastDashboards.propTypes = {
  pageTitle: PropTypes.string,
  pageHelpLink: PropTypes.string,
  isDependentEntitesFetching: PropTypes.bool,
  disabled: PropTypes.bool,
  queues: PropTypes.array,
  getSelectedQueue: PropTypes.string,
  getSelectedChannel: PropTypes.string,
  getSelectedDirection: PropTypes.string,
  isForeCastVolumeGraphHidden: PropTypes.bool,
  isSlaGraphHidden: PropTypes.bool,
  isQueueAbandonsGraphHidden: PropTypes.bool,
  setFilterValue: PropTypes.func,
  setFilterDate: PropTypes.func,
  setShowHideGraph: PropTypes.func,
  intl: PropTypes.object.isRequired,
};
