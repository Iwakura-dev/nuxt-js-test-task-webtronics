import type { IGetTickets } from "~/types/types";
import axios from "axios";

function formattedDate(d = new Date()) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return `${day}.${month}.${year}`;
}

async function getTicket(tickets: any) {
  try {
    const { data } = await axios.get<IGetTickets[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    tickets.value = data
      .map((items: IGetTickets) => {
        return {
          id: items.id,
          name: "John Doe",
          title: items.title,
          body: items.body,
          date: formattedDate(),
        };
      })
      .splice(0, 30);
  } catch (error) {
    if (axios instanceof Error) {
      console.log(error);
    }
  }
}
export default getTicket;
