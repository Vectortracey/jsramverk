import { getElementError } from "@testing-library/dom";
import React from "react";
import { render, unmountComponentAtNode, screen } from "react-dom";
import { act } from "react-dom/test-utils";

import Toolbar from './Toolbar.js';

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

it("Test if the the first text in the toolbar is 'Namn på dokument:'", () => {
  act(() => {
    render(<Toolbar />, container);
  });
  let expected = "Namn på dokument:";
  expect(container.textContent.slice(0,expected.length)).toBe(expected);
});

it("Test if 'Ny' is somewhere in the returned string", () => {
  act(() => {
    render(<Toolbar />, container);
  });
  let expected = "Ny";
  expect(container.textContent.includes(expected)).toBe(true);
});

