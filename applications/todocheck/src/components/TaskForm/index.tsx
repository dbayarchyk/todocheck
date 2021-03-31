import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  FormInput,
  styled,
  stack,
  RegularText,
  PrimaryButton,
  FormError,
  FormTextArea as BaseFormTextArea,
  inline,
  CalendarIcon,
  SecondaryButton,
  Group,
  FormRadioToggle,
} from "@dbayarhyk/design-system";
import DatePicker from "../DatePicker";
import Link from "../Link";
import messages from "./messages";

export const Form = styled.form`
  ${stack("medium")}
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateTimePickerContainer = styled.div`
  ${inline("medium")}

  align-items: center;
`;

export const ButtonLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;

export const ButtonsList = styled.ul`
  ${inline("small")}
`;

export const FormTextArea = styled(BaseFormTextArea)`
  height: 25vh;
  max-height: 15em;
  resize: none;
`;

const Inline = styled.div`
  ${inline("small")}
`;

export type Values = {
  title: string;
  startDate: string;
  priority: "" | "low" | "medium" | "high";
  description: string;
};

export type Errors = {
  [field in keyof Values]?: string;
};

type TaskFormProps = {
  values?: Values;
  errors?: Errors;
  noValidate?: boolean;
  onSubmit?: (
    event: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({
  values = {},
  errors = {},
  noValidate = true,
  onChange,
  onBlur,
  onSubmit,
}) => {
  const intl = useIntl();

  return (
    <Form noValidate={noValidate} onSubmit={onSubmit}>
      <FormField>
        <label htmlFor="title">
          <RegularText priority="high">
            <FormattedMessage {...messages.titleLabel} />
          </RegularText>
        </label>
        <FormInput
          placeholder={intl.formatMessage(messages.titlePlaceholder)}
          name="title"
          value={values.title}
          id="title"
          aria-describedby="title-error"
          aria-invalid={!!errors.title}
          invalid={!!errors.title}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.title && <FormError id="title-error">{errors.title}</FormError>}
      </FormField>

      <FormField>
        <DateTimePickerContainer>
          <RegularText priority="low">
            <CalendarIcon />
          </RegularText>

          <DatePicker
            value={values.startDate}
            onChange={(newStartDate) => {
              if (!onChange) {
                return;
              }

              onChange({
                target: {
                  name: "startDate",
                  value: newStartDate,
                },
              } as any);
            }}
          />
        </DateTimePickerContainer>

        {errors.startDate && (
          <FormError id="startDate-error">{errors.startDate}</FormError>
        )}
      </FormField>

      <FormField
        as="fieldset"
        aria-describedby="priority-error"
        aria-invalid={!!errors.priority}
      >
        <legend>
          <RegularText priority="high">
            <FormattedMessage {...messages.priorityLabel} />
          </RegularText>
        </legend>

        <Group>
          <FormRadioToggle
            name="priority"
            value=""
            checked={!values.priority}
            onChange={onChange}
          >
            <FormattedMessage {...messages.priorityNoneLabel} />
          </FormRadioToggle>
          <FormRadioToggle
            name="priority"
            value="low"
            checked={"priority" in values && values.priority === "low"}
            onChange={onChange}
          >
            <FormattedMessage {...messages.priorityLowLabel} />
          </FormRadioToggle>
          <FormRadioToggle
            name="priority"
            value="medium"
            checked={"priority" in values && values.priority === "medium"}
            onChange={onChange}
          >
            <FormattedMessage {...messages.priorityMediumLabel} />
          </FormRadioToggle>
          <FormRadioToggle
            name="priority"
            value="high"
            checked={"priority" in values && values.priority === "high"}
            onChange={onChange}
          >
            <FormattedMessage {...messages.priorityHighLabel} />
          </FormRadioToggle>
        </Group>
        {errors.priority && (
          <FormError id="priority-error">{errors.priority}</FormError>
        )}
      </FormField>

      <FormField>
        <label htmlFor="description">
          <RegularText priority="high">
            <FormattedMessage {...messages.descriptionLabel} />
          </RegularText>
        </label>
        <FormTextArea
          placeholder={intl.formatMessage(messages.descriptionPlaceholder)}
          name="description"
          value={values.description}
          id="description"
          aria-describedby="description-error"
          aria-invalid={!!errors.description}
          invalid={!!errors.description}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.description && (
          <FormError id="description-error">{errors.description}</FormError>
        )}
      </FormField>

      <ButtonsList aria-label="Task Form Controls">
        <li>
          <ButtonLink to="/">
            <SecondaryButton tabIndex={-1} type="button">
              <FormattedMessage {...messages.cancelButtonTitle} />
            </SecondaryButton>
          </ButtonLink>
        </li>

        <li>
          <PrimaryButton type="submit">
            <FormattedMessage {...messages.saveButtonTitle} />
          </PrimaryButton>
        </li>
      </ButtonsList>
    </Form>
  );
};

export default TaskForm;
