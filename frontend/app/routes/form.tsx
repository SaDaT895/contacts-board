import type { Route } from ".react-router/types/app/routes/+types/form"
import { redirect } from "react-router"
import ContactForm from "~/components/form"
import type { Contact } from "~/models/contact"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const res = await fetch(`http://localhost:3000/contacts/${params.id}`, {
        credentials: 'include'
    })
    const contact: Contact = await res.json().then(res => ({ id: res.id, ...res.properties }))

    return contact
}

export async function clientAction({ params, request }: Route.ActionArgs) {
    const data = await request.formData();
    const res = await fetch(`http://localhost:3000/contacts/${params.id}`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
            email: data.get('email')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) return redirect('/contacts')
    alert(`${res.statusText}: ${await res.json().then(e => e.message ? e.message : e.body.message)}`)
    return redirect('/')
}

export default function Form({ loaderData }: Route.ComponentProps) {
    return <ContactForm contact={loaderData} />
}