import type { Route } from ".react-router/types/app/routes/+types/list"

export async function clientLoader() {
    const res = await fetch('http://localhost:3000/contacts', {
        credentials: 'include'
    })
    console.log(res)
    return res
}

export default function List({
    loaderData
}: Route.ComponentProps) {
    return <div>List of Contacts: {loaderData}</div>
}