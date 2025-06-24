import type { Route } from ".react-router/types/app/routes/+types/new";
import { redirect } from "react-router";
import ContactForm from "~/components/form";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const data = await request.formData();
    const res = await fetch(`http://localhost:3000/contacts`, {
        method: "post",
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
    if (res.status === 201) return redirect('/contacts')
    alert(`${res.statusText}: ${await res.json().then(e => e.message ? e.message : e.body.message)}`)
    return redirect('/')
}

export default function New() {
    return <ContactForm />
}