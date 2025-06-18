import type { Route } from ".react-router/types/app/routes/+types/form"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    return { id: params.id }
}

export default function Form({ loaderData }: Route.ComponentProps) {
    return <div>Editing Contact {loaderData.id}</div>
}