# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

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
