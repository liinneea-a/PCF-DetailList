export const StringKeys = {
    //Search bar
    SearchBoxPlaceholder: "SearchBoxPlaceholder",
    ButtonClearFilters: "ButtonClearFilters",
    DropdownPlaceholder: "DropdownPlaceholder",
    DropdownOptionAll: "DropdownOptionAll",

    // Footer
    FooterRecordsLabel: "FooterRecordsLabel",
    FooterSelected: "FooterSelected",
    FooterButtonNext: "FooterButtonNext",

    // Date filter callout
    DateFilterCalloutTitle: "DateFilterCalloutTitle",
    DateFilterCalloutSelectedDate: "DateFilterCalloutSelectedDate",
    // Dropdown options
    DateFilterCalloutDropdownOptionDate: "DateFilterCalloutDropdownOptionDate",
    DateFilterCalloutDropdownOptionOnAfter: "DateFilterCalloutDropdownOptionOnAfter",
    DateFilterCalloutDropdownOptionOnBefore: "DateFilterCalloutDropdownOptionOnBefore",
    DateFilterCalloutDropdownOptionToday: "DateFilterCalloutDropdownOptionToday"
} as const;

export type StringKey = typeof StringKeys[keyof typeof StringKeys];