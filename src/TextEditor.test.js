import React from "react";
import { render, unmountComponentAtNode, screen,  } from "react-dom";
import { act } from "react-dom/test-utils";

import Texteditor from './TextEditor.js';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Test if the last text rendered is 'Välj ett dokument att redigera:'", () => {
  act(() => {
    render(<Texteditor />, container);
  });
  let expected = "Välj ett dokument att redigera:";
  expect(container.textContent.slice(-expected.length)).toBe(expected);

});