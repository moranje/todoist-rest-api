import RESTAdapter from './rest-adapter';
import TaskAdapter from './task-adapter';
import CommentAdapter from './comment-adapter';
import { TodoistRESTAPI } from './types';

// Export types
export * from './types';

export default function todoist(apiKey: string): TodoistRESTAPI {
  if (!/^[0-9A-Fa-f]{40}$/.test(apiKey))
    throw new Error(
      `Invalid API token. A token should be 40 characters long and exist of hexadecimals, was ${apiKey} (${apiKey.length} characters)`,
    );

  return {
    v1: {
      task: new TaskAdapter(apiKey),
      project: new RESTAdapter('project', apiKey),
      label: new RESTAdapter('label', apiKey),
      comment: new CommentAdapter(apiKey),
      section: new RESTAdapter('section', apiKey),
    },
  };
}
