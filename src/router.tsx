import { createHashHistory, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const memoryHistory = createHashHistory();

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  history: memoryHistory,
});
