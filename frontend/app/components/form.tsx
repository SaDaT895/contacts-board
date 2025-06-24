import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Form, useNavigate } from "react-router";
import type { Contact } from "~/contact";

export default function ContactForm({ contact }: { contact?: Contact }) {
    const [open, setOpen] = useState(true)
    const editing = !contact

    const navigate = useNavigate()

    const close = () => {
        setOpen(false)
        navigate(-1)
    }

    return <Dialog open={open} onClose={close}>
        <DialogTitle>{editing ? 'Create New contact' : `Edit Contact ${contact.id}`}</DialogTitle>
        <DialogContent>
            <Box sx={{ mt: 3 }}>
                <Form method="post">
                    <Stack spacing={4}>
                        <TextField required name="firstname" label="FirstName" defaultValue={contact?.firstname} variant="outlined" />
                        <TextField required name="lastname" label="LastName" defaultValue={contact?.lastname} variant="outlined" />
                        <TextField required name="email" label="Email" defaultValue={contact?.email} type="email" variant="outlined" />
                    </Stack>
                    <Button type="submit">Submit</Button>

                </Form>
            </Box>
        </DialogContent>
    </Dialog>
}