import React from "react";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps } from "@reach/router";
import {
  HeadlineText,
  CheveronLeftIcon,
  Stack,
} from "@dbayarhyk/design-system";

import { useForm } from "../../hooks/useForm";
import Container from "../../components/Container";
import TaskForm, { Values } from "../../components/TaskForm";
import Link from "../../components/Link";
import validateTaskForm from "../../utils/validateTaskForm";
import useDBMutation from "../../hooks/useDBMutation";
import { createTask as dbCreateTask } from "../../data/tasks";
import messages from "./messages";

type NewTaskProps = RouteComponentProps;

const NewTask: React.FC<NewTaskProps> = ({ navigate }) => {
  const [createTask] = useDBMutation(dbCreateTask);

  const form = useForm<Values>(
    {
      title: "",
      startDate: "",
      priority: "",
      description: "",
    },
    async () => {
      const errors = validateTaskForm(form.values);

      if (Object.values(errors).some(Boolean)) {
        form.setErrors(errors);
        return;
      }

      await createTask({
        done: false,
        title: form.values.title,
        priority: form.values.priority,
        description: form.values.description,
        startDate: form.values.startDate,
      });

      if (navigate) {
        navigate("/");
      }
    }
  );

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
        <TaskForm
          values={form.values}
          errors={form.errors}
          onChange={form.onChange}
          onSubmit={form.onSubmit}
        />
      </Stack>
    </Container>
  );
};

export default NewTask;
