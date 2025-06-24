import type { Route } from ".react-router/types/app/routes/+types/list"
import { redirect } from "react-router";
import { ContactsTable } from "~/components/table";
import type { Contact } from "~/contact";


export async function clientLoader() {
    const res = await fetch('http://localhost:3000/contacts', {
        credentials: 'include'
    })
    if (res.ok) {
        const contacts: Array<Contact> = await res.json().then(res => res.map(r => ({ id: r.id, ...r.properties })))
        return contacts
    }
    alert(res.statusText)
    return redirect('/')

}

export default function List({
    loaderData
}: Route.ComponentProps) {
    return <ContactsTable contacts={loaderData} />
}