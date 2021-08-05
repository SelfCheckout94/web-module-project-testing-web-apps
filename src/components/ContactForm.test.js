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
  userEvent.type(screen.getByLabelText(/first name/i), "test");
  await waitFor(() => {
    expect(
      screen.queryByText("Error: firstName must have at least 5 characters.")
    ).toBeInTheDocument();
  });
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  userEvent.click(screen.queryByTestId("submit"));
  await waitFor(() => {
    const errorArr = screen.queryAllByTestId("error");
    let error;
    errorArr.map((err) => {
      return (error = err);
    });
    expect(error).toBeInTheDocument();
  });
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  userEvent.type(screen.getByPlaceholderText(/Edd/i), "test1");
  userEvent.type(screen.getByPlaceholderText(/burke/i), "test2");
  userEvent.click(screen.getByTestId("submit"));
  await waitFor(() => {
    const error = screen.queryByTestId("error");
    expect(error).toBeInTheDocument();
  });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  userEvent.type(screen.getByLabelText(/email/i), "test");
  await waitFor(() => {
    expect(
      screen.queryByText("Error: email must be a valid email address.")
    ).toBeInTheDocument();
  });
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  userEvent.type(screen.getByLabelText(/first name/i), "test1");
  userEvent.type(screen.getByLabelText(/email/i), "test@test.com");
  userEvent.click(screen.getByTestId("submit"));
  await waitFor(() => {
    expect(
      screen.queryByText("Error: lastName is a required field.")
    ).toBeInTheDocument();
  });
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  userEvent.type(screen.getByLabelText(/first name/i), "test1");
  userEvent.type(screen.getByLabelText(/last name/i), "test2");
  userEvent.type(screen.getByLabelText(/email/i), "test@test.com");
  userEvent.click(screen.queryByTestId("submit"));
  await waitFor(() => {
    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
    expect(screen.queryByText("Message:")).not.toBeInTheDocument();
  });
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  userEvent.type(screen.getByLabelText(/first name/i), "test1");
  userEvent.type(screen.getByLabelText(/last name/i), "test2");
  userEvent.type(screen.getByLabelText(/email/i), "test@test.com");
  userEvent.type(screen.getByLabelText(/message/i), "this is a test message");
  userEvent.click(screen.queryByTestId("submit"));
  await waitFor(() => {
    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
    expect(screen.getByText("this is a test message")).toBeInTheDocument();
  });
});
