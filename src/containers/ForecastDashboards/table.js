/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';

import { LoadingSpinnerSVG, Pagination } from 'cx-ui-components';
import { getCurrentDateTime, downloadFile, convertArrayOfObjectToCsv } from 'serenova-js-utils/browser';

const Table = styled(ReactTable)`
  border: 1px solid #656565 !important;
  margin-top: 35px;
  & .rt-thead .rt-th {
    color: #999999 !important;
  }
  & .rt-tbody .rt-td {
    color: #999999 !important;
    border-right: 1px solid #656565 !important;
  }
  & .rt-resizable-header {
    border-right: 1px solid #656565 !important;
  }
  & .rt-tr {
    border-bottom: solid 1px #656565 !important;
  }
`;

const StyledPagination = styled(Pagination)`
  & .Table__pageButton {
    color: grey !important;
  }
  & .Table__pageButton--active {
    color: #fff !important;
  }
  & .pagination-bottom .-pagination {
    color: #999999 !important;
  }
  & .-pageJump input {
    background-color: grey !important;
  }
  & .-selectRows {
    background-color: grey !important;
  }
`;

const TableWrapper = styled.div`
  background-color: rgb(62, 62, 62);
  box-shadow: rgba(0, 0, 0, 0.21) 0px 0px;
  color: #ffffff;
  width: 100%;
  grid-area: table;
  position: relative;
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
  width: 125px;
  border: none !important;
  &:hover {
    color: #cccccc;
  }
  position: absolute;
  right: 0;
`;

class StatTable extends React.Component {
  getTdProps = () => ({ style: { fontSize: '11.5pt' } });
  getTheadProps = () => ({ style: { color: 'grey', fontWeight: 600 } });
  render() {
    return (
      <TableWrapper className="forecastTableWrapper">
        <StyledButton
          onClick={() =>
            downloadFile(convertArrayOfObjectToCsv(this.props.data), 'text/csv', getCurrentDateTime(), '.csv')
          }>
          <FormattedMessage id="button.text.csv" defaultMessage="Save as Csv" />
        </StyledButton>
        <Table
          columns={this.props.columns}
          data={this.props.data}
          noDataText={this.props.fetching ? <LoadingSpinnerSVG size={60} /> : 'No results found'}
          minRows={5}
          PaginationComponent={StyledPagination}
          emptyRowsWhenPaging={false}
          getTdProps={this.getTdProps}
          getTheadProps={this.getTheadProps}
        />
      </TableWrapper>
    );
  }
}

export default injectIntl(StatTable);

StatTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  fetching: PropTypes.bool,
  setShowHideGraph: PropTypes.func,
  children: PropTypes.any,
};
