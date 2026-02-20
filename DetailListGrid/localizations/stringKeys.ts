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
    DateFilterCalloutDropdownPlaceholder: "DateFilterCalloutDropdownPlaceholder",
    DateFilterCalloutButtonPrimary: "DateFilterCalloutButtonPrimary",
    DateFilterCalloutButtonSecondary: "DateFilterCalloutButtonSecondary",

    // Dropdown options
    DateFilterCalloutDropdownOptionDate: "DateFilterCalloutDropdownOptionDate",
    DateFilterCalloutDropdownOptionOnAfter: "DateFilterCalloutDropdownOptionOnAfter",
    DateFilterCalloutDropdownOptionOnBefore: "DateFilterCalloutDropdownOptionOnBefore",
    DateFilterCalloutDropdownOptionToday: "DateFilterCalloutDropdownOptionToday",

    // Calendar strings
    CalendarGoToDay: "CalendarGoToDay",
    CalendarMonthJan: "CalendarMonthJan",
    CalendarMonthFeb: "CalendarMonthFeb",
    CalendarMonthMar: "CalendarMonthMar",
    CalendarMonthApr: "CalendarMonthApr",
    CalendarMonthMay: "CalendarMonthMay",
    CalendarMonthJun: "CalendarMonthJun",
    CalendarMonthJul: "CalendarMonthJul",
    CalendarMonthAug: "CalendarMonthAug",
    CalendarMonthSep: "CalendarMonthSep",
    CalendarMonthOct: "CalendarMonthOct",
    CalendarMonthNov: "CalendarMonthNov",
    CalendarMonthDec: "CalendarMonthDec",

    CalendarMonthJanShort: "CalendarMonthJanShort",
    CalendarMonthFebShort: "CalendarMonthFebShort",
    CalendarMonthMarShort: "CalendarMonthMarShort",
    CalendarMonthAprShort: "CalendarMonthAprShort",
    CalendarMonthMayShort: "CalendarMonthMayShort",
    CalendarMonthJunShort: "CalendarMonthJunShort",
    CalendarMonthJulShort: "CalendarMonthJulShort",
    CalendarMonthAugShort: "CalendarMonthAugShort",
    CalendarMonthSepShort: "CalendarMonthSepShort",
    CalendarMonthOctShort: "CalendarMonthOctShort",
    CalendarMonthNovShort: "CalendarMonthNovShort",
    CalendarMonthDecShort: "CalendarMonthDecShort",

    CalendarDayMon: "CalendarDayMon",
    CalendarDayTue: "CalendarDayTue",
    CalendarDayWed: "CalendarDayWed",
    CalendarDayThu: "CalendarDayThu",
    CalendarDayFri: "CalendarDayFri",
    CalendarDaySat: "CalendarDaySat",
    CalendarDaySun: "CalendarDaySun",

    CalendarDayMonShort: "CalendarDayMonShort",
    CalendarDayTueShort: "CalendarDayTueShort",
    CalendarDayWedShort: "CalendarDayWedShort",
    CalendarDayThuShort: "CalendarDayThuShort",
    CalendarDayFriShort: "CalendarDayFriShort",
    CalendarDaySatShort: "CalendarDaySatShort",
    CalendarDaySunShort: "CalendarDaySunShort",



} as const;

export type StringKey = typeof StringKeys[keyof typeof StringKeys];