// Standard framework setup file
// Here we expose our pageManager method as global to call for it where we need so in the code.
global.pageManager = require('./page-manager.js');

// Here we set Chai, our assertion library, its plugins and expose the expect method
// as global to be used from anywhere in the code.

const chai = require('chai');
chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));

global.expect = chai.expect;

// Here we expose Cucumber's methods as global in order to use them from anywhere in the code.
const {
  Given, When, Then, setDefaultTimeout, Before, After, Status,
} = require('cucumber');

global.Given = Given;
global.When = When;
global.Then = Then;
global.Before = Before;
global.After = After;
global.Status = Status;

// Here we set Cucumber's default maximum wait time before failure in milliseconds
// for waits where it's not explicitly specified.
setDefaultTimeout(120000);

// Here we call the variables from the .env file to be set as process.env variables
require('dotenv').config();