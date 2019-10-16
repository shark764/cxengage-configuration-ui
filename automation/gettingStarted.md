Run a test suite:

## Current test running and creation steps

Create new tests in the inProgress folder:
./automation/specs/inProgress

Run tests in the inProgress folder:
`npm run test:auto`


07/05/2019
Summary for the next steps:

1.	Creating a dictionary for everything + main table columns under /automation/dictionary+
2.	Verifying the creation by catching the Green(successful) or Red (Fail) popup after creation – Make the test to be failed if there is an error (Red) 
3.	One test per testcase – to combine the functions in the specs page +
4.	Updating the Jenkins file
5.	Updating the inputs values to be unique - current time +
6.	Change “user specs” to “create” and define another specs per test case.


Future planning:
1.	Inputs verification for updating/creating cases
2.	Labeling parameters if they are required or not.
3.	Developing specs function to test navigation between pages 
4.	Verifying visual components – how many columns, which components existing in each page etc.

