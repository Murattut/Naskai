import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders main heading and CTA links", () => {
    render(<Hero />);

    expect(screen.getByText(/master your workflow/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get started for free/i })).toHaveAttribute("href", "/signup");
    expect(screen.getByRole("link", { name: /learn more/i })).toHaveAttribute("href", "#features");
  });
});
