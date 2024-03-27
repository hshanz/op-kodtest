import { expect, test, beforeAll, afterAll, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import Page from "../app/movie/[id]/page";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

vi.mock("next/font/google", async () => {
  const actual = await vi.importActual("next/font/google");
  return {
    ...actual,
    Inter: vi.fn(() => ({
      className: "inter",
    })),
  };
});

const handlers = [
  http.get("http://www.omdbapi.com/", (params) => {
    const isSearch = new URLSearchParams(params.request.url).has("s");
    if (isSearch) {
      return HttpResponse.json({
        Search: [
          {
            Title: "Movie 1",
            Year: "2021",
            imdbID: "mov1",
            Type: "movie",
            Poster: "N/A",
          },
          {
            Title: "Movie 2",
            Year: "2020",
            imdbID: "mov2",
            Type: "movie",
            Poster: "N/A",
          },
        ],
      });
    }
    return HttpResponse.json({
      Title: "Movie 1",
      Year: "2021",
      imdbID: "mov1",
      Type: "movie",
      Poster: "N/A",
      Genre: "Action",
      imdbRating: "8.5",
      Plot: "A car movie",
      Director: "John Doe",
      Runtime: "2h 30m",
      Actors: "John Doe, Jane Doe",
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Home", async () => {
  const home = await Home({ searchParams: { query: "movie", year: "2021" } });
  render(home);

  expect(
    screen.getByRole("heading", { level: 3, name: "Movie 1" })
  ).toBeDefined();
  expect(
    screen.getByRole("heading", { level: 3, name: "Movie 2" })
  ).toBeDefined();
});

test("Detail page", async () => {
  const page = await Page({ params: { id: "mov1" } });
  render(page);

  expect(
    screen.getByRole("heading", { level: 1, name: "Movie 1" })
  ).toBeDefined();
  expect(
    screen.getByRole("heading", { level: 3, name: "Genre: Action" })
  ).toBeDefined();
  expect(
    screen.getByRole("heading", { level: 3, name: "Director: John Doe" })
  ).toBeDefined();
  expect(
    screen.getByRole("heading", {
      level: 3,
      name: "Actors: John Doe, Jane Doe",
    })
  ).toBeDefined();
  expect(screen.getByRole("heading", { level: 3, name: "Plot" })).toBeDefined();
  expect(screen.getByText("A car movie")).toBeDefined();
});
