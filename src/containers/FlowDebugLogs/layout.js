import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { PageHeader, SearchIconSVG, WordWrapIconSVG, CopyIconSVG, Toast } from 'cx-ui-components';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';
import { copyToClipboard, downloadFile } from 'serenova-js-utils/browser';

const dataViewStyle = css`
  width: 90em;
  margin: 15px 0 0 0;
  border: 1px solid #c8cacc;
  height: 50em;
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
  color: ${props => (props.prettyView ? 'orange;' : 'black;')};
`;

const ToggleButtons = styled.div`
  margin-top: 15px;
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

const StyledReactJson = styled(ReactJson)`
  ${dataViewStyle};
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
      showData: false,
      prettyView: false
    };
  }

  handleValueChange = event => {
    this.setState({ value: event.target.value });
  };

  copyToClipboard = () => {
    copyToClipboard(this.props.reportingEventsString);
    Toast.success('Copied!');
  };

  handleSubmit() {
    this.props.fetchReportingEvents(this.state.value);
    this.setState({
      showData: true
    });
  }

  handleChangeRawData = () => {
    this.setState({ prettyView: false });
  };

  handleChangeToJsonView = () => {
    this.setState({ prettyView: true });
  };

  handleToggleView = () => {
    this.setState({ prettyView: !this.state.prettyView });
  };

  search = event => {
    if (event.key !== '') {
      this.setState({ showData: true });
    }
  };

  render() {
    return (
      <Wrapper>
        <PageHeader text="Flow Debug Logs">
          <ExportButton
            disabled={!this.state.showData}
            onClick={() => {
              downloadFile(
                this.props.reportingEventsString,
                'text/plain',
                'EventSummary - ' + this.state.value,
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
        <SubmitButton onClick={this.handleSubmit.bind(this)}>
          <SearchIcon searchIconType="searchBox" size={10} />
        </SubmitButton>
        <ToggleButtons>
          <PrettyButton onClick={this.handleChangeToJsonView} prettyView={this.state.prettyView}>
            Pretty
          </PrettyButton>
          <RawButton onClick={this.handleChangeRawData} prettyView={this.state.prettyView}>
            Raw
          </RawButton>
          <WrapButton onClick={this.handletoggleView} prettyView={this.state.prettyView}>
            <WordWrap wordWrapIconType="wordWrapOn" size={10} />
          </WrapButton>
          <Copy onClick={this.copyToClipboard}>
            <CopyIconSVG copyIconType="secondary" size={20} />
          </Copy>
        </ToggleButtons>

        {!this.state.prettyView &&
          this.state.showData && (
            <StyledTextArea
              id="rawData"
              value={this.props.reportingEventsString}
              readOnly="true"
              ref={textarea => (this.textArea = textarea)}
            />
          )}
        {this.state.prettyView &&
          this.state.showData && <StyledReactJson type="text" src={this.props.reportingEvents} />}
      </Wrapper>
    );
  }
}

FlowDebugLogs.propTypes = {
  fetchReportingEvents: PropTypes.func,
  reportingEvents: PropTypes.object,
  reportingEventsString: PropTypes.string
};
