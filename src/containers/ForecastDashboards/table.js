/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import styled from 'styled-components';
import { LoadingSpinnerSVG, Pagination } from 'cx-ui-components';

const TableWrapper = styled.div`
  width: 60%;
`;

export default class StatTable extends React.Component {
  getTdProps = () => ({ style: { fontSize: '11.5pt' } });
  getTheadProps = () => ({ style: { color: 'grey', fontWeight: 600 } });
  render() {
    return (
      <TableWrapper className="forecastTableWrapper">
        <ReactTable
          columns={this.props.columns}
          data={this.props.data}
          noDataText={this.props.fetching ? <LoadingSpinnerSVG size={60} /> : 'No results found'}
          minRows={0}
          PaginationComponent={Pagination}
          emptyRowsWhenPaging={false}
          getTdProps={this.getTdProps}
          getTheadProps={this.getTheadProps}
        />
      </TableWrapper>
    );
  }
}

StatTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  fetching: PropTypes.bool,
  setShowHideGraph: PropTypes.func
};
