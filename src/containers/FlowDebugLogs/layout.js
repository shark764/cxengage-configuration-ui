import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { PageHeader, SearchIconSVG, WordWrapIconSVG, CopyIconSVG, Toast } from 'cx-ui-components';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';
import { copyToClipboard, downloadFile } from 'serenova-js-utils/browser';

const dataViewStyle = css`
  width: 90em;
  border: 1px solid #c8cacc;
  height: 40em;
  over-flow: auto;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const ExportButton = styled.button`
  color: white;
  background-color: #07487a;
  width: 90x;
  height: 35px;
  border-radius: 4px;
  outline: none;
`;

const Input = styled.input`
  width: 30em;
  height: 35px;
  display: inline-block;
  outline: none;
`;

const SubmitButton = styled.button`
  display: inline-block;
  background-color: #07487a;
  height: 36px;
  width: 45px;
  border-radius: 0 4px 4px 0;
  outline: none;
`;

const SearchIcon = styled(SearchIconSVG)`
  position: relative;
  outline: none;
`;

const PrettyButton = styled.button`
  background-color: #dfe4e8;
  width: 75px;
  border-radius: 4px 0 0 4px;
  height: 35px;
  border: none;
  outline: none;
  color: ${props => (props.prettyView ? 'gray;' : 'black;')};
`;

const RawButton = styled.button`
  background-color: #dfe4e8;
  width: 75px;
  border-radius: 0 4px 4px 0;
  height: 35px;
  border: none;
  outline: none;
  color: ${props => (props.prettyView ? 'black;' : 'gray;')};
`;

const WrapButton = styled.button`
  background-color: white;
  border: none;
  outline: none;
  color: ${props => (props.wordwrap ? 'orange;' : 'black;')};
`;

const FiltersSelect = styled.select`
  position: relative;
  width: 15em;
  height: 35px;
  display: inline-block;
  outline: none;
`;

const ToggleButtons = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const WordWrap = styled(WordWrapIconSVG)`
  position: relative;
  width: 35px;
  height: 35px;
  background-color: #c8cacc;
  border-radius: 4px;
  margin-left: 10px;
`;

const Copy = styled.button`
  margin-left: 65em;
  background: white;
  border: none;
  outline: none;
`;

const StyledTextArea = styled.textarea`
  ${dataViewStyle};
`;

export default class FlowDebugLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      copySuccess: '',
      prettyView: false,
      wordwrap: true,
      filteredLogObject: ''  //used to display the logs in the text area
    };
    this.filteredData;
  }

  handleValueChange = event => {
    this.setState({ value: event.target.value });
  };

  copyToClipboard = () => {
    copyToClipboard((this.filteredData) ? JSON.stringify(this.filteredData, null, 2) : this.props.reportingEventsString);
    Toast.success('Copied!');
  };

  handleSubmit() {
    if (this.state.value !== '') {
      this.props.fetchReportingEvents(this.state.value);
      if (!this.state.selectedEvent) {
        this.setState({ selectedEvent: 'all' });
      }
    }
  }

  // the first time, filteredData will be empty, use props.reportingEvents to display the logs
  handleChangeRawData = () => {
    const data = (this.filteredData) ? this.filteredData : this.props.reportingEvents;
    if (this.state.wordwrap) {
      this.setState({ filteredLogObject: JSON.stringify(data, null, 2) });
    } else {
      this.setState({ filteredLogObject: JSON.stringify(data) });
    }
    this.setState({ prettyView: false });
  };

  handleChangeToJsonView = () => {
    if (this.filteredData) {
      this.setState({ filteredLogObject: this.filteredData });
    } else {
      this.setState({ filteredLogObject: this.props.reportingEvents });
    }
    this.setState({ prettyView: true });
  };

  handletoggleView = () => {
    const data = (this.filteredData) ? this.filteredData : this.props.reportingEvents;
    if (this.state.wordwrap) {
      this.setState({ filteredLogObject: JSON.stringify(data) });
    } else {
      this.setState({ filteredLogObject: JSON.stringify(data, null, 2) });
    }
    this.setState({ wordwrap: !this.state.wordwrap });
  };

  search = event => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  formatData(data) {
    if (!this.state.prettyView && this.state.wordwrap) {
      this.setState({ filteredLogObject: JSON.stringify(data, null, 2) });
    } else if (!this.state.prettyView && !this.state.wordwrap) {
      this.setState({ filteredLogObject: JSON.stringify(data) });
    } else if (this.state.prettyView) {
      this.setState({ filteredLogObject: data });
    }
  }

  onChangeEvent = event => {
    if (event.target.value === 'all') {
      this.setState({ selectedEvent: 'all' });
    } else {
      this.setState({ selectedEvent: event.target.value });
    }
    this.filterData(event.target.value);
  };

  filterData = selected => {
    this.filteredData = undefined;
    if (selected === 'all') {
      this.formatData(this.props.reportingEvents);
    } else {
      this.filteredData = {
          ...this.props.reportingEvents,
         events: this.props.reportingEvents.events.filter(({ eventType }) => eventType === selected)
      }
      if (this.filteredData && this.filteredData.events.length > 0) {
        this.formatData(this.filteredData);
      } else {
        this.setState({ selectedEvent: 'all' });
        this.formatData(this.props.reportingEvents);
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.reportingEvents && this.props.reportingEvents !== prevProps.reportingEvents) {
      this.filterData(this.state.selectedEvent);
    }
  }

  render() {
    let typeEventsTemp = [];
    if (this.props.reportingEvents && this.props.reportingEvents.events.length > 0) {
      typeEventsTemp = this.props.reportingEvents.events.filter(
        ({ eventType }, i, events) => events.findIndex(({ eventType: type }) => type === eventType) === i
      );
    }
    return (
      <Wrapper>
        <PageHeader text="Flow Debug Logs">
          <ExportButton
            disabled={!this.state.filteredLogObject}
            onClick={() => {
              downloadFile(
                (this.filteredData) ? JSON.stringify(this.filteredData, null, 2) : this.props.reportingEventsString,
                'text/plain',
                'EventSummary - ' + this.state.value + ((this.state.selectedEvent !== 'all') ? ' - ' + this.state.selectedEvent : ''),
                '.txt'
              );
            }}
          >
            Export
          </ExportButton>
        </PageHeader>
        <Input
          placeholder="Interaction ID"
          value={this.state.value}
          onChange={this.handleValueChange}
          onKeyPress={this.search}
        />
        <SubmitButton disabled={!this.state.value} onClick={this.handleSubmit.bind(this)}>
          <SearchIcon searchIconType="searchBox" size={10} />
        </SubmitButton>
        <ToggleButtons>
          <PrettyButton onClick={this.handleChangeToJsonView} prettyView={this.state.prettyView}>
            Pretty
          </PrettyButton>
          <RawButton onClick={this.handleChangeRawData} prettyView={this.state.prettyView}>
            Raw
          </RawButton>
          <WrapButton onClick={this.handletoggleView} wordwrap={this.state.wordwrap} title="Wrap" disabled={this.state.prettyView}>
            <WordWrap wordWrapIconType="wordWrapOn" size={10} />
          </WrapButton>
          <FiltersSelect
            value={this.state.selectedEvent}
            onChange={this.onChangeEvent}
            disabled={!this.props.reportingEvents}
          >
            <option key="all" value="all">
              All
            </option>
            {typeEventsTemp.map((item, i) =>
              <option key={i} value={item.eventType}>
                {item.eventType}
              </option>
            )}
          </FiltersSelect>
          <Copy onClick={this.copyToClipboard}>
            <CopyIconSVG copyIconType="secondary" size={20} />
          </Copy>
        </ToggleButtons>

        {((!this.state.prettyView && this.state.wordwrap) ||
          (!this.state.prettyView && !this.state.wordwrap)) && (
          <StyledTextArea
            id="rawData"
            value={this.state.filteredLogObject}
            readOnly="true"
            ref={textarea => (this.textArea = textarea)}
          />
        )}
        {this.state.prettyView && (
            <ReactJson
              type="text"
              src={(this.state.filteredLogObject)}
              readOnly="true"
              style={{ border: '1px solid #c8cacc', height: '49em', width: '111em', overflow: 'auto' }}
            />
          )}
      </Wrapper>
    );
  }
}

FlowDebugLogs.propTypes = {
  fetchReportingEvents: PropTypes.func,
  reportingEvents: PropTypes.object,
  reportingEventsString: PropTypes.string,
  reportingEventsRawData: PropTypes.any,
  insideIframe: PropTypes.bool
};
