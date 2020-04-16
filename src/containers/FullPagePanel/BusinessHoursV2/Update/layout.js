import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import SidePanelHeaderContainer from '../SidePanelHeader';
import BusinessHoursV2 from '../../../Form/BusinessHoursV2';
import UpdateBusinessHoursV2Form from '../../../Form/BusinessHoursV2/Update';
import SidePanelActionsContainer from '../../../../containers/SidePanelActions';
import { MixCalendar, DetailHeader, SidePanelTable } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';
import { detailHeaderText } from '../../../../utils';

const SidePanelHeader = styled(SidePanelHeaderContainer)`
  width: 75%;
`;

const HeaderContainer = styled.div`
  min-height: 86px;
  padding: 10px 14px 16px;
`;

const SidePanelActions = styled(SidePanelActionsContainer)`
  width: 25%;
  float: right;
`;

const FieldsColumn = styled.div`
  padding: 10px 14px;
  width: 30%;
  margin-rigth: 35px;
`;

const CalendarColumn = styled.div`
  width: 65%;
`;

const VersionsColumn = styled.div`
  width: 95%;
  margin-left: 50px;
`;

const RowWrapper = styled.div`
  width: 100%;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 55px;
  color: #2e9afe;
`;

const WrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const eventType = [
  {
    id: 0,
    state: true,
    name: 'Regular Hours',
    color: '#51CE90'
  },
  {
    id: 1,
    state: true,
    name: 'One-Time extended Hours',
    color: '#F1D29D'
  },
  {
    id: 2,
    state: true,
    name: 'Blackout Exceptions',
    color: '#F08695'
  },
  {
    id: 3,
    state: true,
    name: 'Blackout One-Time Exceptions',
    color: '#8383FD'
  }
];

const versionsEntitiyTableHeaders = [
  {
    type: 'string',
    name: 'version',
    label: 'Version',
    required: true
  },
  {
    type: 'string',
    name: 'name',
    label: 'Name',
    required: true
  },
  {
    type: 'string',
    name: 'createdBy',
    label: 'Created By',
    required: true
  },
  {
    type: 'string',
    name: 'createdOn',
    label: 'Created On',
    required: true
  }
];

export default class BusinessHoursV2UpdateFullPage extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedEvents: []
    };
  }

  componentDidMount() {
    // Setting the events from the incoming rules of active version
    this.handleSelectedVersionRules();
  }

  componentWillUnmount() {
    this.props.setSelectedBusinessHourVersion(this.props.activeVersion);
  }

  handleSelectedVersionRules = selectedVersion => {
    let rules = this.props.rules;
    if (selectedVersion) {
      this.props.setSelectedBusinessHourVersion(selectedVersion.id);
      rules = selectedVersion.rules;
    }
    let selectedVersionEvents, calendarEventTypeId;
    if (rules.length > 0) {
      selectedVersionEvents = rules.map((rule, index) => {
        switch (rule.type) {
          case 'recurring-hours':
            calendarEventTypeId = 0;
            break;
          case 'one-time-extended-hours':
            calendarEventTypeId = 1;
            break;
          case 'blackout-recurring-exceptions':
            calendarEventTypeId = 2;
            break;
          case 'blackout-one-time-exceptions':
            calendarEventTypeId = 3;
            break;
          default:
            break;
        }
        return {
          id: index,
          title: rule.name,
          ...(rule.hours && { ...rule.hours.allDay } && { allDay: rule.hours.allDay }),
          start: new Date(rule.startDate),
          end: rule.endDate === undefined ? new Date(rule.startDate) : new Date(rule.endDate),
          eventTypeID: calendarEventTypeId
        };
      });
    } else {
      selectedVersionEvents = [];
    }
    this.setState({
      selectedEvents: selectedVersionEvents
    });
  };

  render() {
    return (
      <Fragment>
        <HeaderContainer>
          <SidePanelActions />
          <SidePanelHeader />
        </HeaderContainer>
        <WrapperDiv>
          <FieldsColumn>
            <BusinessHoursV2 />
          </FieldsColumn>
          <CalendarColumn>
            <MixCalendar eventList={this.state.selectedEvents} eventType={eventType} />
          </CalendarColumn>
          <br />
          <RowWrapper>
            <DetailWrapper customCaretIcon="margin-top: 6px;display: inline-block;margin-left: 23px;" open>
              <WrappedDetailHeader
                customLineSpacer="border-top: 1px solid #2E9AFE; flex-grow: 1; margin: 10px 10px 0;align-self: center;"
                fontSize="20px"
                text="Versions"
              />
              <br />
              <VersionsColumn>
                <label>Versioning ({this.props.versions.length} Published)</label>
                <DetailHeader
                  //userHasUpdatePermission={!this.props.versionsFetching && !this.props.inherited && this.props.userHasUpdatePermission} //ToDo
                  text={detailHeaderText(this.props.versions, 'Published')}
                  //onActionButtonClick={() => setSelectedSubEntityId('versions')}  //ToDo
                  inherited={this.props.inherited}
                  open
                />
                <SidePanelTable
                  items={this.props.versions}
                  fields={versionsEntitiyTableHeaders}
                  defaultSorted={[{ id: 'numericOrderVersion', desc: true }]}
                  userHasUpdatePermission={this.props.userHasUpdatePermission}
                  userHasViewPermission={this.props.userHasViewPermission}
                  //copySubEntity={() => alert('Copy Selected')}  //ToDo
                  viewSubEntity={(listItemId, row) => this.handleSelectedVersionRules(row)}
                  fetching={this.props.versionsFetching && !this.props.versions.length}
                  itemApiPending={this.props.itemApiPending}
                />
              </VersionsColumn>
            </DetailWrapper>
          </RowWrapper>
          <br />
          <RowWrapper>
            <UpdateBusinessHoursV2Form rules={this.props.rules} />
          </RowWrapper>
        </WrapperDiv>
      </Fragment>
    );
  }
}

BusinessHoursV2UpdateFullPage.propTypes = {
  versions: PropTypes.array,
  activeVersion: PropTypes.string,
  rules: PropTypes.array,
  setSelectedBusinessHourVersion: PropTypes.func,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasViewPermission: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  userHasSharePermission: PropTypes.bool,
  sharedFormValue: PropTypes.bool,
  itemApiPending: PropTypes.string,
  versionsFetching: PropTypes.bool
};

BusinessHoursV2UpdateFullPage.defaultProps = {
  events: []
};
