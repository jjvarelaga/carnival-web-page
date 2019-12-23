module.exports.config = {
  framework: 'custom',
  frameworkPath: 'node_modules/protractor-cucumber-framework',
  verbose: true,
  logLevel: 'INFO',
  stackTrace: true,
  cucumberOpts: {
    format: 'json:.tmp/results.json',
    require: ['E2E/support/**/*.js', 'E2E/step_definitions/*.js'],
    strict: true,
    tags: process.env.CUCUMBER_TAGS || '(not @WIP)',
  },
  capabilities:
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--headless', '--disable-gpu', '--window-size=1920,1080', '--remote-debugging-port=25777', '--disable-infobars', '--no-sandbox', '--disable-extensions', '--disable-dev-shm-usage', '--proxy-server=\'direct://', '--proxy-bypass-list=*'],
        w3c: false,
      },
    },
  specs: ['E2E/features/**/*.feature'],

  plugins: [{
    package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      displayDuration: true,
      disableLog: true,
      pageTitle: 'Carnival QA Automation Report',
      reportName: 'Carnival QA Automation Report',
      pageFooter: '<div style="text-align:center"><p>Powered by Globant Automation</p></div>',
      customData: {
        title: 'Run info',
        data: [
          { label: 'Project', value: 'Carnival Suite' },
          { label: 'Environment', value: 'Production' },
          { label: 'Application', value: 'Carnival' },
        ],
      },

    },
  }],
  ignoreUncaughtExceptions: true,
};
