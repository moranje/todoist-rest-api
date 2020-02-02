import RESTAdapter from './rest-adapter';
import TaskAdapter from './task-adapter';
import CommentAdapter from './comment-adapter';

// Export types
export * from './types';
export { default as RESTAdapter } from './rest-adapter';
export { default as TaskAdapter } from './task-adapter';
export { default as CommentAdapter } from './comment-adapter';

interface TodoistRESTAPI {
  [key: string]: TodoistRESTAPIV1;
  v1: TodoistRESTAPIV1;
}

interface TodoistRESTAPIV1 {
  [key: string]:
    | TaskAdapter<'task'>
    | RESTAdapter<'project'>
    | RESTAdapter<'label'>
    | CommentAdapter<'comment'>
    | RESTAdapter<'section'>;
  task: TaskAdapter<'task'>;
  project: RESTAdapter<'project'>;
  label: RESTAdapter<'label'>;
  comment: CommentAdapter<'comment'>;
  section: RESTAdapter<'section'>;
}

export default function todoist(apiKey: string): TodoistRESTAPI {
  if (!/^[0-9A-Fa-f]{40}$/.test(apiKey))
    throw new Error(
      `Invalid API token. A token should be 40 characters long and exist of hexadecimals, was ${apiKey} (${apiKey.length} characters)`,
    );

  return {
    v1: {
      task: new TaskAdapter('task', apiKey),
      project: new RESTAdapter('project', apiKey),
      label: new RESTAdapter('label', apiKey),
      comment: new CommentAdapter('comment', apiKey),
      section: new RESTAdapter('section', apiKey),
    },
  };
}
