import type { IColumnsTable, IGetTickets, RouterItems } from "~/types/types";

const uuId = () => {
  return Math.floor(
    Math.ceil((Math.random() * 1000) / Math.PI) *
      Math.ceil((Math.random() * 900) / Math.PI)
  );
};

const randomId = uuId();

export const routerItems: RouterItems[] = [
  {
    id: randomId,
    title: "Home",
    routerUrl: "/",
    iconName: "mdi:home",
  },
  {
    id: randomId,
    title: "Login",
    routerUrl: "/login",
    iconName: "mdi:login-variant",
  },
  {
    id: randomId,
    title: "Profile",
    routerUrl: "/profile",
    iconName: "mdi:account-cowboy-hat-outline",
  },
  {
    id: randomId,
    title: "Tickets",
    routerUrl: "/tickets",
    iconName: "material-symbols-light:lists",
  },
];

export const columns: IColumnsTable[] = [
  {
    name: "url",
    required: false,
    label: "",
    field: (row: IGetTickets) => row?.id,
    sortable: false,
    align: "left",
  },
  {
    name: "id",
    label: "Id",
    field: "id",
    sortable: true,
    required: true,
    align: "left",
  },
  {
    name: "name",
    label: "Author",
    field: "name",
    sortable: true,
    required: true,
    align: "center",
  },
  {
    name: "title",
    label: "Title",
    field: "title",
    sortable: true,
    required: true,
    align: "center",
  },
  {
    name: "body",
    label: "Details",
    field: "body",
    sortable: true,
    required: true,
    align: "center",
  },
  {
    name: "date",
    label: "Date Created",
    field: "date",
    sortable: true,
    required: true,
    align: "center",
  },
];
