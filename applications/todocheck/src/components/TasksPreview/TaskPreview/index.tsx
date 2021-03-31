import React from "react";
import {
  RegularText,
  styled,
  Card,
  inset,
  css,
  EditPencilIcon,
  TrashIcon,
  Checkbox,
  IconButton,
  inline,
} from "@dbayarhyk/design-system";
import transparentize from "polished/lib/color/transparentize";

import {
  updateTask as dbUpdateTask,
  removeTask as dbRemoveTask,
} from "../../../data/tasks";
import Link from "../../Link";
import PriorityLabel from "../../PriorityLabel";
import useDBMutation from "../../../hooks/useDBMutation";

type SectionProps = {
  done?: boolean;
};

export const Section = styled(Card)<SectionProps>`
  ${inset("small")}

  background-color: none;
  position: relative;
  max-width: 30em;
  border: 0;

  background-color: ${(props) =>
    transparentize(0.5, props.theme.color.grey[200])};

  ${(props) =>
    props.done &&
    css`
      background-color: ${(props) => props.theme.color.grey[200]};
    `}
`;

export const SupplementarySection = styled.div`
  ${inline("small")}

  align-items: center;
`;

export const TitleContainer = styled.div`
  ${inline("small")}
  justify-content: space-between;
  align-items: center;
`;

export const TitleLabel = styled(RegularText)<TitleProps>`
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  border-radius: 50%;
`;

type TitleProps = {
  done?: boolean;
};

export const Title = styled.span<TitleProps>`
  ${(props) =>
    props.done &&
    css`
      text-decoration: line-through;
      opacity: 0.5;
    `}
`;

export const Actions = styled.div`
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`;

const parseISODateString = (isoDateString: string) =>
  isoDateString.substring(0, 16).split("T");

type TaskPreviewProps = {
  _id: string;
  startDate: string;
  title: string;
  done: boolean;
  priority: "" | "low" | "medium" | "high";
  description: string;
  _rev: string;
  hideDate?: boolean;
  hideEditAction?: boolean;
  onDoneChange?: (_id: string, done: boolean) => void;
  onRemove?: (_id: string) => void;
};

const TaskPreview: React.FC<TaskPreviewProps> = ({
  _id,
  startDate,
  title,
  done,
  priority,
  description,
  _rev,
  hideDate,
  hideEditAction,
  onDoneChange,
  onRemove,
}) => {
  const lastRev = React.useRef<string>(_id);
  const [localDone, setLocalDone] = React.useState(done);
  const [updateTask] = useDBMutation(dbUpdateTask);
  const [removeTask] = useDBMutation(dbRemoveTask);

  React.useEffect(() => {
    lastRev.current = _rev;
  }, [_rev]);

  const taskTitleId = `task-${_id}`;
  const [date, time] = parseISODateString(startDate);
  const isDateVisible = (!hideDate && date) || time;

  return (
    <Section done={localDone}>
      <SupplementarySection>
        {priority && <PriorityLabel priority={priority} />}

        {isDateVisible && (
          <RegularText priority="low" as="span">
            {!hideDate && date} {time}
          </RegularText>
        )}
      </SupplementarySection>

      <div>
        <TitleContainer>
          <TitleLabel as="label" priority="high">
            <Checkbox
              checked={localDone}
              aria-labelledby={taskTitleId}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const prevDone = localDone;
                const newDone = event.target.checked;

                updateTask({
                  _id,
                  startDate,
                  title,
                  done: newDone,
                  priority,
                  description,
                  _rev: lastRev.current,
                })
                  .then(({ rev }) => {
                    lastRev.current = rev;

                    setLocalDone(newDone);

                    if (onDoneChange) {
                      onDoneChange(_id, newDone);
                    }
                  })
                  .catch(() => {
                    setLocalDone(prevDone);
                  });
              }}
            />{" "}
            <Title done={localDone}>{title}</Title>
          </TitleLabel>

          <Actions>
            {!hideEditAction && (
              <ButtonLink to={`task/${_id}`}>
                <IconButton
                  aria-label={`Edit ${title}`}
                  color="primary"
                  tabIndex={-1}
                >
                  <EditPencilIcon />
                </IconButton>
              </ButtonLink>
            )}
            <IconButton
              aria-label={`Remove ${title}`}
              color="secondary"
              onClick={async () => {
                await removeTask(_id, lastRev.current);

                if (onRemove) {
                  onRemove(_id);
                }
              }}
            >
              <TrashIcon />
            </IconButton>
          </Actions>
        </TitleContainer>

        {description && <RegularText priority="low">{description}</RegularText>}
      </div>
    </Section>
  );
};

export default TaskPreview;
