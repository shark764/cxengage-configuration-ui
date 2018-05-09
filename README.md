# CxEngage Configuration and Reporting

![image](https://user-images.githubusercontent.com/23345135/39488729-7d023510-4d59-11e8-9044-db7e3c372480.png)

## Preface
Currently this project resides inside of [config-ui](https://github.com/SerenovaLLC/config-ui)
as iframes for us to be able to convert config-ui to a new updated framework with best practices.

It is important to note that the SDK lives inside of config-ui and we post messages on the window to be able to make use of the sdk inside the new project.

This project also has a major dependency on the [cx-ui-components](https://github.com/SerenovaLLC/cx-ui-components) library.

## To work on cxengage-configuration-ui in a standalone manner (no access to sdk):
1. `npm install` to get your dependencies
2. `npm start` to start working on a HMR local dev instance (defaults to port 3000)
3. `npm t` runs the tests in a watch mode
4. `npm run test:coverage` runs the tests and returns coverage report

## To work on cxengage-configuration-ui inside an instance of config-ui:
1. First run `npm start` on cxengage-configuration-ui which will run on port 3000
2. Navigate to config-ui repo and update the [.env files variable for `config2Url`](https://github.com/SerenovaLLC/config-ui/blob/master/src/app/env.js#L6) to point to your local running instace `http://localhost:3000`
3. In config-ui repo run `npm start`, which will run that project in dev mode on the next available port in 3000 range

## Editing the component library
Editing the component library can mostly be acomplished via it's `npm start` to run the components in it's styleguide app,  but to test your components changes inside the cxengage-configuration-ui project you will need to do the following:
1. Navigate to cx-ui-components library and run `npm link` to create a global symlink
2. Navigate to cxengage-configuration-ui and run `npm link cx-ui-components` to create the local symlink
Now when you edit components you notice changes occur automatically.

To unlink the project run `npm unlink cx-ui-components` after this run `npm i cx-ui-components@<version>` to reinstall the now missing cx-ui-components library
To remove the global symlink, navigate to cx-ui-components and run `npm unlink`

## Testing and code structure
We have a number of tests for this project which generate good (hopefully complete someday soon) coverage and testing. [Please follow this guide to keep the code and tests consistent and the code coverage complete.](docs/TESTING_AND_CODE_STRUCTURE.md)

### Common testing issues
1. Tests using the `toastr` library will fail when this project is linked, so make sure to re-install cx-ui-components before running all tests when making a commit.
2. Your node and npm versions must be up to date. If you see test errors like `"TypeError: Object.values is not a function"`, make sure to install/use the latest node and npm.
