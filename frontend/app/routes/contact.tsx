import type { Route } from ".react-router/types/app/routes/+types/contact";
import type { Contact, ContactCard } from "~/contact";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const res = await fetch(`http://localhost:3000/contacts/${params.id}`, {
        credentials: 'include'
    })
    const contact: ContactCard = await res.json().then(res => ({ id: res.id, ...res.properties }))

    return contact
}


export default function Contact({ loaderData }: Route.ComponentProps) {
    return <div>Contact </div>
}