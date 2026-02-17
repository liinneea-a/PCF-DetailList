import * as React from 'react';
import { Callout, Link, mergeStyleSets, Text, FontWeights, Calendar, Dropdown, IDropdownStyles, Stack, olProperties } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { DateFilterOperator } from '../types/DateFilterOperator';

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
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedOption, setSelectedOption] = React.useState<DateFilterOperator | null>(null);
  const [isCalendarVisible, { setTrue: showCalendar, setFalse: hideCalendar }] = useBoolean(false);

  const options = [
    { key: DateFilterOperator.Date, text: 'Datum' },
    { key: DateFilterOperator.On_or_after, text: 'På eller efter' },
    { key: DateFilterOperator.On_or_before, text: 'På eller före' },
    { key: DateFilterOperator.Today, text: 'Idag' },
  ];



  const handleDropdownChange = (option: IOption) => {
    setSelectedOption(option.key);

    if (option.key === DateFilterOperator.Today) {
      hideCalendar();
    } else {
      showCalendar();
    }
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
        <Text variant="large">Filtrera efter</Text>
        <Dropdown
          placeholder="Select an option"
          // label="Basic uncontrolled example"
          options={options}
          styles={dropdownStyles}
          onChange={(e, o) => handleDropdownChange(o as IOption)}

        />
        {isCalendarVisible && (
          <>
            <Text>Valt datum: {selectedDate.toLocaleDateString()}</Text>
            <Calendar
              showGoToToday
              onSelectDate={setSelectedDate}
              value={selectedDate}
              firstDayOfWeek={1} // Starta veckan på måndag
            // Calendar uses English strings by default. For localized apps, you must override this prop.
            // strings={defaultCalendarStrings}
            />
          </>

        )}
        <PrimaryButton
          styles={buttonStyles}
          onClick={() => onApplyDateFilter(selectedDate, selectedOption!, columnKey)}
          disabled={!selectedOption}
        >
          Tillämpa
        </PrimaryButton>
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
