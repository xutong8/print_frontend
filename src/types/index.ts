import dayjs from "dayjs";

export type RouteType = {
  title: string;
  path: string;
  element: React.ReactElement;
  parentDir?: string;
  children?: RouteType[];
};

export type DayType = dayjs.Dayjs | null;
