 // cucumber.js

module.exports = {
  default: {

    paths: ['src/features/**/*.feature'],

    require: [
      'src/steps/**/*.js',
      'src/hooks/**/*.js'
    ],

    parallel: 4,
    
    //retry: 1,
    //Fail if there are undefined or pending steps
    strict: true,
    //stops execution on first failure
    failFast: false,

    //used to filter scenarios based on tags
    tags: '',
    //checks and generates snippets for undefined steps
    dryRun: false,
    format: [
      'progress',
      'html:src/reports/report.html',
      'json:src/reports/report.json',
    ],

    formatOptions: {
      snippetInterface: 'async-await',
    },

    publishQuiet: true,

    worldParameters: {
      
    }
  }
};