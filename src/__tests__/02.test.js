// src/__tests__/02.fixed.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { usePokemon } from "../exercise/02"; // adjust path if needed

const mockPokemonData = {
  name: "charmander",
  id: 4,
  abilities: [{ ability: { name: "blaze" } }],
};

describe("usePokemon hook", () => {
  beforeEach(() => {
    global.fetch = jest.fn(url =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPokemonData),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("returns initial state of null", () => {
    const { result } = renderHook(() => usePokemon("charmander"));
    expect(result.current).toMatchObject({
      data: null,
      status: "pending",
      errors: null,
    });
  });

  test("returns a pokemon based on the search result after fetching data", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePokemon("charmander")
    );

    // Wait for state to update after fetch
    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      data: mockPokemonData,
      status: "success",
      errors: null,
    });
  });

  test("returns an error state if API responds with an error", async () => {
    // Mock fetch to fail
    global.fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    const { result, waitForNextUpdate } = renderHook(() =>
      usePokemon("missingno")
    );

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.status).toBe("error");
    expect(result.current.errors).toBeInstanceOf(Error);
  });
});
