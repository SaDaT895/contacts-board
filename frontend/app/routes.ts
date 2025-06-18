import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("contacts", [
    index("routes/list.tsx"),
    route(":id", "routes/contact.tsx"),
    route(":id/edit", "routes/form.tsx"),
  ]),
] satisfies RouteConfig;
