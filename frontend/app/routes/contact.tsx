import type { Route } from ".react-router/types/app/routes/+types/contact";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const res = await fetch(`http://localhost:3000/contacts/${params.id}`, {
        credentials: 'include'
    })
    return { data: await res.text() }
}

export default function Contact({ loaderData }: Route.ComponentProps) {
    return <div>Contact {loaderData.data}</div>
}