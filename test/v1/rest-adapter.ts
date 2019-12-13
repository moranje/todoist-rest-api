// @ts-nocheck
import test from 'ava';
import nock from 'nock';
import { TODOIST_API_URI } from '../../src/rest-adapter';
import { FIXTURES } from './fixtures';
import RESTAdapter from '../../src/rest-adapter';

test.before(() => {
  // This runs before all tests
  nock(TODOIST_API_URI)
    .get('/projects')
    .reply(200, FIXTURES.projects)
    .get('/projects/1')
    .reply(200, FIXTURES.projects[0])
    .post('/projects/13')
    .reply(213, {}) // unknown status code is on purpose
    .delete('/projects/13')
    .reply(213, {}) // unknown status code is on purpose
    .persist();
});

test('Adapter: constructor() missing type', t => {
  const error = t.throws(() => {
    const adapter = new RESTAdapter(null, '1234567890abcdefghijklmnopqrstuvwxyz1234');
  }, Error);

  t.is(error.message, 'Expected the first argument to be a resource type was null');
});

test('Adapter: constructor() missing token', t => {
  const error = t.throws(() => {
    const adapter = new RESTAdapter('project');
  }, Error);

  t.is(error.message, 'Expected the second argument to be an API token was undefined');
});

test('Adapter: find()', async t => {
  const projectAdapter = new RESTAdapter('project', '1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(
    await projectAdapter.find(1),
    FIXTURES.projects[0],
    "should retrieve a project from it's id",
  );
});

test('Adapter: findAll()', async t => {
  const projectAdapter = new RESTAdapter('project', '1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(await projectAdapter.findAll({}), FIXTURES.projects, 'should retrieve all projects');
});

test('Adapter: update() fail', async t => {
  const projectAdapter = new RESTAdapter('project', '1234567890abcdefghijklmnopqrstuvwxyz1234');
  const error = await t.throwsAsync(projectAdapter.update(13, { content: 'Get milk' }));

  t.regex(
    error.message,
    /The update probably was not successful/,
    'should throw if status code is not 204',
  );
});

test('Adapter: remove() fail', async t => {
  const projectAdapter = new RESTAdapter('project', '1234567890abcdefghijklmnopqrstuvwxyz1234');
  const error = await t.throwsAsync(projectAdapter.remove(13));

  t.regex(
    error.message,
    /The deletion probably was not successful/,
    'should throw if status code is not 204',
  );
});
