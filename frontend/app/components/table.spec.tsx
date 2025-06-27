import { render, screen } from "@testing-library/react";
import { ContactsTable } from "./table";
import { describe, it, expect } from "vitest";
import { createRoutesStub } from "react-router";
import type { Contact } from "~/models/contact";

const mockContacts = [
    {
        id: 1,
        firstname: "Alice",
        lastname: "Smith",
        email: "alice@example.com",
    },
    {
        id: 2,
        firstname: "Bob",
        lastname: "Brown",
        email: "bob@example.com",
    },
] satisfies Contact[];

describe("ContactsTable", () => {
    it("renders all contacts", () => {
        const Stub = createRoutesStub([
            {
                path: '/contacts',
                Component: () => (<ContactsTable contacts={mockContacts} />)
            }
        ])
        render(<Stub initialEntries={['/contacts']} />)
        expect(screen.getByText("First Name")).toBeInTheDocument();

        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();

        expect(screen.getByRole("link", { name: "alice@example.com" })).toHaveAttribute(
            "href",
            "mailto:alice@example.com"
        );
    });

    it("has working links for actions", () => {
        const Stub = createRoutesStub([
            {
                path: '/contacts',
                Component: () => (<ContactsTable contacts={[mockContacts[0]]} />)
            }
        ])
        render(<Stub initialEntries={['/contacts']} />)
        expect(screen.getByRole("link", { name: 'View Contact' })).toHaveAttribute('href', '/contacts/1')

        expect(screen.getByRole("link", { name: 'Edit Contact' })).toHaveAttribute(
            "href",
            "/contacts/1/edit"
        );
    });

    it("renders empty state gracefully", () => {
        const Stub = createRoutesStub([
            {
                path: '/contacts',
                Component: () => (<ContactsTable contacts={[]} />)
            }
        ])
        render(<Stub initialEntries={['/contacts']} />)
        expect(screen.queryByText("First Name")).toBeInTheDocument();
        expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    });
});
