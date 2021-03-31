import PouchDB from "pouchdb";

export type Task = {
  title: string;
  startDate: string;
  done: boolean;
  priority: "" | "low" | "medium" | "high";
  description: string;
};

export type TaskDoc = PouchDB.Core.ExistingDocument<Task>;

export const tasksLocalDB = new PouchDB<Task>("tasks");

export const startLiveDataBasesSync = (url: string) => {
  const tasksRemoteDB = new PouchDB<Task>(url);

  return tasksLocalDB.sync(tasksRemoteDB, {
    live: true,
  });
};

export const getAllTasks = () =>
  tasksLocalDB
    .allDocs({ include_docs: true })
    .then(({ rows }) =>
      rows
        .map((row) => row.doc as TaskDoc)
        .sort(
          (row1, row2) =>
            new Date(row1.startDate).getTime() -
            new Date(row2.startDate).getTime()
        )
    );

export const getTaskById = (_id: string) => tasksLocalDB.get(_id);

export const createTask = (task: Task) =>
  tasksLocalDB.put({
    _id: new Date().toJSON(),
    ...task,
  });

export const updateTask = (task: TaskDoc) => tasksLocalDB.put(task);

export const removeTask = (_id: string, _rev: string) =>
  tasksLocalDB.remove(_id, _rev);
