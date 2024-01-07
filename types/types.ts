export interface RouterItems {
  id: number;
  title: string;
  routerUrl: string;
  iconName: string;
}
export interface IUpdatedProfile {
  id: string | undefined;
  name: string;
  surname: string;
  date_of_birtday: string;
  city: string;
}
export interface IGetTickets {
  id: number;
  name: string;
  title: string;
  date: string;
  body: string;
}
export interface IColumnsTable {
  name: string;
  label: string;
  field: string | Function;
  sortable: boolean;
  required: boolean;
  align: string;
}
