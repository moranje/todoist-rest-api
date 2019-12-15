# Todoist REST API [![Build Status](https://travis-ci.com/moranje/todoist-rest-api.svg?branch=master)](https://travis-ci.com/moranje/todoist-rest-api) [![Coverage Status](https://coveralls.io/repos/github/moranje/todoist-rest-api/badge.svg?branch=master)](https://coveralls.io/github/moranje/todoist-rest-api?branch=master) [![CodeFactor](https://www.codefactor.io/repository/github/moranje/todoist-rest-api/badge)](https://www.codefactor.io/repository/github/moranje/todoist-rest-api) ![npm (tag)](https://img.shields.io/npm/v/todoist-rest-api/latest) ![npm](https://img.shields.io/npm/dw/todoist-rest-api) ![GitHub](https://img.shields.io/github/license/moranje/todoist-rest-api)

> A full-featured node.js wrapper for Todoist REST API

## Install

```
$ npm install todoist-rest-api
```

## Usage

```ts
import todoist from 'todoist-rest-api';
// or const todoist = require('todoist-rest-api');

const api = todoist('1234567890abcdefghijklmnopqrstuvwxyz1234');
const tasks = await api.v1.task.findAll();
```

## API

If you want to know more about specific types see [`types.ts`](https://github.com/moranje/todoist-rest-api/blob/master/types.d.ts) or read the [API docs](https://doist.github.io/todoist-api/rest/v1/) from Todoist.

### todoist

```ts
function todoist(token: string) => TodoistRESTAPI
```

#### token

Type: `string`\
\*_required_

An [API token](https://todoist.com/Users/viewPrefs?page=integrations).

Example:

```js
import todoist from 'todoist-rest-api';

const api = todoist('1234567890abcdefghijklmnopqrstuvwxyz1234');
```

### TodoistRESTAPI

```ts
interface TodoistRESTAPI {
  v1: TodoistRESTV1;
  // v2 when the API is updated
}
```

### TodoistRESTAPIV1

```ts
export interface TodoistRESTV1 {
  task: TaskAdapter;
  project: ProjectAdapter;
  label: LabelAdapter;
  comment: CommentAdapter;
  section: SectionAdapter;
}
```

Example:

```js
import todoist from 'todoist-rest-api';

const api = todoist('1234567890abcdefghijklmnopqrstuvwxyz1234');
const taskAdapter = api.v1.task;
const projectAdapter = api.v1.project;
const labelAdapter = api.v1.label;
const commentAdapter = api.v1.comment;
const sectionAdapter = api.v1.section;
```

### TaskAdapter (instance)

```ts
class TaskAdapter {
  public async find(id: number) => TodoistTask
  public async findAll(options?: {
    project_id?: number;
    label_id?: number;
    filter?: string;
    lang?: string;
  }) => TodoistTask[]
  public async create(task: TodoistTaskOptions) => TodoistTask
  public async update(id: number, task: TodoistTaskOptions) => boolean
  public async close(id: number) => boolean
  public async reopen(id: number) => boolean
  public async remove(id: number) => boolean
}
```

Example:

```js
import todoist from 'todoist-rest-api';

const api = todoist('1234567890abcdefghijklmnopqrstuvwxyz1234');
let task = null;
// Or use top-level await if thats available to you
(async () => {
  try {
    task = await api.v1.task.find(1);
  } catch (error) {
    // Do something
  }
})();
```

### ProjectAdapter (instance)

```ts
class ProjectAdapter {
  public async find(id: number) => TodoistProject
  public async findAll() => TodoistProject[]
  public async create(project: TodoistProjectOptions) => TodoistProject
  public async update(id: number, project: TodoistProjectOptions) => boolean
  public async remove(id: number) => boolean
}
```

Example:

```js
import todoist from 'todoist-rest-api';

const api = todoist('1234567890abcdefghijklmnopqrstuvwxyz1234');
let project = null;
// Or use top-level await if thats available to you
(async () => {
  try {
    project = await api.v1.project.create({ name: 'Next Actions' });
  } catch (error) {
    // Do something
  }
})();
```

### LabelAdapter (instance)

```ts
class LabelAdapter {
  public async find(id: number) => TodoistLabel
  public async findAll() => TodoistLabel[]
  public async create(label: TodoistLabelOptions) => TodoistLabel
  public async update(id: number, label: TodoistLabelOptions) => boolean
  public async remove(id: number) => boolean
}
```

Example:

```js
import todoist from 'todoist-rest-api';

const api = todoist('1234567890abcdefghijklmnopqrstuvwxyz1234');
// Or use top-level await if thats available to you
(async () => {
  try {
    await api.v1.label.update(3, { name: 'amsterdam' });
  } catch (error) {
    // Do something
  }
})();
```

### CommentAdapter (instance)

```ts
class CommentAdapter {
  public async find(id: number) => TodoistComment
  public async findAll({
    id,
    parent,
  }: {
    id: number;
    parent: 'task' | 'project';
  }) => TodoistComment[]
  public async create(comment: TodoistCommentOptions) => TodoistComment
  public async update(id: number, comment: TodoistCommentOptions) => boolean
  public async remove(id: number) => boolean
}
```

Example:

```js
import todoist from 'todoist-rest-api';

const api = todoist('1234567890abcdefghijklmnopqrstuvwxyz1234');
// Or use top-level await if thats available to you
(async () => {
  try {
    await api.v1.comment.findAll({ id: 2, parent: 'task' });
  } catch (error) {
    // Do something
  }
})();
```

### SectionAdapter (instance)

```ts
class SectionAdapter {
  public async find(id: number) => TodoistSection
  public async findAll() => TodoistSection[]
  public async create(section: TodoistSectionOptions) => TodoistSection
  public async update(id: number, section: TodoistSectionOptions) => boolean
  public async remove(id: number) => boolean
}
```

Example:

```js
import todoist from 'todoist-rest-api';

const api = todoist('1234567890abcdefghijklmnopqrstuvwxyz1234');
// Or use top-level await if thats available to you
(async () => {
  try {
    await api.v1.section.remove(13);
  } catch (error) {
    // Do something
  }
})();
```

## Changelog

View [CHANGELOG.md](https://github.com/moranje/todoist-rest-api/blob/master/CHANGELOG.md)

## Contributing

### Instructions

- Fork and clone the repo

  _git clone https://github.com/YOUR-USERNAME/todoist-rest-api_

- Install dependencies

  _npm install_

### Build

Create a new build with

`npm run build`

### Run tests

Run Ava test suite with:

`npm run test`

OR

`npm run test:prod`

### Commits

For commits I follow the `angular commit guidelines` and use `semantic release` to automate builds, semver version updates and changelog creation. The way to make sure this all works is to run:

`npm run commit`

Which guides you through the motions

## License

[License MIT](https://github.com/moranje/todoist-rest-api/blob/master/licence) © [Martien Oranje](https://github.com/moranje)
