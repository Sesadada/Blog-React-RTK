import { sub } from "date-fns";

export const users = [
  {
    id: 1,
    name: "Serena Olivieri",
  },
  {
    id: 2,
    name: "Lucille Bertrand",
  },
  {
    id: 3,
    name: "Miguel Carroza",
  },
];

export const blogs = [
  {
    id: 1,
    title: "learning",
    content:
      "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee Lorem ipsum dolor sit amet consectetur adipisicing elit. At eos consequuntur aspernatur accusantium corrupti, assumenda reprehenderit aut omnis vero animi sequi sapiente voluptatibus adipisci quisquam minima laboriosam natus fugit fugiat?",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      thumbsDown: 0,
      wow: 0,
      heart: 0,
    },
  },
  {
    id: 2,
    title: "appliying",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At eos consequuntur aspernatur accusantium corrupti, assumenda reprehenderit aut omnis vero animi sequi sapiente voluptatibus adipisci quisquam minima laboriosam natus fugit fugiat?",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      thumbsDown: 0,
      wow: 0,
      heart: 0,
    },
  },
  {
    id: 3,
    title: "yeahhhh",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At eos consequuntur aspernatur accusantium corrupti, assumenda reprehenderit aut omnis vero animi sequi sapiente voluptatibus adipisci quisquam minima laboriosam natus fugit fugiat?",
    date: sub(new Date(), { minutes: 1 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      thumbsDown: 0,
      wow: 0,
      heart: 0,
    },
  },
];
