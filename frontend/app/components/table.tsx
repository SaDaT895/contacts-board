import { Button, IconButton, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import type { Contact } from "~/contact";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Form, useFetcher } from "react-router";

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
    let fetcher = useFetcher();

    return (
        <> <Button href="/contacts/new">Create new Contact</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(contacts ?? []).map(contact => (<TableRow key={contact.id}>
                            <TableCell>{contact.id}</TableCell>
                            <TableCell>{contact.firstname}</TableCell>
                            <TableCell>{contact.lastname}</TableCell>
                            <TableCell><Link href={`mailto:${contact.email}`}>{contact.email}</Link></TableCell>
                            <TableCell>
                                <Stack direction="row">
                                    <Tooltip title="View Contact">
                                        <IconButton href={`/contacts/${contact.id}`}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit Contact">
                                        <IconButton href={`/contacts/${contact.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Contact">
                                        <fetcher.Form action={`${contact.id}/delete`} method="post">
                                            <IconButton type="submit">
                                                <DeleteIcon />
                                            </IconButton>
                                        </fetcher.Form>

                                    </Tooltip>
                                </Stack>
                            </TableCell>
                        </TableRow>))}


                    </TableBody>
                </Table>
            </TableContainer></>
    )
}