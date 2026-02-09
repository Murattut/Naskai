import { fireEvent, render, screen } from "@testing-library/react";
import { FAQ } from "./FAQ";

describe("FAQ", () => {
  it("expands answer when question is clicked", () => {
    render(<FAQ />);

    const question = screen.getByRole("button", { name: /is naskai really free/i });
    fireEvent.click(question);

    expect(screen.getByText(/open-access educational project/i)).toBeInTheDocument();
  });
});
