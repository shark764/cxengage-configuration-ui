import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import InteractionMonitoringLayout from '../layout';
import { createStore } from 'redux';
import { fromJS } from 'immutable';
import { mockInteraction } from '../../../tools/testInteractions';
// import { mockStore } from 'TestUtils';

// Observables
import { localStorageSubscribe, localStorageUnsubscribe } from '../localStorageObservable';
import { messageSubscribe, messageUnsubscribe } from '../windowMessageObservable';

export const mockStore = createStore(state =>
  fromJS({
    InteractionMonitoring: {
      data: [],
      sorted: [],
      expanded: {},
      selected: ''
    },
    ColumnFilterMenus: {
      interactionMonitoring: {
        Columns: [
          { name: 'InteractionId', active: true },
          { name: 'Agent', active: true },
          { name: 'CustomerId', active: true },
          { name: 'ContactPoint', active: true },
          { name: 'Flow', active: true },
          { name: 'Channel', active: false },
          { name: 'Direction', active: true },
          { name: 'Presence State', active: false },
          { name: 'Start Date', active: false },
          { name: 'StartTime', active: true },
          { name: 'ElapsedTime', active: true },
          { name: 'Monitoring', active: true },
          { name: 'Groups', active: false },
          { name: 'Skills', active: false }
        ],
        Groups: [],
        Skills: [],
        Direction: [
          { name: 'All', active: true },
          { name: 'Inbound', active: false },
          { name: 'Outbound', active: false }
        ],
        Monitoring: [
          { name: 'All', active: true },
          { name: 'Monitored', active: false },
          { name: 'Not Monitored', active: false }
        ],
        visibleMenu: 'none'
      }
    }
  })
);

// Mock functions
jest.mock('../localStorageObservable');
jest.mock('../windowMessageObservable');
const setCurrentEntityMock = jest.fn();
const fetchDataMock = jest.fn();
const startInteractionMonitoringMock = jest.fn();
const getExtensionsMock = jest.fn();
const extensionsMock = [{ description: 'test-ext-1' }, { description: 'test-ext-2' }];

describe('Interaction Monitoring Layout', () => {
  const activeColumnsActive = [true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  it('renders all columns , all columns are active ', () => {
    const component = shallow(
      <InteractionMonitoringLayout
        setCurrentEntity={setCurrentEntityMock}
        fetchData={fetchDataMock}
        startInteractionMonitoring={startInteractionMonitoringMock}
        tableData={[mockInteraction]}
        expanded={{}}
        selected={'item1'}
        areAllColNotActive={false}
        sorted={{}}
        toggleTimeFormat={() => {}}
        updateTableData={() => {}}
        updateSkillsColumnFilter={() => {}}
        updateGroupsColumnFilter={() => {}}
        setExpanded={() => {}}
        setSelected={() => {}}
        setSorted={() => {}}
        removeSelected={() => {}}
        twelveHourFormat={true}
        activeColumns={activeColumnsActive}
        userHasViewAllMonitoredCallsPermission={false}
        getCurrentAgentId={'0000-0000-0000-0000'}
        pageTitle="mock-title"
        extensions={extensionsMock}
        getExtensions={getExtensionsMock}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('renders no columns , all columns are not active ', () => {
    const allColumnsNotActive = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
    const component = shallow(
      <InteractionMonitoringLayout
        setCurrentEntity={setCurrentEntityMock}
        fetchData={fetchDataMock}
        startInteractionMonitoring={startInteractionMonitoringMock}
        tableData={[mockInteraction]}
        expanded={{}}
        selected={'item1'}
        areAllColNotActive={true}
        sorted={{}}
        toggleTimeFormat={() => {}}
        updateTableData={() => {}}
        updateSkillsColumnFilter={() => {}}
        updateGroupsColumnFilter={() => {}}
        setExpanded={() => {}}
        setSelected={() => {}}
        setSorted={() => {}}
        removeSelected={() => {}}
        twelveHourFormat={false}
        activeColumns={allColumnsNotActive}
        userHasViewAllMonitoredCallsPermission={true}
        getCurrentAgentId={'0000-0000-0000-0000'}
        pageTitle="mock-title"
        extensions={extensionsMock}
        getExtensions={getExtensionsMock}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

describe('Full mount to test lifecycle events', () => {
  const activeColumnsActive = [true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  it('calls componentDidMount', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <InteractionMonitoringLayout
          setCurrentEntity={setCurrentEntityMock}
          fetchData={fetchDataMock}
          startInteractionMonitoring={startInteractionMonitoringMock}
          tableData={[mockInteraction]}
          expanded={{}}
          selected={'item1'}
          areAllColNotActive={true}
          sorted={{}}
          toggleTimeFormat={() => {}}
          updateTableData={() => {}}
          updateSkillsColumnFilter={() => {}}
          updateGroupsColumnFilter={() => {}}
          setExpanded={() => {}}
          setSelected={() => {}}
          setSorted={() => {}}
          removeSelected={() => {}}
          twelveHourFormat={true}
          activeColumns={activeColumnsActive}
          userHasViewAllMonitoredCallsPermission={true}
          getCurrentAgentId={'0000-0000-0000-0000'}
          pageTitle="mock-title"
          extensions={extensionsMock}
          getExtensions={getExtensionsMock}
        />
      </Provider>
    );
    expect(localStorageSubscribe).toHaveBeenCalled();
    expect(messageSubscribe).toHaveBeenCalled();
    expect(setCurrentEntityMock).toHaveBeenCalled();
    expect(fetchDataMock).toHaveBeenCalled();
    expect(startInteractionMonitoringMock).toHaveBeenCalled();
    wrapper.unmount();
    expect(localStorageUnsubscribe).toHaveBeenCalled();
    expect(messageUnsubscribe).toHaveBeenCalled();
    expect(getExtensionsMock).toHaveBeenCalled();
  });
});

describe('Interaction monitoring methods', () => {
  const activeColumnsActive = [true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  const interactionMonitoring = shallow(
    <InteractionMonitoringLayout
      setCurrentEntity={setCurrentEntityMock}
      fetchData={fetchDataMock}
      startInteractionMonitoring={startInteractionMonitoringMock}
      tableData={[mockInteraction]}
      expanded={{}}
      selected={'0000-0000-0000-0000'}
      areAllColNotActive={true}
      sorted={{}}
      toggleTimeFormat={() => 'time was toggled'}
      updateTableData={() => {}}
      updateSkillsColumnFilter={() => {}}
      updateGroupsColumnFilter={() => {}}
      setExpanded={() => {}}
      setSelected={() => ({ answerKey: 'selected' })}
      setSorted={sortedThing => ({ answerKey: sortedThing })}
      removeSelected={() => ({ answerKey: 'removed' })}
      twelveHourFormat={true}
      activeColumns={activeColumnsActive}
      monitoredId={'0000-0000-0000-0002'}
      userHasViewAllMonitoredCallsPermission={true}
      getCurrentAgentId={'0000-0000-0000-0000'}
      pageTitle="mock-title"
      extensions={extensionsMock}
      getExtensions={getExtensionsMock}
    />
  );
  describe('getTableRowProps', () => {
    it('should return an empty style object when no rowInfo is provided', () => {
      expect(interactionMonitoring.instance().getTableRowProps()).toEqual({
        style: {}
      });
    });
    it('the row your on is the selected row , clicking it will call remove selected', () => {
      expect(
        interactionMonitoring
          .instance()
          .getTableRowProps({ state: {} }, { row: { interactionId: '0000-0000-0000-0000', monitoring: [] } })
          .onClick().answerKey
      ).toEqual('removed');
    });
    it('the row is not currently selected  , clicking it will call the setSelected', () => {
      expect(
        interactionMonitoring
          .instance()
          .getTableRowProps({ state: {} }, { row: { interactionId: '0000-0000-0000-0001', monitoring: [] } })
          .onClick().answerKey
      ).toEqual('selected');
    });
    it('the row your on is the monitored interaction  , should have style applied', () => {
      expect(
        interactionMonitoring
          .instance()
          .getTableRowProps({ state: {} }, { row: { interactionId: '0000-0000-0000-0002', monitoring: [] } }).style
      ).toEqual({ background: 'rgba(253, 255, 50, 0.17)' });
    });
    it('the row your on is not the monitored interaction  , should not have style applied', () => {
      expect(
        interactionMonitoring
          .instance()
          .getTableRowProps({ state: {} }, { row: { interactionId: '0000-0000-0000-0003', monitoring: [] } }).style
      ).toEqual({ background: null });
    });
  });
  describe('onSortedChange', () => {
    it('pass the sorted value to the set sortedd prop', () => {
      expect(interactionMonitoring.instance().onSortedChange('sortedItem').answerKey).toEqual('sortedItem');
    });
  });
  describe('getTdProps', () => {
    it('returns the proper style object', () => {
      expect(interactionMonitoring.instance().getTdProps().style).toEqual({
        fontSize: '11.5pt'
      });
    });
  });
  describe('getTheadProps', () => {
    it('returns the proper style object', () => {
      expect(interactionMonitoring.instance().getTheadProps().style).toEqual({
        color: 'grey'
      });
    });
  });
  describe('defaultFilterMethod', () => {
    it('is case in-sensitive', () => {
      expect(
        interactionMonitoring
          .instance()
          .defaultFilterMethod(
            { value: 'compare-me', id: '0000-0000-0000-0000' },
            { '0000-0000-0000-0000': 'ComPare-Me' }
          )
      ).toEqual(true);
      expect(
        interactionMonitoring
          .instance()
          .defaultFilterMethod(
            { value: 'COMPARE-me', id: '0000-0000-0000-0000' },
            { '0000-0000-0000-0000': 'compare-ME' }
          )
      ).toEqual(true);
    });
  });

  describe('highlightRow', () => {
    it('returns true when interaction ids match a moniters agent id', () => {
      expect(
        interactionMonitoring.instance().highlightRow({
          row: {
            interactionId: '0000-0000-0000-0000',
            monitoring: [
              {
                agentId: '0000-0000-0000-0000',
                endTimestamp: null
              }
            ]
          }
        })
      ).toEqual(true);
    });

    it('returns false when interaction ids dont match a moniters agent id', () => {
      expect(
        interactionMonitoring.instance().highlightRow({
          row: {
            interactionId: '0000-0000-0000-0001',
            monitoring: [
              {
                agentId: '0000-0000-0000-0001',
                endTimestamp: null
              }
            ]
          }
        })
      ).toEqual(false);
    });

    it('returns false when interaction ids match a moniters agent id but end timestamp is not null', () => {
      expect(
        interactionMonitoring.instance().highlightRow({
          row: {
            interactionId: '0000-0000-0000-0000',
            monitoring: [
              {
                agentId: '0000-0000-0000-0000',
                endTimestamp: 'notNull'
              }
            ]
          }
        })
      ).toEqual(false);
    });
  });

  describe('onFilteredChange', () => {
    it('passes filtered item to components state', () => {
      interactionMonitoring.instance().onFilteredChange('filteredItem');
      expect(interactionMonitoring.state('filtered')).toEqual('filteredItem');
    });
  });
  describe('toggleTimeFormat', () => {
    it('triggers the toggle time format prop', () => {
      expect(interactionMonitoring.instance().toggleTimeFormat()).toEqual('time was toggled');
    });
  });
  describe('SubComponent', () => {
    // ({ row: {startTimestamp, agentName, direction, channel, contactPoint, flowName, customer, monitoring} })
    it('renders the sub compnent given the correct inputs', () => {
      expect(
        interactionMonitoring.instance().SubComponent({
          row: {
            startTimestamp: 'start',
            agentName: 'agent one',
            direction: 'inbound',
            channel: 'voice',
            contactPoint: '+115064561',
            flowName: 'flowName',
            customer: '+15064567',
            monitoring: []
          }
        })
      ).toMatchSnapshot();
    });
  });
});
