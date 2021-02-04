/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getCurrentDateTime, generatePdf } from 'serenova-js-utils/browser';

import {
  PageHeader,
  Typeahead,
  DatePicker,
  LoadingSpinnerSVG,
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
  background-color: #1e1e1e;
`;

const FiltersContainer = styled.div`
  display: flex;
  padding: 10px;
  border-radius: 3px;
  background-color: rgb(62, 62, 62);
  box-shadow: rgba(0, 0, 0, 0.21) 0px 0px;
  color: #ffffff;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Label = styled.label`
  font-size: 16px;
  color: #999999;
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
  color: #fff;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  grid-template-areas: 'chart .' 'table .';
  justify-items: start;
  background-color: rgb(62, 62, 62);
  padding: 30px;
  margin-top: 50px;
`;

const StyledWidget = styled(Widget)`
  ${(props) => props.marginTop && 'margin-top: 10px'};
  border-radius: 3px;
  width: 300px;
  height: 270px;
  background-color: rgb(73, 73, 73);
  color: #999999;
  grid-area: ${(props) => props.gridArea};
  justify-self: center;
  align-self: center;
`;

const StyledButton = styled.button`
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  color: #999999;
  padding: 7px 15px;
  cursor: pointer;
  z-index: 1;
  background-color: rgb(73, 73, 73);
  width: 160px;
  border: none !important;
  &:hover {
    color: #cccccc;
  }
`;

const customSelectorStyle = {
  noBackground: true,
  searchIconType: 'searchBox',
  inputborder: '1px solid #4C4C4C',
  suggestionBackgroundEvenListItem: 'rgb(62,62,62)',
  suggestionBackgroundOddListItem: '#656565',
  noOptionsTxtBackroundColor: 'rgb(62, 62, 62)',
};

const customDatePickerStyle = {
  fontSize: '16px',
  borderRadius: '3px',
  minWidth: '271px',
  height: '36px',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  padding: '2px 35px 0 20px',
  border: '1px solid #4C4C4C',
  color: '#dadada',
  containerBackground: '#656565',
};

class ForecastDashboards extends Component {
  render() {
    const pdfElementsReference = [
      { ref: 'forecastCallVolumeWrapper', text: 'Forecast Call Volume' },
      { ref: 'slaWrapper', text: 'SLA' },
      { ref: 'queueAbandonsWrapper', text: 'Queue Abandons' },
    ];
    return (
      <Fragment>
        {this.props.isDependentEntitesFetching ? (
          <Loading size={60} />
        ) : (
          <Wrapper className="wrapper">
            <PageHeader
              headerColor="#FFFFFF"
              helpLink={this.props.pageHelpLink}
              text={this.props.intl.formatMessage({
                id: 'pageHeader.forecastDashboards',
                defaultMessage: 'Forecasting Dashboards',
              })}
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
                  customInputColor="#dadada"
                  options={this.props.queues}
                  customStyle={customSelectorStyle}
                  data-automation="queuesDropDownList"
                  selectedOption={this.props.getSelectedQueue}
                  placeholder={this.props.intl.formatMessage({
                    id: 'input.placeholder.select.queue',
                    defaultMessage: 'Select a Queue',
                  })}
                  noSuggestionsMessage={this.props.intl.formatMessage({
                    id: 'input.placeholder.noOptions',
                    defaultMessage: 'No Options',
                  })}
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
                  customInputColor="#dadada"
                  options={d.directionOptions}
                  customStyle={customSelectorStyle}
                  data-automation="directionDropDownList"
                  selectedOption={this.props.getSelectedDirection}
                  placeholder={this.props.intl.formatMessage({
                    id: 'input.placeholder.choose.direction',
                    defaultMessage: 'Choose Direction',
                  })}
                  noSuggestionsMessage={this.props.intl.formatMessage({
                    id: 'input.placeholder.noOptions',
                    defaultMessage: 'No Options',
                  })}
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
                  customInputColor="#dadada"
                  options={d.channelOptions}
                  customStyle={customSelectorStyle}
                  data-automation="channelDropDownList"
                  selectedOption={this.props.getSelectedChannel}
                  placeholder={this.props.intl.formatMessage({
                    id: 'input.placeholder.select.channel',
                    defaultMessage: 'Select a Channel',
                  })}
                  noSuggestionsMessage={this.props.intl.formatMessage({
                    id: 'input.placeholder.noOptions',
                    defaultMessage: 'No Options',
                  })}
                  onSelectedOptionChange={({ label, value }) => this.props.setFilterValue('channel', label, value)}
                />
              </FilterWrapper>

              <FilterWrapper>
                <StyledButton
                  disabled={false}
                  onClick={() => console.log('when apply button is clicked make an API request to get the stats')}>
                  <FormattedMessage id="button.text.apply" defaultMessage="Apply" />
                </StyledButton>
              </FilterWrapper>

              <FilterWrapper>
                <StyledButton disabled={false} onClick={() => generatePdf(pdfElementsReference, getCurrentDateTime)}>
                  <FormattedMessage id="button.text.pdf" defaultMessage="Save as PDF" />
                </StyledButton>
              </FilterWrapper>
            </FiltersContainer>

            <StatsContainer id="dataContainer">
              <StatWrapper>
                <BarChart
                  height={300}
                  xDataKey="name"
                  gridArea="chart"
                  id="forecastCallVolumeWrapper"
                  data={d.forecastCallVolumeChartData}
                  dataKeys={d.forecastCallVolumeDataKeys}
                  statName={this.props.intl.formatMessage({
                    id: 'forecastDashboards.report.callVolume',
                    defaultMessage: 'Forecast Call Volume',
                  })}
                />
                <StyledWidget
                  value="108%"
                  color="green"
                  componentType="info"
                  label={this.props.intl.formatMessage({
                    id: 'forecastDashboards.widget.forecastRunRate',
                    defaultMessage: 'Forecast Run Rate',
                  })}
                />
                <StatTable columns={forecastCallVolumeColumns()} data={d.forecastCallVolumeTableData} />
              </StatWrapper>

              <StatWrapper>
                <BarChart
                  height={300}
                  gridArea="chart"
                  id="slaWrapper"
                  xDataKey="name"
                  data={d.slaChartData}
                  dataKeys={d.slaDataKeys}
                  statName={this.props.intl.formatMessage({
                    id: 'forecastDashboards.report.sla',
                    defaultMessage: 'SLA',
                  })}
                />
                <StyledWidget
                  marginTop="10px"
                  label={this.props.intl.formatMessage({
                    id: 'forecastDashboards.widget.overall.sla',
                    defaultMessage: 'Overall SLA',
                  })}>
                  <Gauge width="100%" height={200} data={d.slaGuageData} dataKey={d.slaGuageDataKey} />
                </StyledWidget>
                <StatTable columns={slaColumns()} data={d.slaTableData} />
                <StyledWidget
                  color="red"
                  value="00:06:32"
                  componentType="info"
                  label={this.props.intl.formatMessage({
                    id: 'forecastDashboards.widget.avgTimeToAnswer',
                    defaultMessage: 'Average Queue Time to Answer',
                  })}
                />
              </StatWrapper>

              <StatWrapper>
                <BarChart
                  height={300}
                  gridArea="chart"
                  xDataKey="name"
                  id="queueAbandonsWrapper"
                  data={d.queueAbandonsChartData}
                  dataKeys={d.queueAbandonsDataKeys}
                  statName={this.props.intl.formatMessage({
                    id: 'forecastDashboards.report.queueAbandons',
                    defaultMessage: 'Queue Abandons',
                  })}
                />
                <StyledWidget
                  value="7.06%"
                  color="green"
                  componentType="info"
                  label={this.props.intl.formatMessage({
                    id: 'forecastDashboards.widget.queueAbandonRate',
                    defaultMessage: 'Queue Abandon Rate',
                  })}
                />
                <StatTable columns={queueAbandonsColumns()} data={d.queueAbandonsTableData} />
                <StyledWidget
                  color="red"
                  marginTop="10px"
                  value="00:55:00"
                  componentType="info"
                  label={this.props.intl.formatMessage({
                    id: 'forecastDashboards.widget.avgQueueAbandonTime',
                    defaultMessage: 'Average Queue Abandon Time',
                  })}
                />
              </StatWrapper>
            </StatsContainer>
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
  setFilterValue: PropTypes.func,
  setFilterDate: PropTypes.func,
  setShowHideGraph: PropTypes.func,
  intl: PropTypes.object.isRequired,
};
