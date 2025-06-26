import { Button, Card, CardActions, CardContent, CardHeader, Dialog, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { Form, useFetcher, useNavigate } from "react-router";
import type { ContactRecord } from "~/models/contact";

export default function ContactCard({ contact }: { contact: ContactRecord }) {
    const [open, setOpen] = useState<boolean>(true)
    const navigate = useNavigate()
    const fetcher = useFetcher()
    let busy = fetcher.state !== "idle";

    const onClose = () => {
        setOpen(false);
        navigate(-1)
    }

    return <Dialog open={open} onClose={() => navigate(-1)}>
        <Card>
            <CardHeader title={contact.id} />
            <Divider />
            <CardContent>
                <Typography>Name: {contact.firstname} {contact.lastname}</Typography>
                <Typography>Email: {contact.email}</Typography>
                <Typography variant="body2">Created at: {new Date(contact.createdate).toLocaleString('en-NL')}</Typography>
                <Typography variant="body2">Last updated at: {new Date(contact.lastmodifieddate).toLocaleString('en-NL')}</Typography>
            </CardContent>
            <CardActions>
                <Form action='edit'>
                    <Button type="submit">Edit</Button>
                </Form>
                <fetcher.Form action='delete' method="post">
                    <Button type="submit">{busy ? "Deleting..." : "Delete"}</Button>
                </fetcher.Form>
                <Button onClick={onClose}>Close</Button>
            </CardActions>
        </Card>
    </Dialog>
}