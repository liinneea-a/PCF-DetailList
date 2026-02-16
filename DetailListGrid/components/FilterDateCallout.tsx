import * as React from 'react';
import { Callout, Link, mergeStyleSets, Text, FontWeights, Calendar, Dropdown, IDropdownStyles, Stack, olProperties } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

interface IProps {
  anchor: HTMLElement;
  onDismiss: () => void;
  onApplyDateFilter: (date: Date, operator: string) => void;
}

export const FilterDateCallout = ({ anchor, onDismiss, onApplyDateFilter }: IProps) => {
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [isCalendarVisible, { setTrue: showCalendar, setFalse: hideCalendar }] = useBoolean(false);

  const options = [
    { key: 'date', text: 'Datum' },
    { key: 'onafter', text: 'På eller efter' },
    { key: 'today', text: 'Idag' },
  ];



  const handleDropdownChange = (option: any) => {
    setSelectedOption(option.key);

    if (option.key === 'today') {
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
          onChange={(e, o) => handleDropdownChange(o)}

        />
        {isCalendarVisible && (
          <>
            <Text>Valt datum: {selectedDate.toLocaleDateString()}</Text>
            <Calendar
              showGoToToday
              onSelectDate={setSelectedDate}
              value={selectedDate}
            // Calendar uses English strings by default. For localized apps, you must override this prop.
            // strings={defaultCalendarStrings}
            />
          </>

        )}
        <PrimaryButton styles={buttonStyles} onClick={() => onApplyDateFilter(selectedDate, selectedOption)}>Tillämpa</PrimaryButton>
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
