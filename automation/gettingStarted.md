
### Instructions to setup automation in a local machine:
1. Clone this repository/library.
2. Switch to node version 8.11.3 & run "npm install".
3. Navigate to './automation/config/' folder and create a file with the name '.env'
4. copy-paste following ENVIRONMENT variables to the newly created .env file.
      APP="Config2"
      REGIONVAR="us-east-1"
      ENVIRONMENT="dev"
      TEST_BROWSER="chrome"
      HEADLESS=false
      HOST="127.0.0.1"
      PORT=4444
      MAX_INSTANCES=1
      VERBOSELOGS=true
      LOCAL_HOST=false
      LOCAL_HOST_PORT=3000
      TESTS_TO_RUN="all"
      TENANT="YOUR_TENANT_NAME"
      CX_USERNAME="YOUR_CX_USER_NAME"
      CX_PASSWORD="YOUR_CX_PASSWORD"
5. Provide your TENANT, CX_USERNAME & CX_PASSWORD values in the .env file.
6. Not including any of the above environment variables in your .env file could result in automation tests faliure.

### Instructions to configure automation tests:
1. Navigate to .env file ('./automation/config/.env') & modify the Environment variables as per your need.
2. Sample configuration:
   a) To run tests in QE environment, ENVIRONMENT="QE".
   b) To run tests in firefox, TEST_BROWSER="firefox"
   c) To run tests in headless browser, HEADLESS=true
   d) To run tests on a remote machine, HOST="REMOTE_MACHINE_IP_ADDRESS"
   e) To run tests in multiple browser instances, MAX_INSTANCES=10
   f) To run tests in local build, change LOCAL_HOST=true

### Changing what tests to run:
1. To run all of the tests: TESTS_TO_RUN="all"
2. To run selected tests:
   a) Navigate to './config/specs.txt' file
   b) copy the test names you want to run & change the TESTS_TO_RUN environment variable.
   c) For example, to run Presence Reasons, Dispatch Mappings & Api Keys" tests: TESTS_TO_RUN="Reason, Dispatch Mappings, Api Keys"
   d) use ',' as a seperator between each test name
3. To run a single test: TEST_TO_RUN="Reason"

### Insturctions to run the tests:
1. From command line, run "npm run selenium".
2. Open another terminal & switch to node version 8.11.3 &
3. Run "npm run regression" ---> your tests should start running & logs can be viewed on the terminal.


### Instruction to write new tests?

1. Add "data-automation" label for each new field of a component

2. Choosing the label name according to the field type:
    A) Input text - ended with "Input"
    B) Drop Down List (select) - ended with "List" 
    c) Toggle - ended with "Toggle"
    D) Auto Complete Field - ended with "AutoComplete"
    E) Radio Group - ended with "Choose"
    F) Button - ended with "Button"
    G) Searching by Column  - search____Column
    H) Checkbox type elements - ends with checkbox

3. Update the dictionary/index.js to include new test