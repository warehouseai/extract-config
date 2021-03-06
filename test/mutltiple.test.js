const path = require('path');
const assume = require('assume');
const extract = require('../lib');

describe('extract', function () {
  it('returns appropriately merged contents of a repo with multiple config sources', async function () {
    const repo = path.join(__dirname, 'fixtures', 'multiple');
    const config = await extract(repo);
    assume(config.wrhs).deep.equals({
      locales: ['Sokovia', 'Wakanda', 'Latveria'],
      files: {
        test: ['output.js', 'output.css', 'nuclear-launch-codes.css'],
        prod: ['output.min.js', 'output.min.css'] },
      build: 'webpack',
      power: 'unlimited'
    });
  });

  it('does not override build and locales if they\'re not present in package.json', async function () {
    const repo = path.join(__dirname, 'fixtures', 'build-missing');
    const config  = await extract(repo);
    assume(config.wrhs).deep.equals({
      build: 'please',
      locales: ['en-US']
    });
  });
});
