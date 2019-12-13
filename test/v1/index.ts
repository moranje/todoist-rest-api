import test from 'ava';
import todoist from '../../src';
import TaskAdapter from '../../src/task-adapter';
import Adapter from '../../src/rest-adapter';
import CommentAdapter from '../../src/comment-adapter';

test('Main: tasks', t => {
  t.true(
    todoist('1234567890abcdefghijklmnopqrstuvwxyz1234').v1.task instanceof TaskAdapter,
    'todoist(<apiKey>).v1.task should be a TaskAdapter instance',
  );
});

test('Main: projects', t => {
  t.true(
    todoist('1234567890abcdefghijklmnopqrstuvwxyz1234').v1.project instanceof Adapter,
    'todoist(<apiKey>).v1.project should be an Adapter instance',
  );
});

test('Main: labels', t => {
  t.true(
    todoist('1234567890abcdefghijklmnopqrstuvwxyz1234').v1.label instanceof Adapter,
    'todoist(<apiKey>).v1.label should be an Adapter instance',
  );
});

test('Main: comments', t => {
  t.true(
    todoist('1234567890abcdefghijklmnopqrstuvwxyz1234').v1.comment instanceof CommentAdapter,
    'todoist(<apiKey>).v1.comment should be a CommentAdapter instance',
  );
});

test('Main: sections', t => {
  t.true(
    todoist('1234567890abcdefghijklmnopqrstuvwxyz1234').v1.section instanceof Adapter,
    'todoist(<apiKey>).v1.section should be a Adapter instance',
  );
});
