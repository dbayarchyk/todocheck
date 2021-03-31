import React from "react";
import { FormattedMessage } from "react-intl";
import {
  HeadlineText,
  RegularText,
  stack,
  Badge,
  Collapsible,
  CollapsibleToggle,
  CollapsibleBody,
  styled,
  Stack,
} from "@dbayarhyk/design-system";

import TaskPreview from "./TaskPreview";
import Link from "../Link";
import { TaskDoc } from "../../data/tasks";
import messages from "./messages";

export const List = styled.ul`
  ${stack("small")}

  list-style: none;
`;

type TasksPreviewProps = {
  tasks?: TaskDoc[];
  hideTasksDate?: boolean;
  loading?: boolean;
  listRef?: React.RefObject<HTMLUListElement>;
  headline: string;
  headlineId: string;
  onTaskDoneChange?: (_id: string, done: boolean) => void;
  onTaskRemove?: (_id: string) => void;
  openByDefault?: boolean;
  className?: string;
  scrollIntoViewOnOpen?: boolean;
  hideEditAction?: boolean;
};

const TasksPreview: React.FC<TasksPreviewProps> = ({
  tasks = [],
  loading,
  listRef,
  headline,
  headlineId,
  hideTasksDate,
  onTaskDoneChange,
  onTaskRemove,
  openByDefault = true,
  className,
  scrollIntoViewOnOpen,
  hideEditAction,
}) => {
  const sectionRef = React.useRef<HTMLElement>(null);

  const onCollapsibleToggle = (isOpen: boolean) => {
    if (!isOpen || !scrollIntoViewOnOpen) {
      return;
    }

    setTimeout(() => {
      if (!sectionRef.current) {
        return;
      }

      sectionRef.current.scrollIntoView();
    });
  };

  if (loading) {
    return null;
  }

  return (
    <Collapsible
      className={className}
      openByDefault={openByDefault}
      sectionRef={sectionRef}
      onToggle={onCollapsibleToggle}
    >
      <Stack>
        <HeadlineText level={1} id={headlineId}>
          <CollapsibleToggle>
            {headline} <Badge>{tasks.length}</Badge>
          </CollapsibleToggle>
        </HeadlineText>

        <CollapsibleBody>
          {tasks.length === 0 ? (
            <RegularText priority="low">
              <FormattedMessage {...messages.noTasksMessage} />{" "}
              <Link to="/task">
                <FormattedMessage {...messages.newTaskLinkTitle} />
              </Link>
              .
            </RegularText>
          ) : (
            <List aria-labelledby={headlineId} ref={listRef} tabIndex={-1}>
              {tasks.map((task) => (
                <li key={task._id}>
                  <TaskPreview
                    {...task}
                    hideDate={hideTasksDate}
                    onDoneChange={onTaskDoneChange}
                    onRemove={onTaskRemove}
                    hideEditAction={hideEditAction}
                  />
                </li>
              ))}
            </List>
          )}
        </CollapsibleBody>
      </Stack>
    </Collapsible>
  );
};

export default TasksPreview;
