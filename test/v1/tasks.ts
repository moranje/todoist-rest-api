import test from 'ava';
import nock from 'nock';
import { TODOIST_API_URI } from '../../src/rest-adapter';
import { FIXTURES } from './fixtures';
import TaskAdapter from '../../src/task-adapter';

test.before(() => {
  // This runs before all tests
  nock(TODOIST_API_URI)
    .get('/tasks')
    .reply(200, FIXTURES.tasks)
    .get('/tasks?project_id=1&label_id=1&filter=work&lang=nl')
    .reply(200, FIXTURES.tasks)
    .get('/tasks/1')
    .reply(200, FIXTURES.tasks[0])
    .post('/tasks')
    .reply(200, FIXTURES.tasks[0])
    .post('/tasks/1')
    .reply(204, {})
    .post('/tasks/1/close')
    .reply(204, {})
    .post('/tasks/1/reopen')
    .reply(204, {})
    .post('/tasks/13/close')
    .reply(213, {}) // unknown status code is on purpose
    .post('/tasks/13/reopen')
    .reply(213, {}) // unknown status code is on purpose
    .delete('/tasks/1')
    .reply(204, {})
    .persist();
});

test('Task Adapter: find()', async t => {
  const taskAdapter = new TaskAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(await taskAdapter.find(1), FIXTURES.tasks[0], "should retrieve a task from it's id");
});

test('Task Adapter: findAll()', async t => {
  const taskAdapter = new TaskAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(await taskAdapter.findAll(), FIXTURES.tasks, 'should retrieve all tasks');
});

test('Task Adapter: findAll() query', async t => {
  const taskAdapter = new TaskAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(
    await taskAdapter.findAll({
      project_id: 1,
      label_id: 1,
      filter: 'work',
      lang: 'nl',
    }),
    FIXTURES.tasks,
    'should retieve all tasks',
  );
});

test('Task Adapter: create()', async t => {
  const taskAdapter = new TaskAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(
    await taskAdapter.create({ content: 'Get milk' }),
    FIXTURES.tasks[0],
    'should create a task and return the result',
  );
});

test('Task Adapter: update()', async t => {
  const taskAdapter = new TaskAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(
    await taskAdapter.update(1, { content: 'Get milk' }),
    true,
    'should update a task and return true if successful',
  );
});

test('Task Adapter: remove()', async t => {
  const taskAdapter = new TaskAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(
    await taskAdapter.remove(1),
    true,
    'should remove a task and return true if successful',
  );
});

test('Task Adapter: close()', async t => {
  const taskAdapter = new TaskAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(
    await taskAdapter.close(1),
    true,
    'should close a task and return true if successful',
  );
});

test('Task Adapter: reopen()', async t => {
  const taskAdapter = new TaskAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(
    await taskAdapter.reopen(1),
    true,
    'should reopen a task and return true if successful',
  );
});

test('Task Adapter: close() fail', async t => {
  const taskAdapter = new TaskAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');
  const error = await t.throwsAsync(taskAdapter.close(13));

  t.regex(
    error.message,
    /The task probably wasn't closed/,
    'should throw if status code is not 204',
  );
});

test('Task Adapter: reopen() fail', async t => {
  const taskAdapter = new TaskAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');
  const error = await t.throwsAsync(taskAdapter.reopen(13));

  t.regex(
    error.message,
    /The task probably wasn't reopened/,
    'should throw if status code is not 204',
  );
});
