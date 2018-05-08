import React from 'react';
import { shallow, mount } from 'enzyme';
import InteractionMonitoringLayout from '../Layout';

const setCurrentEntityMock = jest.fn();
const fetchDataMock = jest.fn();
const startInteractionMonitoringMock = jest.fn();

describe('Interaction Monitoring Layout', () => {
  const activeColumnsActive = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ];
  it('renders all columns , all columns are active ', () => {
    const component = shallow(
      <InteractionMonitoringLayout
        setCurrentEntity={setCurrentEntityMock}
        fetchData={fetchDataMock}
        startInteractionMonitoring={startInteractionMonitoringMock}
        tableData={[]}
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
        tableData={[{ item1: 'item1', item2: 'item2' }]}
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
        activeColumns={allColumnsNotActive}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
