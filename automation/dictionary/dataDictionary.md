
HOW TO UPDATE THE DICTIONARY?
1. Adding the "data-automation" label for each new field of a component
2. Choosing the label name according to the field type:
    A) Input text - ended with "Input"
    B) Drop Down List (select) - ended with "List" 
    c) Toggle - ended with "Toggle"
    D) Auto Complete Field - ended with "AutoComplete"
    E) Radio Group - ended with "Choose"
    F) Button - ended with "Button"
    G) Searching by Column  - search____Column
    H) Checkbox type elements - ends with checkbox
3. Updating the json dictionary (index.json) to test the new page (automation > dictionary > index.json)


###################
# GENERAL BUTTONS #
###################
Create  |   entityCreateButton
Action  |   actionsButton
Submit  |   submitButton
Cancel  |   cancelButton


#########
# LOGIN #
#########
username        |   username
password        |   password
Sign In Button  |   signInButton
Tenant Button   |   chooseTenantButton


##################
# NAVIGATION BAR #
##################
Management  |   userManagementMenu
Users       |   navigationLinkUsers
Groups      |   navigationLinkGroups
Skills      |   navigationLinkSkills
Roles       |   navigationLinkRoles

Configuration               |   configurationMenu
Lists                       |   navigationLinkLists
Statistics                  |   navigationLinkStatistics
User Management Emails      |   navigationLinkEmailTemplates
Outbound Identifiers        |   navigationLinkOutboundIdentifiers
Outbound Identifier Lists   |   navigationLinkOutboundIdentifierLists
Chat Widgets                |   navigationLinkChatWidgets

Flows                |   flowsMenu
Flows                |   navigationLinkFlows
Dispatch Mappings    |   navigationLinkDispatchMappings

Reporting                   |   reportingMenu
Access Controlled Reports   |   navigationLinkDataAccessReports
Interaction Monitoring      |   navigationLinkInteractionMonitoring


#########
# USERS #
#########
Email                               |   emailInput
Platform Authentication             |   authenticationList
Platform Role                       |   roleList
Single sign on identity provider    |   identityProviderList
Workstation ID                      |   workstationIDInput
Invite now                          |   inviteToggle
Tenant Role                         |   tenantList


##########
# GROUPS #
##########
Name        |  nameInput
Description |	descriptionInput


##########
# SKILLS #
##########
Name            |  nameInput
Description     |	descriptionInput
Has proficiency |   proficiencyToggle


#########
# ROLES #
#########
Name        |  nameInput
Description |	descriptionInput
Shared      |   sharedToggle


########
# LIST #
########
Name        |  nameInput
Shared      |  sharedToggle
List type   |   listTypeList


########################
# OUTBOUND IDENTIFIERS #
########################
Name            |  nameInput
Description     |	descriptionInput
Channel type    |   channelList
Value           |   valueInput
Flow id         |   flowList


##############################
# OUTBOUND IDENTIFIERS LIST #
##############################
Name            |  nameInput
Description     |	descriptionInput


#########
# FLOWS #
#########
Name        |  nameInput
Description |	descriptionInput
Type        |   typeList


######################
# DISPATCH MAPPINGS  #
######################
Name                |   nameInput
Description         |	descriptionInput
Interaction type    |   interactionList
Mapping             |   mappingList
Mapping Value       |   phoneValueInput
Dispatch to flow    |   dispatchList
Interaction type    |   interactionList
Direction           |   directionList


############################
# ACCESS CONTROLLED REPORT #
############################
Name                        |  nameInput
Description                 |	descriptionInput
Type                        |   typeChoose
Realtime Report Type        |   realtimeReportTypeRadio
historical Reports Folders  |   historicalReportAutoComplete
Realtime Report             |   realtimeReportAutoComplete