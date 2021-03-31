import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { RouteComponentProps } from "@reach/router";
import {
  HeadlineText,
  CheveronLeftIcon,
  VisuallyHidden,
  Stack,
} from "@dbayarhyk/design-system";

import { useForm } from "../../hooks/useForm";
import Container from "../../components/Container";
import TaskForm, { Values } from "../../components/TaskForm";
import validateTaskForm from "../../utils/validateTaskForm";
import Link from "../../components/Link";
import useDBQuery from "../../hooks/useDBQuery";
import useDBMutation from "../../hooks/useDBMutation";
import { getTaskById, updateTask as dbUpdateTask } from "../../data/tasks";
import messages from "./messages";

type TaskProps = RouteComponentProps<{
  id: string;
}>;

const Task: React.FC<TaskProps> = ({ id, navigate }) => {
  const [currentLiveMessage, setCurrentLiveMessage] = React.useState("");
  const { loading, data: task } = useDBQuery(() => getTaskById(id || ""));
  const [updateTask] = useDBMutation(dbUpdateTask);
  const intl = useIntl();

  React.useEffect(() => {
    if (loading) {
      setCurrentLiveMessage(intl.formatMessage(messages.loadingMessage));
    } else if (task) {
      setCurrentLiveMessage(
        intl.formatMessage(messages.loadedMessage, { taskTitle: task.title })
      );
    }
  }, [loading, task]);

  const form = useForm<Values>(
    {
      title: !loading && task ? task.title : "",
      startDate: !loading && task ? task.startDate : "",
      priority: !loading && task ? task.priority : "",
      description: !loading && task ? task.description : "",
    },
    async () => {
      const errors = validateTaskForm(form.values);

      if (Object.values(errors).some(Boolean)) {
        form.setErrors(errors);
        return;
      }

      if (!task) {
        return;
      }

      setCurrentLiveMessage(intl.formatMessage(messages.updatingMessage));

      await updateTask({
        ...task,
        title: form.values.title,
        startDate: form.values.startDate,
        priority: form.values.priority,
        description: form.values.description,
      });

      setCurrentLiveMessage(intl.formatMessage(messages.updatedMessage));

      // Wait until a screen reader announce the live message.
      setTimeout(() => {
        if (navigate) {
          navigate("/");
        }
      }, 300);
    }
  );

  if (!loading && !task) {
    return (
      <div>
        <FormattedMessage {...messages.taskNotFound} />
      </div>
    );
  }

  return (
    <Container>
      <Stack scale="medium">
        <div>
          <Link to="/">
            <CheveronLeftIcon alginWithText />{" "}
            <FormattedMessage {...messages.backLink} />
          </Link>
        </div>
        <HeadlineText level={1}>
          <FormattedMessage {...messages.headline} />
        </HeadlineText>
        <VisuallyHidden aria-live="polite" role="status">
          {currentLiveMessage}
        </VisuallyHidden>
        {!loading && (
          <TaskForm
            values={form.values}
            errors={form.errors}
            onChange={form.onChange}
            onSubmit={form.onSubmit}
          />
        )}
      </Stack>
    </Container>
  );
};

export default Task;
