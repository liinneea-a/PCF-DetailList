import * as React from 'react';
import { Callout, Link, mergeStyleSets, Text, FontWeights, Calendar, Dropdown, IDropdownStyles, Stack, olProperties, ICalendarStrings, defaultCalendarStrings } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton, IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { DateFilterOperator } from '../types/DateFilterOperator';
import { useStrings } from '../contexts/StringsContext';

interface IProps {
  anchor: HTMLElement;
  onDismiss: () => void;
  columnKey: string;
  onApplyDateFilter: (date: Date, operator: DateFilterOperator, columnKey: string) => void;
}

interface IOption {
  key: DateFilterOperator;
  text: string;
}

export const FilterDateCallout = ({ anchor, onDismiss, columnKey, onApplyDateFilter }: IProps) => {
  const strings = useStrings();
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedOption, setSelectedOption] = React.useState<DateFilterOperator | null>(null);
  const [isCalendarVisible, { setTrue: showCalendar, setFalse: hideCalendar }] = useBoolean(false);

  const options = [
    { key: DateFilterOperator.Date, text: strings.DateFilterCalloutDropdownOptionDate },
    { key: DateFilterOperator.On_or_after, text: strings.DateFilterCalloutDropdownOptionOnAfter },
    { key: DateFilterOperator.On_or_before, text: strings.DateFilterCalloutDropdownOptionOnBefore },
    { key: DateFilterOperator.Today, text: strings.DateFilterCalloutDropdownOptionToday },
  ];



  const handleDropdownChange = (option: IOption) => {
    setSelectedOption(option.key);

    if (option.key === DateFilterOperator.Today) {
      hideCalendar();
    } else {
      showCalendar();
    }
  };

  const CalendarStrings: ICalendarStrings = {
    goToToday: strings.CalendarGoToDay,
    months: [
      strings.CalendarMonthJan,
      strings.CalendarMonthFeb,
      strings.CalendarMonthMar,
      strings.CalendarMonthApr,
      strings.CalendarMonthMay,
      strings.CalendarMonthJun,
      strings.CalendarMonthJul,
      strings.CalendarMonthAug,
      strings.CalendarMonthSep,
      strings.CalendarMonthOct,
      strings.CalendarMonthNov,
      strings.CalendarMonthDec,
    ]
    ,
    shortMonths: [
      strings.CalendarMonthJanShort,
      strings.CalendarMonthFebShort,
      strings.CalendarMonthMarShort,
      strings.CalendarMonthAprShort,
      strings.CalendarMonthMayShort,
      strings.CalendarMonthJunShort,
      strings.CalendarMonthJulShort,
      strings.CalendarMonthAugShort,
      strings.CalendarMonthSepShort,
      strings.CalendarMonthOctShort,
      strings.CalendarMonthNovShort,
      strings.CalendarMonthDecShort,],


    days: [
      strings.CalendarDaySun,
      strings.CalendarDayMon,
      strings.CalendarDayTue,
      strings.CalendarDayWed,
      strings.CalendarDayThu,
      strings.CalendarDayFri,
      strings.CalendarDaySat,

    ],

    shortDays: [
      strings.CalendarDaySunShort,
      strings.CalendarDayMonShort,
      strings.CalendarDayTueShort,
      strings.CalendarDayWedShort,
      strings.CalendarDayThuShort,
      strings.CalendarDayFriShort,
      strings.CalendarDaySatShort,

    ],
  };

  return (

    <Callout
      className={styles.callout}
      ariaLabelledBy={labelId}
      ariaDescribedBy={descriptionId}
      role="dialog"
      gapSpace={0}
      target={anchor}
      onDismiss={onDismiss}
      setInitialFocus
    >
      <Stack
        tokens={{ childrenGap: 15 }}
      >
        <Stack
          horizontal
          horizontalAlign='space-between'
          verticalAlign='center'
        >
          <Text variant="large">{strings.DateFilterCalloutTitle}</Text>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            title="Cancel"
            ariaLabel="Close callout"
            onClick={onDismiss}
          />
        </Stack>
        <Dropdown
          placeholder={strings.DateFilterCalloutDropdownPlaceholder}
          options={options}
          styles={dropdownStyles}
          onChange={(e, o) => handleDropdownChange(o as IOption)}

        />
        {isCalendarVisible && (
          <>
            <Text>{strings.DateFilterCalloutSelectedDate}: {selectedDate.toLocaleDateString()}</Text>
            <Calendar
              showGoToToday
              onSelectDate={setSelectedDate}
              value={selectedDate}
              firstDayOfWeek={1} // Starta veckan på måndag
              // Calendar uses English strings by default. For localized apps, you must override this prop.
              strings={CalendarStrings}
            />
          </>

        )}
        {/* <Stack
          horizontal
          horizontalAlign='space-between'
        > */}
          <PrimaryButton
            text={strings.DateFilterCalloutButtonPrimary}
            styles={buttonStyles}
            onClick={() => onApplyDateFilter(selectedDate, selectedOption!, columnKey)}
            disabled={!selectedOption}
          />
          {/* <DefaultButton
            text={strings.DateFilterCalloutButtonSecondary}
            styles={buttonStyles}
            onClick={() => console.log("default button")}
            allowDisabledFocus disabled={true}
          /> */}
        {/* </Stack> */}
      </Stack>
    </Callout>

  );
};
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200 },
};

const buttonStyles = mergeStyleSets({
  root: {
    width: 'min-content',
  },
});

const styles = mergeStyleSets({
  callout: {
    width: "min-content",
    padding: '20px 24px',
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  link: {
    display: 'block',
    marginTop: 20,
  }
});
