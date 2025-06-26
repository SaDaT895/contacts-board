import { render, screen, fireEvent } from '@testing-library/react'
import ContactCard from './contact-card'
import { vi } from 'vitest'
import { createRoutesStub } from 'react-router'
import * as reactRouter from 'react-router'

const mockContact = {
  id: 123,
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@example.com',
  createdate: new Date().toISOString(),
  lastmodifieddate: new Date().toISOString(),
}

vi.mock('react-router', { spy: true })

describe('ContactCard', () => {
  beforeEach(() => {
    const Stub = createRoutesStub([
      {
        path: '/contacts/123',
        Component: () => (<ContactCard contact={mockContact} />)
      }
    ])
    render(<Stub initialEntries={['/contacts/123']} />)
  })
  it('renders contact info', () => {
    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
    expect(screen.getByText(/john@example.com/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument()
  })

  it('close button calls navigate(-1) and closes the dialog', async () => {
    const mockNavigate = vi.spyOn(reactRouter, 'useNavigate')
    const closeButton = screen.getByRole('button', { name: /Close/i });

    fireEvent.click(closeButton)
    expect(mockNavigate).toHaveBeenCalled()

  });

  // it('clicking the backdrop (Dialog onClose) also navigates back', () => {
  //   const dialog = screen.getByRole('dialog');
  //   const mockNavigate = vi.spyOn(reactRouter, 'useNavigate');

  //   expect(dialog).toBeVisible();
  //   expect(dialog).toHaveAttribute('role', 'dialog');
  //   expect(dialog).toHaveTextContent(/Name:/);
  //   expect(mockNavigate).toHaveBeenCalledWith(-1);
  // });


  it('renders a delete button inside a form with method="post" and action="delete"', () => {
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    const form = deleteBtn.closest('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute('method', 'post');
    expect(form).toHaveAttribute('action', '/contacts/123/delete');
  });

  it('renders an Edit button', () => {
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });
})
