# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Alpha User Acceptance Testing]
- Bulk actions
- Roles (permissions)
- Outbound Identifiers / Outbound Identifier Lists
- Beta UAT page
- Chat Widgets

## [Beta User Acceptance Testing]
- Interaction Monitoring

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
