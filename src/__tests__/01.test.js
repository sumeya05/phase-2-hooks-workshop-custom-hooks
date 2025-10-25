// src/__tests__/01.test.js
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useDocumentTitle } from "../exercise/01";

describe("Exercise 01 – useDocumentTitle", () => {
  test("is exported as a named export", () => {
    expect(typeof useDocumentTitle).toBe("function");
  });

  test("sets the document title", () => {
    renderHook(() => useDocumentTitle("Welcome to the home page!"));
    act(() => {
      expect(document.title).toBe("Welcome to the home page!");
    });
  });

  test("sets a custom document title", () => {
    const title = "Custom title";
    renderHook(() => useDocumentTitle(title));
    act(() => {
      expect(document.title).toBe(title);
    });
  });
});
