import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Relayboard", () => {
  beforeEach(() => window.localStorage.clear());

  it("filters handoffs and recovers through the empty state", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("searchbox", { name: "Search handoffs" }), "not-a-real-handoff");
    expect(screen.getByRole("heading", { name: "No handoffs match" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByText("Review the delayed refund queue")).toBeInTheDocument();
  });

  it("acknowledges selected handoffs and reports the result", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("checkbox", { name: "Select Review the delayed refund queue" }));
    await user.click(screen.getByRole("checkbox", { name: "Select Confirm Riverside manifest changes" }));
    await user.click(screen.getByRole("button", { name: "Acknowledge selected" }));

    expect(screen.getByRole("status")).toHaveTextContent("2 handoffs acknowledged");
    const refundCard = screen.getByText("Review the delayed refund queue").closest("article");
    expect(within(refundCard!).getByText("Acknowledged")).toBeInTheDocument();
  });

  it("opens detail and updates readiness without losing context", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Review the delayed refund queue/ }));
    expect(screen.getByRole("heading", { name: "Readiness checklist" })).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: "Exceptions matched to orders" }));
    expect(screen.getByRole("checkbox", { name: "Exceptions matched to orders" })).toBeChecked();
  });
});
