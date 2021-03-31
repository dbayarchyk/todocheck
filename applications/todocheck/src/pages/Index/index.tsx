import React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { RouteComponentProps } from "@reach/router";
import { isPast, isToday, isTomorrow } from "date-fns";
import { styled, css, stack, RegularText } from "@dbayarhyk/design-system";

import { TaskDoc, getAllTasks } from "../../data/tasks";
import Link from "../../components/Link";
import Container from "../../components/Container";
import TasksPreview from "../../components/TasksPreview";
import useDBQuery from "../../hooks/useDBQuery";
import { ReactComponent as CompletedIllustration } from "./completed.svg";
import messages from "./messages";

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: ${(props) => props.theme.spacings.medium};
  }

  height: 100%;
`;

export const EmptyStateSection = styled.section`
  ${stack("medium")}

  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

type StyledTasksPreviewProps = {
  alignToTheBottom?: boolean;
};

export const StyledTasksPreview = styled(TasksPreview)<StyledTasksPreviewProps>`
  ${(props) =>
    props.alignToTheBottom &&
    css`
      margin-top: auto;
      border-top: 2px solid ${props.theme.color.borders.main};
      padding-top: ${(props) => props.theme.spacings.small};
      padding-bottom: ${(props) => props.theme.spacings.small};

      h1 {
        color: ${(props) => props.theme.color.grey[500]};
      }

      h1 > button svg {
        transform: rotate(180deg);
      }
    `}
`;

type GroupedTasks = {
  today: TaskDoc[];
  tomorrow: TaskDoc[];
  outdated: TaskDoc[];
  future: TaskDoc[];
  completed: TaskDoc[];
};

type GroupedTaskKeys = keyof GroupedTasks;

const groupTasks = (tasks: TaskDoc[] | null) => {
  const defaultGroup: GroupedTasks = {
    today: [],
    tomorrow: [],
    outdated: [],
    future: [],
    completed: [],
  };

  if (!Array.isArray(tasks)) {
    return defaultGroup;
  }

  return tasks.reduce<GroupedTasks>(
    (grouped, task) => {
      const date = new Date(task.startDate);

      if (task.done) {
        return {
          ...grouped,
          completed: [...grouped.completed, task],
        };
      }

      if (!isToday(date) && isPast(date)) {
        return {
          ...grouped,
          outdated: [...grouped.outdated, task],
        };
      }

      if (isToday(date)) {
        return {
          ...grouped,
          today: [...grouped.today, task],
        };
      }

      if (isTomorrow(date)) {
        return {
          ...grouped,
          tomorrow: [...grouped.tomorrow, task],
        };
      }

      return {
        ...grouped,
        future: [...grouped.future, task],
      };
    },
    {
      outdated: [],
      today: [],
      tomorrow: [],
      future: [],
      completed: [],
    }
  );
};

const Index: React.FC<RouteComponentProps> = () => {
  const { data, loading, refetch } = useDBQuery(getAllTasks);
  const groupedTasks = React.useMemo(() => groupTasks(data), [data]);
  const groupedListRefs: {
    [groupKey in GroupedTaskKeys]: React.RefObject<HTMLUListElement>;
  } = {
    outdated: React.useRef<HTMLUListElement>(null),
    today: React.useRef<HTMLUListElement>(null),
    tomorrow: React.useRef<HTMLUListElement>(null),
    future: React.useRef<HTMLUListElement>(null),
    completed: React.useRef<HTMLUListElement>(null),
  };
  const intl = useIntl();

  const groupKeyWordsMap: { [key in GroupedTaskKeys]: string } = {
    outdated: intl.formatMessage(messages.outdatedHeadline),
    today: intl.formatMessage(messages.todayHeadline),
    tomorrow: intl.formatMessage(messages.tomorrowHeadline),
    future: intl.formatMessage(messages.futureHeadline),
    completed: intl.formatMessage(messages.completedHeadline),
  };
  const groupKeyOrderMap: { [key in GroupedTaskKeys]: number } = {
    outdated: 1,
    today: 2,
    tomorrow: 3,
    future: 4,
    completed: 5,
  };

  const uncompletedTasksNumber = data
    ? data.reduce((number, task) => {
        if (!task.done) {
          return number + 1;
        }

        return number;
      }, 0)
    : 0;

  return (
    <StyledContainer>
      {!loading && uncompletedTasksNumber === 0 && (
        <EmptyStateSection>
          <CompletedIllustration height="15em" width="15em" />

          <div>
            <RegularText priority="high">
              <FormattedMessage {...messages.emptyStateTitle} />
            </RegularText>
            <RegularText priority="low">
              <FormattedMessage {...messages.emptyStateSubtitle} />
            </RegularText>
            <Link to="/task">
              <FormattedMessage {...messages.emptyStateLink} />
            </Link>
          </div>
        </EmptyStateSection>
      )}

      {Object.entries(groupedTasks)
        .sort(
          ([groupKeyA], [groupKeyB]) =>
            groupKeyOrderMap[groupKeyA as GroupedTaskKeys] -
            groupKeyOrderMap[groupKeyB as GroupedTaskKeys]
        )
        .map(([groupKey, tasks]) => {
          if (tasks.length === 0) {
            return null;
          }

          const currentListRef = groupedListRefs[groupKey as GroupedTaskKeys];
          const hideTasksDate = ["today", "tomorrow"].includes(groupKey);

          return (
            <StyledTasksPreview
              tasks={tasks}
              hideTasksDate={hideTasksDate}
              loading={loading}
              listRef={currentListRef}
              headline={groupKeyWordsMap[groupKey as GroupedTaskKeys]}
              headlineId={`tasks-preview-${groupKey}`}
              onTaskRemove={async () => {
                await refetch();

                if (currentListRef.current) {
                  currentListRef.current.focus();
                }
              }}
              onTaskDoneChange={async () => {
                await refetch();

                if (currentListRef.current) {
                  currentListRef.current.focus();
                }
              }}
              openByDefault={groupKey !== "completed"}
              alignToTheBottom={groupKey === "completed"}
              scrollIntoViewOnOpen={groupKey === "completed"}
              hideEditAction={groupKey === "completed"}
            />
          );
        })}
    </StyledContainer>
  );
};

export default Index;
