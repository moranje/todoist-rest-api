import RESTAdapter from './rest-adapter';
import TaskAdapter from './task-adapter';
import CommentAdapter from './comment-adapter';

export type ResourceType = 'task' | 'project' | 'label' | 'comment' | 'section';

export interface TodoistTaskOptions {
  [key: string]: string | number | number[] | undefined;

  /**
   * Task’s project id (read-only).
   */
  project_id?: number;

  /**
   * ID of section task belongs to.
   */
  section_id?: number;

  /**
   * Task content.
   */
  content: string;
  /**
   * Array of label ids, associated with a task.
   */
  label_ids?: number[];

  /**
   * ID of parent task (read-only, absent for top-level tasks).
   */
  parent?: number;

  /**
   * Position under the same parent or project for top-level tasks (read-only).
   */
  order?: number;

  /**
   * Task priority from 1 (normal, default value) to 4 (urgent).
   */
  priority?: number;

  /**
   * Human defined task due date(ex.: “next Monday”, “Tomorrow”).Value is set using local(not UTC) time.
   */
  due_string?: string;

  /**
   * Specific date in YYYY - MM - DD format relative to user’s timezone.
   */
  due_date?: string;

  /**
   * Specific date and time in RFC3339 format in UTC.
   */
  due_datetime?: string;

  /**
   * 2-letter code specifying language in case due_string is not written in English.
   */
  due_lang?: string;
}

export interface TodoistTaskDue {
  [key: string]: boolean | string | undefined;
  /**
   * Undocumented: whether or not the task is recurring
   */
  recurring: boolean;

  /**
   * Human defined date in arbitrary format.
   */
  date: string;

  /**
   * Only returned if exact due time set (i.e. it’s not a whole-day task),
   * date and time in RFC3339 format in UTC.
   */
  string: string;

  /**
   * Date in format YYYY-MM-DD corrected to user’s timezone.
   */
  datetime?: string;

  /**
   * Only returned if exact due time set, user’s timezone definition either
   * in tzdata-compatible format (“Europe/Berlin”) or as a string specifying
   * east of UTC offset as “UTC±HH:MM” (i.e. “UTC-01:00”).
   */
  timezone?: string;
}
export interface TodoistTask {
  [key: string]:
    | string
    | boolean
    | number
    | number[]
    | TodoistTaskDue
    | undefined;

  /**
   * Task id.
   */
  id: number;

  /**
   * Task’s project id.
   */
  readonly project_id: number;

  /**
   * ID of section task belongs to.
   */
  section_id: number;

  /**
   * Task content.
   */
  content: string;

  /**
   * Flag to mark completed tasks.
   */
  completed: boolean;

  /**
   * Array of label ids, associated with a task.
   */
  label_ids: number[];

  /**
   * ID of parent task (absent for top-level tasks).
   */
  readonly parent?: number;

  /**
   * Position under the same parent or project for top-level tasks
   */
  readonly order: number;

  /**
   * Task priority from 1 (normal, default value) to 4 (urgent).
   */
  priority: 1 | 2 | 3 | 4;

  /**
   * Object representing task due date/time
   */
  due?: TodoistTaskDue;

  /**
   * URL to access this task in Todoist web interface.
   */
  url: string;

  /**
   * Number of task comments.
   */
  comment_count: number;
}

export interface TodoistProjectOptions {
  [key: string]: string | number | undefined;

  /**
   * Name of the project.
   */
  name: string;

  /**
   * Parent project id.
   */
  parent?: number;
}

export interface TodoistProject {
  [key: string]: string | number | undefined;

  /**
   * Project id.
   */
  id: number;

  /**
   * Project name.
   */
  name: string;

  /**
   * ID of parent project (absent for top-level projects)
   */
  readonly parent?: number;

  /**
   * Project position under the same parent.
   */
  readonly order?: number;

  /**
   * Number of project comments.
   */
  comment_count: number;
}

export interface TodoistLabelOptions {
  [key: string]: string | number | undefined;

  /**
   * Name of the label.
   */
  name: string;

  /**
   * Label order.
   */
  order?: number;
}

export interface TodoistLabel {
  [key: string]: string | number | undefined;

  /**
   * Label id.
   */
  id: number;

  /**
   * Label name.
   */
  name: string;

  /**
   * Number used by clients to sort list of labels.
   */
  order: number;
}

export interface TodoistCommentOptions {
  [key: string]: string | any | undefined;

  /**
   * Required (or project_id). Comment’s task id (for task comments).
   */
  task_id: string;

  /**
   * Required (or task_id). Comment’s project id (for project comments).
   */
  project_id: string;

  /**
   * Comment content.
   */
  content: string;

  /**
   * 	Object for attachment object.
   */
  attachment?: any;
}

export interface TodoistComment {
  [key: string]: string | number | any | undefined;

  /**
   * Comment id.
   */
  id: number;

  /**
   * Comment’s task id (for task comments).
   */
  task_id?: number;

  /**
   * Comment’s project id (for project comments).
   */
  project_id?: number;

  /**
   * Date and time when comment was added, RFC3339 format in UTC.
   */
  posted: string;

  /**
   * Comment content.
   */
  content: string;

  /**
   * Attachment file (optional).
   */
  attachment?: any;
}

export interface TodoistSectionOptions {
  [key: string]: string | number | undefined;

  /**
   * 	Section name.
   */
  name: string;

  /**
   * Project ID this section should belong to.
   */
  project_id: number;

  /**
   * Order among other sections in a project.
   */
  order: number;
}

export interface TodoistSection {
  [key: string]: string | number | undefined;

  /**
   * Section ID.
   */
  id: number;

  /**
   * ID of the project section belongs to.
   */
  project_id: number;

  /**
   * Section position among other sections from the same project.
   */
  order: number;

  /**
   * Section name.
   */
  name: string;
}

export interface TodoistRESTAPI {
  [key: string]: TodoistRESTAPIV1;
  v1: TodoistRESTAPIV1;
}

export interface TodoistRESTAPIV1 {
  [key: string]:
    | TaskAdapter
    | RESTAdapter<TodoistProject, TodoistProjectOptions>
    | RESTAdapter<TodoistLabel, TodoistLabelOptions>
    | CommentAdapter
    | RESTAdapter<TodoistSection, TodoistSectionOptions>;
  task: TaskAdapter;
  project: RESTAdapter<TodoistProject, TodoistProjectOptions>;
  label: RESTAdapter<TodoistLabel, TodoistLabelOptions>;
  comment: CommentAdapter;
  section: RESTAdapter<TodoistSection, TodoistSectionOptions>;
}
