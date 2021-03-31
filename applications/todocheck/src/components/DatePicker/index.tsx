import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import InputMask from "react-input-mask";
import transparentize from "polished/lib/color/transparentize";
import { isValid } from "date-fns";
import {
  PrimaryButton,
  SecondaryButton,
  Calendar,
  styled,
  inset,
  inline,
  stack,
  TimeIcon,
  FormInput,
  RegularText,
  VisuallyHidden,
  IconButton,
  CloseIcon,
  inputBox,
  css,
  getInsetSquishHorizontalSpacing,
} from "@dbayarhyk/design-system";

import toShortISOString from "../../utils/toShortISOString";
import messages from "./messages";

const PickerContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const ButtonContainer = styled.div`
  ${inline("tiny")}

  align-items: center;
  position: relative;
`;

type ButtonProps = {
  hasCancelButton?: boolean;
};

const Button = styled.button<ButtonProps>`
  ${inputBox}

  ${(props) =>
    props.hasCancelButton &&
    css`
      padding-right: calc(
        ${(props) => getInsetSquishHorizontalSpacing("small", props.theme)} +
          1rem
      );
    `}
`;

const StyledCloseButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const CalendarContainer = styled.div`
  ${inset("small")}
  ${stack("medium")}

  top: 0;
  z-index: 2;
  position: absolute;
  border-radius: ${(props) => props.theme.borders.radius.medium};
  box-shadow: 0px 0px 5px 0px
    ${(props) => transparentize(0.8, props.theme.color.grey[900])};
  background: ${(props) => props.theme.color.grey["100"]};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CloseOverlay = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TimeFieldContainer = styled.div`
  ${inline("small")}

  align-items: center;
  justify-content: center;
`;

const Actions = styled.div`
  ${inline("tiny")}

  justify-content: space-evenly;
`;

const parseISODateString = (isoDateString: string) =>
  isoDateString.substring(0, 16).split("T");

type DatePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ value = "", onChange }) => {
  const [selectedDate, selectedTime] = parseISODateString(value);
  const valueRef = React.useRef<string>();
  const [date, setDate] = React.useState(selectedDate);
  const [time, setTime] = React.useState(selectedTime);
  const [isOpen, setIsOpen] = React.useState(false);
  const intl = useIntl();

  React.useEffect(() => {
    if (value === valueRef.current) {
      return;
    }

    const [newSelectedDate, newSelectedTime] = parseISODateString(value);

    setDate(newSelectedDate);
    setTime(newSelectedTime);
    valueRef.current = selectedDate;
  }, [value, valueRef.current]);

  const resetValue = () => {
    setDate("");
    setTime("");

    if (onChange) {
      onChange("");
    }
  };

  const closeCalendar = () => {
    setDate(selectedDate);
    setIsOpen(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 27) {
      closeCalendar();
    }
  };

  return (
    <PickerContainer onKeyUp={handleKeyUp}>
      <ButtonContainer>
        <Button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          hasCancelButton={!!selectedDate}
        >
          {selectedDate ? (
            `${selectedDate}${selectedTime ? `, ${selectedTime}` : ""}`
          ) : (
            <FormattedMessage {...messages.addDateTime} />
          )}
        </Button>
        {selectedDate && (
          <StyledCloseButton
            type="button"
            aria-label={intl.formatMessage(messages.removeDate)}
            onClick={resetValue}
          >
            <CloseIcon />
          </StyledCloseButton>
        )}
      </ButtonContainer>
      {isOpen && (
        <>
          <CloseOverlay onClick={() => setIsOpen(false)} />
          <CalendarContainer>
            <Calendar
              selectedDate={
                isValid(new Date(date)) ? new Date(date) : undefined
              }
              onSelectedDateChange={(newDate) => {
                setDate(toShortISOString(newDate));
              }}
            />

            <TimeFieldContainer>
              <RegularText priority="low">
                <TimeIcon />
              </RegularText>

              <label>
                <VisuallyHidden>
                  <FormattedMessage {...messages.time} />
                </VisuallyHidden>
                <InputMask
                  value={time}
                  mask="99:99"
                  placeholder="00:00"
                  beforeMaskedValueChange={(newState, _, userInput) => {
                    if (!userInput || !newState.selection) {
                      return newState;
                    }

                    const [hours, minutes] = newState.value.split(":");

                    if (newState.selection.end === 1 && Number(userInput) > 2) {
                      return {
                        value: `0${userInput}:${minutes}`,
                        selection: {
                          start: newState.selection.start + 2,
                          end: newState.selection.end + 2,
                        },
                      };
                    }

                    if (newState.selection.end === 4 && Number(userInput) > 5) {
                      return {
                        value: `${hours}:0${userInput}`,
                        selection: {
                          start: newState.selection.start + 1,
                          end: newState.selection.end + 1,
                        },
                      };
                    }

                    return newState;
                  }}
                  onChange={(event) => {
                    setTime(event.target.value);
                  }}
                >
                  {(inputProps: any) => (
                    <FormInput
                      {...inputProps}
                      pattern="[0-9]*"
                      expectedLength={5}
                    />
                  )}
                </InputMask>
              </label>
            </TimeFieldContainer>

            <Actions>
              <SecondaryButton type="button" onClick={closeCalendar}>
                <FormattedMessage {...messages.cancel} />
              </SecondaryButton>

              <PrimaryButton
                type="button"
                onClick={() => {
                  if (onChange) {
                    let newValue = "";

                    if (date) {
                      newValue = date;
                    }

                    if (time) {
                      newValue += "T" + time;
                    }

                    onChange(newValue);
                  }

                  closeCalendar();
                }}
              >
                <FormattedMessage {...messages.save} />
              </PrimaryButton>
            </Actions>
          </CalendarContainer>
        </>
      )}
    </PickerContainer>
  );
};

export default DatePicker;
