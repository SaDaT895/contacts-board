import type { Route } from ".react-router/types/app/routes/+types/contact";
import ContactCard from "~/components/contact-card";
import type { Contact, ContactRecord } from "~/models/contact";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const res = await fetch(`http://localhost:3000/contacts/${params.id}`, {
        credentials: 'include'
    })
    const contact: ContactRecord = await res.json().then(res => ({ id: res.id, ...res.properties }))

    return contact
}


export default function Contact({ loaderData }: Route.ComponentProps) {
    return <ContactCard contact={loaderData} />
}