import { render, screen, waitFor } from "@testing-library/react";

import ContactForm from "./ContactForm";
import React from "react";
import userEvent from "@testing-library/user-event";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.queryByText(/contact form/i);
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent("Contact Form");
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  userEvent.type(screen.queryByPlaceholderText(/Edd/i), "test");
  await waitFor(() => {
    const error = screen.queryByTestId("error");
    expect(error).toBeInTheDocument();
  });
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  // const mockHandleSubmit = jest.fn();
  // // User clicks submit
  // // error message appears
  // render(<ContactForm handleSubmit={mockHandleSubmit} />);
  // // declaring button as variable
  // const button = screen.getByText(/submit/i);
  // // button is clicked
  // console.log(button);
  // userEvent.click(button);
  // // declaring error as variable
  // const error = screen.queryByTestId("error");
  // // assert that error is in the document
  // expect(error).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
