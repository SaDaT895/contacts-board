import type { Route } from ".react-router/types/app/routes/+types/contact";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    return { id: params.id }
}

export default function Contact({ loaderData }: Route.ComponentProps) {
    return <div>Contact {loaderData.id}</div>
}