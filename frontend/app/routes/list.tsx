import type { Route } from ".react-router/types/app/routes/+types/list"

export async function clientLoader() {
    const res = await fetch('http://localhost:3000/contacts', {
        credentials: 'include'
    }).then(r => r.json())
    console.log(res)
    return res as Array<any>;
}

export default function List({
    loaderData
}: Route.ComponentProps) {
    return <div>List of Contacts: {loaderData.map(item => <p>{JSON.stringify(item)}</p>)}</div>
}