import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useFetcher, useNavigate } from "react-router";
import type { ContactRecord } from "~/contact";

export default function ContactCard({ contact }: { contact: ContactRecord }) {
    const [open, setOpen] = useState<boolean>(true)
    const navigate = useNavigate()
    const fetcher = useFetcher()

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
                <Typography variant="body2">Created at: {Date.apply(contact.createdate)}</Typography>
                <Typography variant="body2">Last updated at: {Date.apply(contact.lastmodifieddate)}</Typography>

            </CardContent>
            <CardActions>
                <Button>Edit</Button>
                <fetcher.Form action='delete' method="post">
                    <Button type="submit">Delete</Button>
                </fetcher.Form>
                <Button onClick={onClose}>Close</Button>
            </CardActions>
        </Card>
    </Dialog>
}