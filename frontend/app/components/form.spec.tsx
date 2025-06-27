import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ContactForm from "./form";
import { createRoutesStub } from "react-router";
import * as reactRouter from 'react-router'

describe("ContactForm", () => {
    it("renders create mode correctly", () => {
        const Stub = createRoutesStub([
            {
                path: '/contacts/new',
                Component: () => (<ContactForm />)
            }
        ])
        render(<Stub initialEntries={['/contacts/new']} />)

        expect(screen.getByText(/Create New contact/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/FirstName/i)).toHaveValue("");
        expect(screen.getByLabelText(/LastName/i)).toHaveValue("");
        expect(screen.getByLabelText(/Email/i)).toHaveValue("");
    });

    it("renders edit mode with prefilled values", () => {
        const Stub = createRoutesStub([
            {
                path: '/contacts/1/edit',
                Component: () => (<ContactForm
                    contact={{
                        id: 1,
                        firstname: "Alice",
                        lastname: "Smith",
                        email: "alice@example.com",
                    }}
                />)
            }
        ])
        render(<Stub initialEntries={['/contacts/1/edit']} />)



        expect(screen.getByText(/Edit Contact 1/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/FirstName/i)).toHaveValue("Alice");
        expect(screen.getByLabelText(/LastName/i)).toHaveValue("Smith");
        expect(screen.getByLabelText(/Email/i)).toHaveValue("alice@example.com");
    });

    it("disables submit button when busy", () => {
        vi.mock("react-router", async () => {
            const actual = await vi.importActual<any>("react-router");
            return {
                ...actual,
                useFetcher: () => ({ state: "submitting", Form: actual.Form }),
            };
        });

        const Stub = createRoutesStub([
            {
                path: '/contacts/new',
                Component: () => (<ContactForm />)
            }
        ])
        render(<Stub initialEntries={['/contacts/new']} />)


        const button = screen.getByRole('button')
        expect(button).toBeDisabled();
    });
});
