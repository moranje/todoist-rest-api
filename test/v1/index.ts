import test from 'ava';
import todoist from '../../src';
import TaskAdapter from '../../src/task-adapter';
import RESTAdapter from '../../src/rest-adapter';
import CommentAdapter from '../../src/comment-adapter';

test('Main: tasks', t => {
  t.true(
    todoist('1234567890abcdef1234567890abcdef01234567').v1.task instanceof
      TaskAdapter,
    'todoist(<apiKey>).v1.task should be a TaskAdapter instance',
  );
});

test('Main: projects', t => {
  t.true(
    todoist('1234567890abcdef1234567890abcdef01234567').v1.project instanceof
      RESTAdapter,
    'todoist(<apiKey>).v1.project should be an Adapter instance',
  );
});

test('Main: labels', t => {
  t.true(
    todoist('1234567890abcdef1234567890abcdef01234567').v1.label instanceof
      RESTAdapter,
    'todoist(<apiKey>).v1.label should be an Adapter instance',
  );
});

test('Main: comments', t => {
  t.true(
    todoist('1234567890abcdef1234567890abcdef01234567').v1.comment instanceof
      CommentAdapter,
    'todoist(<apiKey>).v1.comment should be a CommentAdapter instance',
  );
});

test('Main: sections', t => {
  t.true(
    todoist('1234567890abcdef1234567890abcdef01234567').v1.section instanceof
      RESTAdapter,
    'todoist(<apiKey>).v1.section should be a Adapter instance',
  );
});

test('Main: token validation', t => {
  t.throws(
    () => todoist('1234567890abcdef'),
    'Invalid API token. A token should be 40 characters long and exist of hexadecimals, was 1234567890abcdef (16 characters)',
    'should throw when an invalid api token is supplied',
  );
});
