import { schema } from "normalizr";

export const commentsEntity = new schema.Entity("comments");
export const taskEntity = new schema.Entity("tasks", {
  comments: [commentsEntity],
});
