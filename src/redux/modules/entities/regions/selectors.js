import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

const regions = state => state.getIn(['Entities', 'regions', 'data']);

export const getRegions = createSelector(
  regions,
  regions =>
    regions && regions.size > 0
      ? regions.sort((a, b) => (a.get('description').toUpperCase() < b.get('description').toUpperCase() ? -1 : 0))
      : List()
);

export const selectRegionsDropDownList = createSelector([getRegions], regions =>
  regions.map(region => ({ label: region.get('description'), value: region.get('id') }))
);

export const getCurrentRegionId = createSelector(
  regions,
  regions => (regions && regions.size > 0 ? regions.map(region => region.get('id')).get(0) : Map({}))
);
