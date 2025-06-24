import type { Route } from ".react-router/types/app/routes/+types/list"
import { redirect } from "react-router";
import { ContactsTable } from "~/components/table";
import type { Contact } from "~/contact";


export async function clientLoader() {
    try {
        const res = await fetch('http://localhost:3000/contacts', {
            credentials: 'include'
        })
        console.log(res.statusText)
        const contacts: Array<Contact> = await res.json().then(res => res.map(r => ({ id: r.id, ...r.properties })))
        return contacts
    } catch (error) {
        alert(error)
    }
}



export default function List({
    loaderData
}: Route.ComponentProps) {
    return <ContactsTable contacts={loaderData} />
}