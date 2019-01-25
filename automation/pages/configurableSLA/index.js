const {Element, Brow} = require('cx-automation-utils/pageObject');
       

  const SLAPage = {
    randomNum: Math.floor(Math.random() * 100001),
    randomNum2: Math.floor(Math.random() * 100001),
    thresholdValue: Math.floor(Math.random() * 11 + 1),

    // iframe drop downs and urls
    iframe: new Element('iframe[src="https://dev-config2.cxengagelabs.net/#/configuration/customMetrics"]'),
    linkToSLADocs: new Element('a[href="https://docs.cxengage.net/Help/Content/Configuration/Statistics_Management/About_Statistics_Management.htm"]'),
    statLink: new Element('li[id="statistics-configuration-link"]'),
    configurationDropDown: new Element('dropdown[id="configurationDropConfig"]'),

    //main panel
    firstSLA: new Element('div[class="rt-td"]'),
    nameInput: new Element('input[class="entity-table-filter-column-name"]'),
    newSLANameMainPanel: (randomNum) => new Element(`span[title="${randomNum}"]`),
    newSLADescriptionMainPanel: (randomNum2) => new Element(`span[title="${randomNum2}"]`),
    columnsButton: new Element('.//span[text()="Columns"]'),
    nameCheckbox: new Element('input[value="Name"]'),
    descriptionCheckbox: new Element('input[value="Description"]'),
    metricTypeCheckbox: new Element('input[value="Metric Type"]'),
    statusCheckbox: new Element('input[value="Status"]'),
    nameCol: new Element('span[title="Name"]'),
    descriptionCol: new Element('span[title="Description"]'),
    metricTypeCol: new Element('span[title="Type"]'),
    statusCol: new Element('span[title="Status"]'),

    //side panel
    submitButton: new Element('button[id="sdpanel-submit"]'),
    slaName: new Element('input[id="frm-custom-metrics-name"]'),
    newSLANameSidePanel: (randomNum) => new Element(`input[value="${randomNum}"]`),
    slaDescription: new Element('textarea[id="frm-custom-metrics-description"]'),
    newSLADescriptionSidePanel: (randomNum2) => new Element(`.//textarea[text()="${randomNum2}"]`),
    ignoreAbandonsThresSidePanel: (thresholdValue) => new Element(`input[value="${thresholdValue}"]`),
    abandonThr: new Element('input[id="frm-custom-metrics-sla-abandon-threshold"]'),
    slaThr: new Element('input[id="frm-custom-metrics-sla-threshold"]'),
    ignoreAbandons: new Element('input[value="ignored-abandoned-calls"]'),
    countAganistSLA: new Element('input[value="count-against-sla"]'),
    abandonThresholdlabel: new Element('label[for="slaAbandonThreshold"]'),
    closePanel: new Element('div[id="sdpanel-close-panel"]'),
    slaToggle: new Element('label[id="sdpanel-toggle-status"]'),
    confirmButton: new Element('button[id="confirm"]'),
    disableStatus: new Element('.//div[text()="Disabled"]'),
    enableStatus: new Element('.//div[text()="Enabled"]'),

    navigateToSLAPage: function(){
        this.configurationDropDown.waitAndClick();
        this.configurationDropDown.waitAndClick();
        this.statLink.waitAndClick();
    },

    validateMainPaneElements: function(){
        this.linkToSLADocs.validateElementsState('isExisting', true);
        this.firstSLA.validateElementsState('isExisting', true);
        this.columnsButton.validateElementsState('isExisting', true);
        this.nameCol.validateElementsState('isExisting', true);
        this.descriptionCol.validateElementsState('isExisting', true);
        this.metricTypeCol.validateElementsState('isExisting', true);
        this.statusCol.validateElementsState('isExisting', true);
    },

    editSLA: function(){
        this.firstSLA.waitAndClick();
        this.slaName.setValue(this.randomNum);
        this.slaDescription.setValue(this.randomNum2);
        this.submitButton.waitAndClick();
        Brow.pause(9000);
        this.newSLANameSidePanel(this.randomNum).validateElementsState('isExisting', true);
        this.newSLADescriptionSidePanel(this.randomNum2).validateElementsState('isExisting', true);
        this.closePanel.waitAndClick();
    },

    validateSLAEdit: function(){
        this.nameInput.setValue(this.randomNum);
        this.newSLANameMainPanel(this.randomNum).validateElementsState('isExisting', true);
        this.newSLADescriptionMainPanel(this.randomNum2).validateElementsState('isExisting', true);
    },

    editToIgnoreAbandonsType: function(){
        this.firstSLA.waitAndClick();
        this.ignoreAbandons.waitAndClick();
        Brow.pause(1000);
        this.abandonThresholdlabel.validateElementsState('isExisting', true);
        this.abandonThr.setValue(this.thresholdValue);
        this.submitButton.waitAndClick();
    },

    validateIgnoreAbandonsType: function(){      
        this.slaThr.validateElementsState('isExisting', true);
        this.abandonThresholdlabel.validateElementsState('isExisting', true);
        this.ignoreAbandonsThresSidePanel(this.thresholdValue).validateElementsState('isExisting', true);
    },

    editSLAAbandonType: function(){
        this.firstSLA.waitAndClick();
        this.countAganistSLA.waitAndClick();
        this.abandonThresholdlabel.validateElementsState('isExisting', false);
        this.ignoreAbandonsThresSidePanel(this.thresholdValue).validateElementsState('isExisting', false);
        this.slaThr.setValue(this.randomNum);
        this.submitButton.waitAndClick();
        Brow.pause(5000);
    },

    validateSLAAbandonType: function(){     
        this.slaThr.validateElementsState('isExisting', true);   
        this.abandonThresholdlabel.validateElementsState('isExisting', false);
        this.ignoreAbandonsThresSidePanel(this.thresholdValue).validateElementsState('isExisting', false);
    },

    removeNameCol: function(){
        this.iframe.switchToFrame();
        this.columnsButton.waitAndClick();
        var booleanValue = this.nameCol.isExisting();
        if ( booleanValue === true) {
            this.namecheckbox.waitAndClick();
            this.nameCol.validateElementsState('isExisting', false);
            this.namecheckbox.waitAndClick();
            this.nameCol.validateElementsState('isExisting', true);
        }
        else {
            this.nameCol.validateElementsState('isExisting', true);
        }
    },

    removeDescriptionCol: function() {
        var booleanValue = this.descriptionCol.isExisting();
        if ( booleanValue === true) {
            this.descriptioncheckbox.waitAndClick();
            this.descriptionCol.validateElementsState('isExisting',false);
            this.descriptioncheckbox.waitAndClick();
            this.descriptionCol.validateElementsState('isExisting',true);
        }       
        else {
            this.descriptionCol.validateElementsState('isExisting',true);
        }
    },

    removeMetricTypeCol: function(){
        var booleanValue = this.metricTypeCol.isExisting();
        if ( booleanValue === true) {
            this.metricTypecheckbox.waitAndClick();
            this.metricTypeCol.validateElementsState('isExisting',false);
            this.metricTypecheckbox.waitAndClick();
            this.metricTypeCol.validateElementsState('isExisting',true);
        }
        else {
            this.metricTypeCol.validateElementsState('isExisting',true);
        }       
    },

    removeStatusCol: function(){
        var booleanValue = this.statuscol.isExisting();
        if ( booleanValue === true) {
            this.statusCheckbox.waitAndClick();
            this.statusCol.validateElementsState('isExisting',false);
            this.statusCheckbox.waitAndClick();
            this.statusCol.validateElementsState('isExisting',true);
        }
        else {
            this.statusCol.validateElementsState('isExisting',true);
        }
    },

    toggleSLA: function(){
        var booleanValue = this.disableStatus.isExisting();
        this.slaToggle.waitAndClick();
        this.confirmButton.waitAndClick();
        Brow.pause(8000);
        if ( booleanValue === true) {
            this.enableStatus.validateElementsState('isExisting', true);
        }
        else {
            this.enableStatus.validateElementsState('isExisting', false);
        }
    },

    navigateToHelpLink: function(){
        this.linkToSLADocs.waitAndClick();
        Brow.pause(8000);
    }

  }

module.exports = SLAPage;
