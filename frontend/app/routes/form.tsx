import type { Route } from ".react-router/types/app/routes/+types/form"
import { Dialog } from "@mui/material"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    return { id: params.id }
}

export default function Form({ loaderData }: Route.ComponentProps) {
    return (<Dialog open></Dialog>)
}