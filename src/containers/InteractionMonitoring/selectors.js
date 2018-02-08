import { createSelector } from 'reselect';

const selectInteractionMonitoringMap = state =>
  state.get('InteractionMonitoring');

export const selectInteractionMonitoring = createSelector(
  selectInteractionMonitoringMap,
  interactionMonitoring => interactionMonitoring
);

export const selectInteractionMonitoringTableData = createSelector(
  selectInteractionMonitoringMap,
  subState => {
    console.log(subState.toJS());
    return subState.toJS();
  }
  // // console.log(subState.get("tableData").size);
  // if (subState.get("data").size === 0) {
  //   //   console.log(subState.get("tableData"));
  //   return [];
  // } else {
  //   //   console.log(subState.get("tableData"));
  //   return [subState.get("data")];
  // }
  //   }
);
