# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Alpha User Acceptance Testing]
- Bulk actions
- Chat Widgets
- Queues
- Transfer Lists

## [Beta User Acceptance Testing]
- Skills
- Groups
- Users
- Interaction Monitoring
- Outbound Identifiers / Outbound Identifier Lists
- Roles (permissions)
- Flows

## [0.56.2] - 2019-02-27
### Changed
- CXV1-16890 - Changing sort method for fakeVersion column on Flows page.
- Version bump component library to 0.36.3.

## [0.56.1] - 2019-02-27
### Added
- CXV1-13311 - Created and Updated now show by whom.

## [0.56.0] - 2019-02-27
### Added
- CXV1-16883 - Added dispatch mappings page

## [0.55.0] - 2019-02-26
### Added
- CXV1-15515 - Bulk actions added to Users page.

## [0.54.5] - 2019-02-25
### Changed
- CXV1-17094 - Switched Login details with Tenant Details in create/update users page.

## [0.54.4] - 2019-02-22
### Fixed
- Active Flow column was changed to Active Version.
- Active Version column now has search icon.
- Required drop-down on Flows page don't have empty option anymore.
- Validation message for Active Version on Flow form was changed.
- Active Version field now shows number version.
### Changed
- Version bump component library to 0.36.2.

## [0.54.3] - 2019-02-22
### Fixed
- Published versions sidepanel table now shows whole datetime format on Flows page.

## [0.54.2] - 2019-02-21
### Fixed
- Edit version on Flows page shows just Name inputText. The rest of cases shows Name and Description inputTexts.

## [0.54.1] - 2019-02-21
### Fixed
- Copy flow and draft form now activate submit button if no error exists.
- Created On column now shows date and time formatted.
### Changed
- Version bump component library to 0.36.1.

## [0.54.0] - 2019-02-18
### Added
- Basic Transfer Lists page in alpha phase
### Changed
- sdk bump to version 8.50.0

## [0.53.0] - 2019-02-13
### Added
- CXV1-16890 - New Sidepanel Table for published versions on Flows page.
- CXV1-16891 - New Sidepanel Table for drafts on Flows page.
#### Changed
- SDK Version Bump 8.47.0.
- Version bump component library to 0.36.0.
- Making Flows page Beta Feature

## [0.52.3] - 2019-02-12
### Added
- CXV1-16818 - Added warning on Shared change to 'true', just like Presence Reason Lists
### Fixed
- CXV1-16878 - Issues saving a Reason List that actually contained Reasons, most likely done through ConfigUI, in which reasons were deleted on saved, making the Reason List to be disabled automatically. Added a little TODO so we can remove the initialization once the component for adding Reasons is completed.

## [0.52.2] - 2019-02-12
### Fixed
- CXV1-17080 - Fixed permissions for assigning outbound identifiers to groups and skills
- CXV1-17026 - Default sorted roles main table name column a-z

## [0.52.1] - 2019-02-07
### Changed
- Added Unit Tests for new functions in selectors file.
### Fixed
- PropTypes missing in columns definition were added to avoid warning messages.

## [0.52.0] - 2019-02-07
### Added
- CXV1-17031 - View permissions for groups and skills side panel tables
- CXV1-17026 - search icon now shows on text filter fields
- CXV1-17026 - users page now has one column for name
- CXV1-17026 - name columns default sort alphabetically
#### Fixed
- No Ticket - fixed issue with permissions column filter not working

## [0.51.0] - 2019-02-06
### Added
- CXV1-17031 - View permissions for users page side panel tables

## [0.50.1] - 2019-02-06
### Fixed
- Issue with Presence Reason Lists folder names for build

## [0.50.0] - 2019-02-04
### Added
- CXV1-16818 - Added Presence Reason List Page

## [0.49.1] - 2019-02-01
### Changed
- Added confirmation dialog when changing hasProficiency on Skills page.
- Version bump component library to 0.32.15.
- SDK Version Bump 8.42.1.

## [0.49.0] - 2019-01-28
### Added
- CXV1-16867 - Status column for Outbound Identifier page.
- CXV1-16866 - Status column for Outbound Identifier List page.
- Confirmation dialog when toggling item status on sidePanel and modal.
- CXV1-16775 - Coverage of 100% of Unit Test for selectors and listItemSelectors files.
### Changed
- Version bump component library to 0.32.13.
- SDK Version Bump 8.42.0.
### Fixed
- Outbound Identifier validation is asking for channelType and flowId instead of default values.

## [0.48.3] - 2019-01-25
### Changed
- CXV1-16862 - Updated help link for Outbound Identifier page.
- CXV1-16863 - Updated help link for Outbound Identifier List page.
### Fixed
- Hygen templates using entityName correctly camelCase format.

## [0.48.2] - 2019-01-25
### Fixed
- Fixed loading state on data access controls

## [0.48.1] - 2019-01-25
### Changed
- Hygen templates updates to match new entities structure.

## [0.48.0] - 2019-01-25
### Added
- Main Queues entity page
- Main Flows entity page

## [0.47.3] - 2019-01-23
### Changed
- CXV1-16684 - Value field validation is triggered when channelType is changed.
- SDK Version Bump 8.39.0.

## [0.47.2] - 2019-01-23
### Fixed
- Jenkins - Regression only happens on pull request

## [0.47.1] - 2019-01-23
### Fixed
- CXV1-15327 - Hide monitor call button if user doesnt have permissions

## [0.47.0] - 2019-01-22
### Added
- CXV1-16502 - Presence Reasons Page.

## [0.46.0] - 2019-01-21
### Added
- CXV1-16684 - Value is now validated against channel type on outbound identifiers page.

## [0.45.0] - 2019-01-21
### Fixed
- CXV1-16750 - Changed beta features to only change on submit instead of one at a time
### Added
- CXV1-16398 - Added loading state for sidepanel table actions
- Added the beginning of the users page automation directly through config 2

## [0.44.4] - 2019-01-21
### Fixed
- CXV1-16774 - ConfirmationDialog shows correct message on disabling user status.
### Changed
- Version bump component library to 0.32.11.
- SDK Version Bump 8.38.2.

## [0.44.3] - 2019-01-21
### Fixed
- CXV1-16776 - Editable input is not disappearing if value is removed for proficiency column.
### Changed
- Version bump component library to 0.32.10.

## [0.44.2] - 2019-01-17
### Changed
- CXV1-16769 - "All active" filter option on Users page was changed to "All non-disabled".
- Version bump component library to 0.32.9.
### Fixed
- CXV1-16776, CXV1-16713 - Proficiency column now shows editable input only if skill needs a value and logged in user has permission.

## [0.44.1] - 2019-01-16
### Fixed
- CXV1-16081 - Updated "Use Tenant Default: Enabled" option for Create User form.

## [0.44.0] - 2019-01-16
### Added
- CXV1-16769 - New filters "All active" and "All non-active" were added to Platform Status column on Users page.
### Fixed
- CXV1-16774 - Toggling user status on Users page now shows correct message.

## [0.43.1] - 2019-01-16
### Changed
- SDK Version Bump 8.37.2

## [0.43.0] - 2019-01-15
### Added
- CXV1-16706 - Function to determine if user is a platform administrator.
- CXV1-16713 - Sidepanel contents now has read-only and manage view according to association permissions.
### Changed
- CXV1-16706 - Reset password button now is visible only if user has MANAGE_ALL_USER_PASSWORDS permission.

## [0.42.9] - 2019-01-15
### Changed
- CXV1-16737 - Updated user invite confirm boxes to match config1
### Added
- Added resend invite to expired users

## [0.42.8] - 2019-01-15
### Fixed
- CXV1-16081 - fixed option for Platform Authentication, it is back as "Use Tenant Default: Enabled"

## [0.42.7] - 2019-01-15
### Fixed
- CXV1-16736 - Now users table on groups and skills doesn't auto close by default
- Added missing inheritance to groups page users table

## [0.42.6] - 2019-01-15
### Fixed
- CXV1-16667 - Fixed issues with adding and removing skills with proficiency values

## [0.42.5] - 2019-01-11
### Fixed
- Email validation for Create User
- If the email entered in the form exists in the tenant, side panel changes to Update state automatically.
- It shows a banner when the email exists in the platform but is not on the tenant, just like Config-UI

## [0.42.4] - 2019-01-11
### Fixed
- Platform authentication field reflects proper value for logged in user

## [0.42.3] - 2019-01-11
### Fixed
- Invite now toggle on create user now sends the api call to set users status to invited
### Added
- Confirmation dialog for invite, resend invite, cancel invite,  and reset password

## [0.42.2] - 2019-01-11
### Fixed
- Platform status on users page side panel now reflects the users invitation status
- Changing users platform authentication now reflects proper values for noPassword field

## [0.42.1] - 2019-01-10
### Fixed
- Re-init users form properly on fetching user data
- Made it so empty phone or sip fails validation

## [0.42.0] - 2019-01-10
### Added
- Users page reset password button
- Users page resend invite button
- Users page cancel invite button

## [0.41.7] - 2019-01-10
### Fixed
- CXV1-16698 - Skills section was closed by default on Users page to avoid empty table when a user is selected.

## [0.41.6] - 2019-01-10
### Changed
- CXV1-16664 - Status column for Skills section has been added again to Users page.
- User name was changed to firstName and lastName concatenated into a single column for entity dependent items.
### Fixed
- CXV1-16665 - Items available for Groups and Skills pages are no longer showing "undefined" on title

## [0.41.5] - 2019-01-09
### Fixed
- CXV1-16611 - Users page now is sending null when externalId is empty.
- Platform details are not shown on creating user.
### Changed
- CXV1-16600 - Errors when proficiency is set to values out of range are more descriptive.

## [0.41.4] - 2019-01-09
### Fixed
- CXV1-15509 - Fixed multiple issues with the users extensions form field
### Changed
- Updated beta features page disclaimer and style

## [0.41.3] - 2019-01-07
### Changed
- SDK Version Bump 8.37.1
- Utils Version bump to 1.6.2

## [0.41.2] - 2019-01-07
### Fixed
- CXV1-16600 - Removing proficiency value on Skills page now throws correct error message.
- CXV1-16599 - Proficiency column now is shown only when Skill has proficiency toggle on.

## [0.41.1] - 2018-12-18
### Fixed
- CXV1-16327 - Fixed issue with email validation, also if there is a duplicate email in the tenant.

## [0.41.0] - 2018-12-18
### Added
- Ability to change skill proficiency on users page
- Ability to change skill proficiency on skills page

## [0.40.7] - 2018-12-12
### Fixed
- Fixed issues with re-ordering users extensions
- Consolidated users page default initial form values
### Added
- Better extensions validation , description is now required
- Status column to the message templates tables on users page


## [0.40.6] - 2018-12-12
### Added
- CXV1-16327 - Users form validation

## [0.40.5] - 2018-12-12
### Added
- CXV1-15514 - ability to change users capacity rule

## [0.40.4] - 2018-12-06
### Fixed
- CXV1-16385 - Fixed error that broke users page when they did not have IDP's.

## [0.40.3] - 2018-12-06
### Fixed
- Set side panel widths to individual pages

## [0.40.2] - 2018-12-06
### Fixed
- Issues with default table filters
- Missing add button for DAC and generic lists

## [0.40.1] - 2018-12-06
### Fixed
- Formated modal titles for entities
- Hid roles entity toggle

## [0.40.0] - 2018-12-05
### Added
- CXV1-16353 - Status column to Groups / Skills / Users Pages.

## [0.39.4] - 2018-11-29
### Fixed
- Array filtering for Permissions, this update will allow the users to be displayed to use a single, multiple or no permission at all to bring users for display.

## [0.39.3] - 2018-12-01
### Changed
- Added default filter for status columns in entity table.
- Version bump component library to 0.31.2.

## [0.39.2] - 2018-11-30
### Changed
- CXV1-16066 - Added default filter for columns in sidePanel and modal table.
- Version bump component library to 0.31.2.

## [0.39.1] - 2018-11-28
### Changed
- CXV1-16066 - Added Platform Status column and filter using combobox type.
- Version bump component library to 0.31.0

## [0.39.0] - 2018-11-28
### Added
- Ability to create/update/remove users extensions from the users page

## [0.38.4] - 2018-11-28
### Changed
- Version bump component library to 0.29.10.

## [0.38.3] - 2018-11-26
### Fixed
- CXV1-16255 - SidePanelHeader and ConfirmationDialog were showing non-formatted name for entity.

## [0.38.2] - 2018-11-26
### Fixed
- Names for Standard Dashboards were not matching RTD names.

## [0.38.1] - 2018-11-23
### Fixed
- realtimeReportId was sending nil value to SDK.

### Changed
- Getting standardDashboards data was moved to selectors.

## [0.38.0] - 2018-11-21
### Changed
- Adding realtimeReportId to SDK call for Data Access Control
- Version bump SDK to 8.33.0

## [0.37.17] - 2018-11-21
### Fixed
- CXV1-16120 - Upgrading immutable to 4.0.0 was breaking TemplateTextEditorField component.

## [0.37.16] - 2018-11-20
### Fixed
- Name of entity displayed on header was showing undefined.

## [0.37.15] - 2018-11-20
### Fixed
- Create user form page bugs.

## [0.37.14] - 2018-11-16
### Fixed
- Users can be added to DAC only if they have ASSIGNED_REPORTS_READ permissions
### Added
- Function in Users selector, so you can pass an array of permissions to selectAvailableEntityMembersForList to get only the users that have one or more permissions.

## [0.37.13] - 2018-11-16
### Changed
- Version bump component library to 0.29.9
- Version bump SDK to 8.32.1

## [0.37.12] - 2018-11-15
### Fixed
- Can now update all users fields in update users form
- Can now toggle users tenant status on user update / create form

## [0.37.11] - 2018-11-14
### Changed
- Version bump component library to 0.29.8

### Fixed
- CXV1-15957 - Has proficiency toggle had to be disabled once is set to true.
- When creating a skill, couldn't save entity with hasProficiency set to true.

## [0.37.10] - 2018-11-13
### Fixed
- Fixed nulls in names for DAC, now it shows empty spaces.

## [0.37.9] - 2018-11-13
### Changed
- Version bump component library to 0.29.6
- Version bump SDK to 8.31.1

### Fixed
- CXV1-16020 - Mouse over add/remove sidePanel buttons was showing undefined for users name.

## [0.37.8] - 2018-11-12
### Fixed
- Fixed label for Historical Reports Folder in DAC

## [0.37.7] - 2018-11-08
### Changed
- Version bump component library to 0.29.4

## [0.37.6] - 2018-11-08
### Changed
- CXV1-15995 - Help link for Access Control is pointing to correct documentation link.

### Fixed
- CXV1-15972 - Members for Access Control and Roles were updating wrong with full form.
- Added a debounceTime for Access Control and Roles to avoid double call to SDK on double click.

## [0.37.5] - 2018-11-08
### Fixed
- Can now see the whole drop down of report lists when creating data access control

## [0.37.4] - 2018-11-08
### Changed
- Version bump component library to 0.29.3

## [0.37.3] - 2018-11-07
### Fixed
- CXV1-15972 - Adding/Removing members from entity was cleared the rest of inputs.
- DAC was not validating if user typed not existing report/folder.

## [0.37.2] - 2018-11-07
### Changed
- Refactoring selectors for Access Control and Roles.
- SDK call is not sending keys for members not needed.

## [0.37.1] - 2018-11-06
### Changed
- Bump version for components library to 0.29.1.
- Bump version for SDK to 8.29.0.

## [0.37.0] - 2018-11-05
### Added
- CXV1-14795 - Create Access Control Page with Table Config.
- CXV1-14812 - Create Access Controlled Reports Side Panel Form.

### Fixed
- CXV1-15428 - Fixed bug where input values were not cleared when creating new outbound identifier

## [0.36.0] - 2018-11-05
### Added
- Users page.. ability to add and remove
  outbound identifier lists,
  message templates,
  skills,
  groups,
  transfer lists,
  presence reasons

## [0.35.0] - 2018-11-05
### Added
- Skills and groups members lists.. ability to add and remove outbound identifier lists

## [0.34.0] - 2018-11-01
### Added
- Skills and groups members lists.. ability to add and remove members

## [0.33.1] - 2018-10-29
### Added
- Unit-test for Roles.

### Fixed
- Fixed warnings and issues on files.
- Removing unused files and references.

## [0.33.0] - 2018-10-29
### Added
- Skills and groups members lists

### Fixed
- updated sdk version to match config-ui


## [0.32.0] - 2018-10-26
### Added
- CXV1-15517 - Adding Users Page.
- Function to get and map platform roles.

## [0.31.3] - 2018-10-26
### Fixed
- CXV1-15468 - Fixing incorrect Help Link for Configurable SLA.

## [0.31.2] - 2018-10-25
### Added
- CXV1-15468 - Adding Help Link for Configurable SLA.

## [0.31.1] - 2018-10-25
### Changed
- Bump version for components library to 0.28.1.

### Fixed
- CXV1-15842 - After disabling entity, toggle field in sidepanel header disappears.

## [0.31.0] - 2018-10-23
### Added
- CXV1-15517 - Adding Groups Page.
- CXV1-15516 - Adding Skills Page.
- Added selectors for users.

### Changed
- CXV1-15472 - Show disabled Configurable SLA form for users with only read permissions.
- Fixed selectors for Access Control.
- Refactored forms and sidePanel to new standard.
- Consolidation of entities attributes to metaData.

## [0.30.0] - 2018-10-22
### Added
- Access to read-only version of redux dev tools in production builds
- Named redux stores for faster identification

## [0.29.3] - 2018-10-19
### Changed
- fix jenkins auto deploy to dev

## [0.29.2] - 2018-10-19
### Changed
- jenkins workflow to do tests in parallel
- jenkins workflow to use existing jenkins job to deploy to dev instead of having it's own

## [0.29.1] - 2018-10-17
### Fixed
- hygen consolidation

## [0.29.0] - 2018-10-15
### Added
- Component to be able to expand or collapse side panel details CXV1-14811

## [0.28.3] - 2018-10-12
### Added
- Help text to label for inputTexts

### Fixed
- Fixed issue with SLA sidePanel where values were not shown to user with read permission

## [0.28.2] - 2018-10-11
### Changed
- Fixed issue with SLA form where Abandon Types had backwards help text

## [0.28.1] - 2018-10-11
### Changed
- Fixed bug with required boolean values for generic list's items

## [0.28.0] - 2018-10-11
### Added
- Added ability to login to config 2 directly

### Changed
- Merged Startup components duties into login component

## [0.27.2] - 2018-10-10
### Changed
- Fixed bug where you couldn't remove list items

## [0.27.1] - 2018-10-10
### Changed
- Changed hygen templates destiny route to coincide with real filename

## [0.27.0] - 2018-10-09
### Added
- Error handling on bulk action failures
- Inheritance for roles page
- Actions button with ability to select or deselect all visible or all items in a table for bulk actions
- Columns filter button for all entity tables, columns filters persist in localstorage
- Created a generic column constructor for react table columns for faster column generation when it's a simple text column
- Can only see beta features for which you have existing permissions for

### Changed
- Refactored entity tables column config to come from the entity metadata file
- sdk promise to use a uuid to validate message transmission between iframes

## [0.26.2]
* CXV1-15437 - Submitting form toggles status on Outbound Identifiers, Outbound Identifier List and Custom Metrics.
* CXV1-15422 - Update references from utils inside each repo to serenova-js-utils.
* <no-jira> - Update Custom Metrics epic to clear slaAbandonThreshold value.

## [0.26.1]
* CXV1-15319 - Fixed download button for generic lists

## [0.26.0]
* <no-jira> - Added roles page feature flagged

## [0.25.2]
* CXV1-15053 - Outbound Identifiers - Able to add duplicate identifier to list.
* CXV1-15151 - Rename attributes customMetricsId, customMetricsName on SLA form to coincide with API new fixes.
* CXV1-15344 - Branded help links in config2.

## [0.25.1]
* <no-jira> - Hygen templates added/refactorized for form, SidePanelDetails and Unit testing.
* CXV1-15042 - config-2 tech debt - change filenames of Layout.js.

## [0.25.0]
* CXV1-14889 - Chat widget page
* CXV1-14892 - Chat widget form
* CXV1-15343 - support for bulk actions (feature flagged)

## [0.24.11]
* <no-jira> - Version bump for cx-ui-components related to missing id/className in column filters for automation traversal.

## [0.24.10]
* <no-jira> - Added missing entity metadata for groups, skills, and customMetrics

## [0.24.9]
* <no-jira> - Version bump for cx-ui-components related to missing id/className Generic Lists for automation traversal.

## [0.24.8]
* CXV1-15040 - save all entity metadata in a single place

## [0.24.7]
* <no-jira> - Version bump for cx-ui-components related to Generic Lists for automation traversal.

## [0.24.6]
* CXV1-15215 - Update Generic Lists page for automation traversal.

## [0.24.5]
* CXV1-15277 - Outbound Identifiers - Switching between lists quickly causes issues.

## [0.24.4]
* <no-jira> - change from private to published package.json

## [0.24.3]
* <no-jira> - Publish automation specs to npm

## [0.24.2]
* CXV1-15088 - Silent Monitoring - Handle sqs session being lost or dropped

## [0.24.1]
* CXV1-15087 - Silent Monitoring - Unmuting a silent monitoring PSTN call before connecting kills interaction.
* CXV1-15088 - Silent Monitoring - Errors are not being caught and we do not dismiss the iframe.
* CXV1-15089 - Silent Monitoring - Mute button state stored and persists during subsequent silent monitoring calls.

## [0.24.0]
* CXV1-14785 - Create SLA Side panel form.

## [0.23.2]
* CXV1-15089 - Silent Monitoring - Mute button state stored and persists during subsequent silent monitoring calls.

## [0.23.1]
* CXV1-14932 - Outbound Identification Lists side panel table and modal

## [0.23.0]
* CXV1-14784 - added table config for Custom Metrics (SLA)

## [0.22.1]
* <no-ticket> - Fixed bug with redux forms not remounting, causing forms not to update properly when switching beteween them

## [0.22.0]
* CXV1-13352 - Outbound Identifiers - Create outbound identifiers lists page.

## [0.21.11]
* CXV1-14739 - Silent Monitoring - 12h format causing issues when filtering on the 12th hour.

## [0.21.10]
* CXV1-14874 - Move config-2 forms out of the component library and into config-2 repo.

## [0.21.9]
* CXV1-14752 - Silent Monitoring - Cannot Read property "SilentMonitor" of undefined when using PSTN

## [0.21.8]
* CXV1-13462 - Version bump for cx-ui-components related to Generic Lists Names and Keys hover tooltip.

## [0.21.7]
* Jenkins build improvments 3

## [0.21.6]
* Jenkins build improvments 2

## [0.21.5]
* Jenkins build improvments (Broken)

## [0.21.4]
* CXV1-14541 - Silent Monitoring - Skills and Groups filters not working properly
* CXV1-14656 - Silent Monitoring - 24 hour format shows "AM" in filter
* CXV1-14693 - Silent Monitoring - Cannot switch monitored interactions
* <no jira>  - Silent Monitoring - Moved from session based calls to keeping session alive

## [0.21.3]
* CXV1-14543 - Silent Monitoring - Start time / Elapsed time filter issues and other minor css fixes

## [0.21.2]
* CXV1-14539 - Silent Monitoring - "All" checkbox not clickable under columns
* CXV1-14540 - Silent Monitoring - Groups and Skills UX issues
* CXV1-14542 - Silent Monitoring - Start Date Filter Issue
* CXV1-14543 - Silent Monitoring - Start time / Elapsed time filter issues.
* CXV1-14588 - Silent Monitoring - Only filtering on enabled filters causes issues when voice is default filter value for channel
* CXV1-14591 - Silent Monitoring - Ellipsis could use on hover tooltips
* CXV1-14590 - Silent Monitoring - Disabled groups and skills appear in drop down menu

## [0.21.1]
* CXV1-13838 - Fix create lists

## [0.21.0] (Broken)
* CXV1-12475 - outbound identifiers page

## [0.20.0] (Broken)
* CXV1-13838 - Added shared toggle to list form

## [0.19.24]
* CXV1-12637 - Unit tests for silent monitoring
* CXV1-14197 - Fix for groups and skills filtering (Interaction Monitoring)
* CXV1-14198 - By default only show voice interactions (Interaction Monitoring)

## [0.19.23]
* CXV1-14040 - Email Template Help URL Incorrect - should navigate to updating_email_templates

## [0.19.22]
* <no-ticket> - css issue with columns not lining up , scrollbar was pushing columns to the left
* <no-ticket> - fixed bug where you couldn't monitor a call right after an exisiting one as it was waiting for the twilio enabled signal

## [0.19.21]
* CXV1-13933 - Share state from supervisor toolbar to interaction monitoring table

## [0.19.20]
* CXV1-13328 - Fixed issue with Submit button not being grayed out when required fields have no value
* CXV1-13345 - Version bump for new cx-ui-components update to apply custom branding to table nav buttons

## [0.19.19]
* CXV1-9940 - Make silent monitoring start session on calls and not page start

## [0.19.18]
* CXV1-13304 - Make proper sub module for emailTemplates. Move container selectors into submodules.

## [0.19.17]
* CXV1-13675 - Move subscription observables to their own file
* CXV1-13676 - Make column filters into their own components

## [0.19.16]
* < No Ticket > - Branding was broken when moving it into the entity epic. This is fixes for that.
* < No Ticket > - Adding ignore errors on entities for branding 404

## [0.19.15]
* CXV1-13855 - Fixed saving state for list CSV upload
* CXV1-13856 - Fixed list items being set (caused by SDK breaking changes referenced in 0.19.10)
* CXV1-13858 - Fixed header height when side panel details height is large

## [0.19.14]
* CXV1-13849 - Changed the email template text editor regex to use triple curly brackets instead of double brackets and an ampersand

## [0.19.13]
* CXV1-13685 - Fixed length of side panel details header when side panel is expanded
* CXV1-13304 - Updated reducer test

## [0.19.12]
* CXV1-13304 - Entities reducer and epics tests. Made action generators for all actions used that didn't have any.
* Fixed entity toggle handling

## [0.19.11]
* CXV1-13801 - Fix npm link issues for component lib

## [0.19.10]
* CXV1-13762 - Fix handling of email template updates and all other SDK breaking changes

## [0.19.9]
* CXV1-12637 - Config UI unit tests for supervisor toolbar

## [0.19.8]
* CXV1-13761: Protected branding custom domain for help links
* Added inital loading state for branding and protected branding (fixes issue where fetching the entities on page load would happen twice when branding was present)

## [0.19.7]
* Try to fix jenkins build (https://github.com/npm/npm/issues/19353)

## [0.19.6]
* CXV1-13304 - Entity table test (first mapping actions)

## [0.19.5]
* CXV1-13304 - Validation, string, and Entity table config unit tests
* CXV1-13603 - Add email templates help doc link
* Fix entity side panel details

## [0.19.4]
* CXV1-13304 - Epic Unit Tests

## [0.19.3]
* CXV1-13584 - Covert interaction table / supervisor toolbar to use epics to handle side effects.

## [0.19.2]
* CXV1-13304 - Unit Tests

## [0.19.1]
* CXV1-13303 - Email Templates update permissions

## [0.19.0]
* CXV1-12310 created epics for bulk lists UI

## [0.18.0]
* CXV1-13300 - Email Templates

## [0.17.1]
* CXV1-13325 - Updated confirmation popup text, removed subtext prop which is no longer necessary

## [0.17.0]
* CXV1-13326 - fixed build process

## [0.16.0]
* CXV1-13325 - Added global confirmation modal and implemented it on entity enable and disable toggle

## [0.15.9]
* CXV1-13483 - Generic Lists - error on opening create side panel

## [0.15.8]
* CXV1-13321 - Generic Lists - fixed broken table filters

## [0.15.7]
* CXV1-13362 - Clean up state when API error occurs
* CXV1-13422 - Use SDK/API error in error toast
* CXV1-13430 - Use 'enabled'/'disabled' in toggle success message. Capitalize first letter of entity/subentity.

## [0.15.6]
* CXV1-13336 - Generic Lists - Updating the List name, submitting then trying to change it back is not submittable.

## [0.15.5]
* CXV1-13326 - Fix for Env Minified code error

## [0.15.4]
* CXV1-13339 - Generic Lists - Booleans can't go back to no value

## [0.15.3]
* CXV1-13336 - Updating the List name, submitting then trying to change it back is not submittable.
* CXV1-13096 - Failure and Success popup dismissible messages

## [0.15.2]
* CXV1-13377 - Long modal headers break structure
* CXV1-13321 - Main table cell tooltips

## [0.15.1]
* CXV1-13339 - Form validation fixes

## [0.15.0]
* CXV1-13100 - Branding styles added
* CXV1-13096 - Toasts added into entity epics

## [0.14.0]
* CXV1-13099 - List inheritance and minor bug fixes

## [0.13.0]
* CXV1-13099 - Css fixes and list inheritance

## [0.12.0]
* CXV1-13102 - User permissions

## [0.11.0]
* CXV1-12285 - Delete List items

## [0.10.0] (2018-03-21)
* CXV1-13113 - Main entity table filters

## [0.9.1] (2018-03-21)
* CXV1-13106 - Manage disabled state of submit button

## [0.9.0] (2018-03-21)
* CXV1-13115 - make side panel draggable
