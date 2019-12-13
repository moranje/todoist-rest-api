import Adapter from './rest-adapter';
import TaskAdapter from './task-adapter';
import CommentAdapter from './comment-adapter';
import { TodoistRESTAPI } from './types';

// Export types
export * from './types';

export default function todoist(apiKey: string): TodoistRESTAPI {
  return {
    v1: {
      task: new TaskAdapter(apiKey),
      project: new Adapter('project', apiKey),
      label: new Adapter('label', apiKey),
      comment: new CommentAdapter(apiKey),
      section: new Adapter('section', apiKey),
    },
  };
}
