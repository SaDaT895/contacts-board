import type { Route } from ".react-router/types/app/routes/+types/delete";
import { redirect } from "react-router";

export async function clientAction({ params }: Route.ClientActionArgs) {
  const res = await fetch(`http://localhost:3000/contacts/${params.id}`, {
    method: "delete",
    credentials: "include",
  });
  if (res.ok) return redirect("/contacts");
}
