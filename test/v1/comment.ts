import test from 'ava';
import nock from 'nock';
import { TODOIST_API_URI } from '../../src/rest-adapter';
import { FIXTURES } from './fixtures';
import CommentAdapter from '../../src/comment-adapter';

test.before(() => {
  // This runs before all tests
  nock(TODOIST_API_URI)
    .get('/comments?task_id=1')
    .reply(200, [FIXTURES.comments[0]])
    .get('/comments?project_id=1')
    .reply(200, [FIXTURES.comments[1]])
    .persist();
});

test('Comment Adapter: findAll()', async t => {
  const commentAdapter = new CommentAdapter('1234567890abcdefghijklmnopqrstuvwxyz1234');

  t.deepEqual(
    await commentAdapter.findAll({ id: 1, parent: 'task' }),
    [FIXTURES.comments[0]],
    'should retrieve all comments from a task',
  );
});
