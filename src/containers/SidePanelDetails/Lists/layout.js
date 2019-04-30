/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ListsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Detail, DetailHeader, DetailsPanelAlert, FileUpload, FileDownload, SidePanelTable } from 'cx-ui-components';

function ListsDetailsPanel(props) {
  return (
    <div id={props.id} className={props.className}>
      <DetailHeader text="Details" />
      {props.alertMessage && <DetailsPanelAlert text={props.alertMessage} />}
      {props.userHasUpdatePermission && props.children}
      <Detail label="List Type" value={props.listType} />
      {!props.inherited && (
        <React.Fragment>
          <DetailHeader text="Bulk CSV" />
          <FileDownload onClick={props.downloadCsv} disabled={props.isSaving} id="dtpanel-lists-download-csv" />
          <FileUpload
            onFileSelect={props.uploadCsv}
            acceptedFileType=".csv"
            disabled={props.isSaving}
            id="dtpanel-lists-upload-csv"
          />
        </React.Fragment>
      )}
      <DetailHeader
        userHasUpdatePermission={props.userHasUpdatePermission}
        text="List Item(s)"
        onActionButtonClick={props.openCreateListItemModal}
        inherited={props.inherited}
        open
      />
      <SidePanelTable
        tableType={'sidePanel'}
        userHasUpdatePermission={props.userHasUpdatePermission}
        items={props.tableItems}
        fields={props.tableFields}
        updateSubEntity={props.updateSubEntity}
        deleteSubEntity={props.deleteSubEntity}
        inherited={props.inherited}
        itemApiPending={props.itemApiPending}
      />
    </div>
  );
}

ListsDetailsPanel.propTypes = {
  userHasUpdatePermission: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  /** Alert Message will only shown when this prop is used */
  alertMessage: PropTypes.string,
  children: PropTypes.node.isRequired,
  listType: PropTypes.string,
  tableItems: PropTypes.array.isRequired,
  tableFields: PropTypes.array.isRequired,
  openCreateListItemModal: PropTypes.func.isRequired,
  updateSubEntity: PropTypes.func.isRequired,
  deleteSubEntity: PropTypes.func.isRequired,
  inherited: PropTypes.bool,
  isSaving: PropTypes.bool,
  downloadCsv: PropTypes.func,
  uploadCsv: PropTypes.func,
  itemApiPending: PropTypes.string
};

export default ListsDetailsPanel;
