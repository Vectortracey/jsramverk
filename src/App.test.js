import {render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App.js";
import userEvent from "@testing-library/user-event";


test("Check Documents element in nav", () => {
    render(<App />);
    const textElementDocument = screen.getByText(/Documents/i);
    expect(textElementDocument).toBeInTheDocument();
});

test("Check Add element in nav", () => {
  render(<App />);
  const textElementAdd= screen.getByText(/Add/i);
  expect(textElementAdd).toBeInTheDocument();
});


test("Click title and display its corresponding text content on the screen", async () => {
  await render(<App />);

  // get element containing text
  await screen.findByText(/test title/i);
  // click element
  var clickableTitle = screen.getByText(/test title/i);
  await userEvent.click(clickableTitle);
  // expect element containing the following text
  expect(
    screen.getByText(/test content/i)
  ).toBeInTheDocument();
});


test("click add and tries to add with only title", async () => {
  await render(<App />);

  // get element containing text
  await screen.findByText(/Add/i);

  // click element Add
  var clickAdd = screen.getByText(/Add/i);
  await userEvent.click(clickAdd);

  // get input title field
  await screen.getByPlaceholderText(/title/i);


  // inputs only a title and tries to save
  var clickTitle = screen.getByPlaceholderText(/title/i);
   await userEvent.type(clickTitle, "a test title");
    var saveButton = screen.getByText(/Save/i);
    userEvent.click(saveButton);
    expect(screen.getByText(/Could not save document because title or contents are empty!/i
      )
    ).toBeInTheDocument();
});

test("click add and tries to add with only content", async () => {
  await render(<App />);

  // get element containing text
  await screen.findByText(/Add/i);

  // click element Add
  var clickAdd = screen.getByText(/Add/i);
  await userEvent.click(clickAdd);

  // get input content field
  var clickContent = screen.getByText(/content/i);
    await userEvent.type(clickContent, "a test content");
    var saveButton = screen.getByText(/Save/i);
    userEvent.click(saveButton);
    expect(
        screen.getByText(
        /Could not save document because title or contents are empty!/i
        )
    ).toBeInTheDocument();

});

test("click add and tries to add title and content", async () => {
  await render(<App />);

  // get element containing text
  await screen.findByText(/Add/i);

  // click element Add
  var clickAdd = screen.getByText(/Add/i);
  await userEvent.click(clickAdd);

  // get input title field
  var clickTitle = screen.getByPlaceholderText(/title/i);
  await userEvent.type(clickTitle, "a test title");

  // get input content field
  var clickContent = screen.getByText(/content/i);
  await userEvent.type(clickContent, "a test content");


  var saveButton = screen.getByText(/Save/i);
  userEvent.click(saveButton);
  /*
  expect(screen.getByText(/Document saved successfully!/i)).toBeInTheDocument();
*/

});


