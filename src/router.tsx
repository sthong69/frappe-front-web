import {
  createBrowserHistory,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import PageNotFound from "./components/PageNotFound";

const history = createBrowserHistory();

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  history,
  defaultNotFoundComponent: () => {
    return <PageNotFound />;
  },
});
