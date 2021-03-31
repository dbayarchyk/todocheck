import React from 'react';
import readableColor from 'polished/lib/color/readableColor';
import transparentize from 'polished/lib/color/transparentize';

import { RegularText } from '../RegularText';
import { IconButton } from '../IconButton';
import { CheveronRightIcon, CheveronLeftIcon } from '../Icons';
import { styled, css } from '../../themed-styled-components';
import { inline, inset, focusable } from '../../mixings';

const LEFT_ARROW_KEY_CODE = 37;
const UP_ARROW_KEY_CODE = 38;
const RIGHT_ARROW_KEY_CODE = 39;
const DOWN_ARROW_KEY_CODE = 40;
const SPACE_KEY_CODE = 32;

const Header = styled.div`
  ${inline('tiny')}

  align-items: center;
  justify-content: space-between;
`;

const DayTitles = styled.div`
  display: flex;
`;

const DayTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type DayButtonProps = {
  isToday?: boolean;
  isSelected?: boolean;
};

const DayText = styled(RegularText)`
  line-height: 1;
  height: 2ch;
  width: 2ch;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayButton = styled.button<DayButtonProps>`
  ${inset('small')}
  ${focusable}

  background: transparent;
  border: 0;
  border-radius: 50%;

  ${props =>
    props.isToday &&
    css`
      background: ${props =>
        transparentize(0.5, props.theme.color.primary['200'])};

      ${DayText} {
        color: ${props =>
          readableColor(transparentize(0.5, props.theme.color.primary['200']))};
      }
    `}

  ${props =>
    props.isSelected &&
    css`
      background: ${props => props.theme.color.primary['500']};

      ${DayText} {
        color: ${props => readableColor(props.theme.color.primary['500'])};
      }
    `}
`;

const Weeks = styled.div``;

const Week = styled.div`
  display: flex;
`;

const createDaysMatrix = (currentDate: Date): (Date | null)[][] => {
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  const numberOdDaysInCurrentMonth = endDate.getDate();

  const daysMatrix: (Date | null)[][] = [];

  let date = 1;

  for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
    daysMatrix.push([]);

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      // By default Sunday has number 0 but we want to place it at the end of the days list.
      const startDateDay = startDate.getDay() === 0 ? 7 : startDate.getDay();

      if (
        date > numberOdDaysInCurrentMonth ||
        (weekIndex === 0 && dayIndex + 1 < startDateDay)
      ) {
        daysMatrix[weekIndex][dayIndex] = null;
      } else {
        daysMatrix[weekIndex][dayIndex] = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          date,
        );
        date++;
      }
    }
  }

  return daysMatrix;
};

type CalendarProps = {
  previousMonthLabel?: string;
  nextMonthLabel?: string;
  weekDayLabels?: string[];
  monthLabels?: string[];
  selectedLabel?: string;
  todayLabel?: string;
  selectedDate?: Date;
  onSelectedDateChange?: (newSelectedDate: Date) => void;
};

export const Calendar: React.FC<CalendarProps> = ({
  previousMonthLabel = 'Previous Month',
  nextMonthLabel = 'Next Month',
  weekDayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  selectedLabel = 'Selected',
  todayLabel = 'Today',
  selectedDate,
  onSelectedDateChange,
}) => {
  const nowDateRef = React.useRef(new Date());
  const [currentDate, setCurrentDate] = React.useState(
    selectedDate || nowDateRef.current,
  );
  const [focusableDate, setFocusableDate] = React.useState(
    selectedDate || nowDateRef.current,
  );

  React.useEffect(() => {
    if (selectedDate) {
      setFocusableDate(selectedDate);
    }
  }, [selectedDate]);

  const focusDate = (date: Date) => {
    if (date.getMonth() !== currentDate.getMonth()) {
      setCurrentDate(date);
    }

    setTimeout(() => {
      if (!window) {
        return;
      }

      const newFocusedButton = window.document.getElementById(
        date.toISOString(),
      );

      if (newFocusedButton) {
        newFocusedButton.focus();
      }
    });
  };

  const updateFocusableDateOnMonthSwitch = (newDate: Date) => {
    if (
      selectedDate &&
      newDate.getFullYear() === selectedDate.getFullYear() &&
      newDate.getMonth() === selectedDate.getMonth()
    ) {
      setFocusableDate(selectedDate);
      return;
    }

    if (
      newDate.getFullYear() === nowDateRef.current.getFullYear() &&
      newDate.getMonth() === nowDateRef.current.getMonth()
    ) {
      setFocusableDate(nowDateRef.current);
      return;
    }

    const newFocusableDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      1,
    );

    return setFocusableDate(newFocusableDate);
  };

  const switchToPrevMonth = () => {
    const prevDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate(),
    );

    setCurrentDate(prevDate);
    updateFocusableDateOnMonthSwitch(prevDate);
  };

  const switchToNextMonth = () => {
    const nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );

    setCurrentDate(nextDate);
    updateFocusableDateOnMonthSwitch(nextDate);
  };

  const focusPreviousDay = (currentDay: Date) => {
    const previousDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDate() - 1,
    );

    setFocusableDate(previousDay);
    focusDate(previousDay);
  };

  const focusNextDay = (currentDay: Date) => {
    const nextDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDate() + 1,
    );

    setFocusableDate(nextDay);
    focusDate(nextDay);
  };

  const focusPreviousDayLastWeek = (currentDay: Date) => {
    const previousDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDate() - 7,
    );

    setFocusableDate(previousDay);
    focusDate(previousDay);
  };

  const focusNextDayNextWeek = (currentDay: Date) => {
    const nextDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDate() + 7,
    );

    setFocusableDate(nextDay);
    focusDate(nextDay);
  };

  const handleDayKeyUp = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    day: Date,
  ) => {
    switch (event.keyCode) {
      case LEFT_ARROW_KEY_CODE:
        focusPreviousDay(day);
        break;
      case RIGHT_ARROW_KEY_CODE:
        focusNextDay(day);
        break;
      case UP_ARROW_KEY_CODE:
        focusPreviousDayLastWeek(day);
        break;
      case DOWN_ARROW_KEY_CODE:
        focusNextDayNextWeek(day);
        break;
      case SPACE_KEY_CODE:
        handleDaySelection(day);
        break;
    }
  };

  const handleDaySelection = (day: Date) => {
    if (onSelectedDateChange) {
      onSelectedDateChange(day);
    }
  };

  const getDayButtonLabel = (day: Date): string => {
    const label = day.toDateString();

    if (selectedDate && selectedDate.toDateString() === day.toDateString()) {
      return `${label} - ${selectedLabel}`;
    }

    if (nowDateRef.current.toDateString() === day.toDateString()) {
      return `${label} - ${todayLabel}`;
    }

    return label;
  };

  return (
    <div>
      <Header>
        <IconButton
          type="button"
          aria-label={previousMonthLabel}
          onClick={switchToPrevMonth}
        >
          <CheveronLeftIcon />
        </IconButton>
        <RegularText priority="high">
          {monthLabels[currentDate.getMonth()]} {currentDate.getFullYear()}
        </RegularText>
        <IconButton
          type="button"
          aria-label={nextMonthLabel}
          onClick={switchToNextMonth}
        >
          <CheveronRightIcon />
        </IconButton>
      </Header>

      <DayTitles>
        {weekDayLabels.map(weekDayLabel => (
          <DayTitle>
            <RegularText aria-hidden="true" priority="low">
              {weekDayLabel}
            </RegularText>
          </DayTitle>
        ))}
      </DayTitles>

      <Weeks role="grid">
        {createDaysMatrix(currentDate).map((week, weekIndex) => (
          <Week key={weekIndex} role="row">
            {week.map((day, dayIndex) => (
              <DayTitle key={dayIndex} role="gridcell">
                {day && (
                  <DayButton
                    type="button"
                    id={day.toISOString()}
                    tabIndex={
                      focusableDate.toDateString() === day.toDateString()
                        ? undefined
                        : -1
                    }
                    aria-label={getDayButtonLabel(day)}
                    isToday={
                      nowDateRef.current.toDateString() === day.toDateString()
                    }
                    isSelected={
                      selectedDate &&
                      selectedDate.toDateString() === day.toDateString()
                    }
                    onClick={() => handleDaySelection(day)}
                    onKeyUp={event => handleDayKeyUp(event, day)}
                  >
                    <DayText>{day.getDate()}</DayText>
                  </DayButton>
                )}
              </DayTitle>
            ))}
          </Week>
        ))}
      </Weeks>
    </div>
  );
};
