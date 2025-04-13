import { render, screen, fireEvent } from "@testing-library/react";
import { DateFilter } from "./date-filter";
import { format } from "date-fns";

describe("DateFilter", () => {
  it("Given that DateFilter has the correct props passed in, should render it correctly", () => {
    const mockStartTime = new Date("2025-04-14T10:00:00");
    const mockEndTime = new Date("2025-04-14T12:00:00");
    const mockOnHandleStartTime = jest.fn();
    const mockOnHandleEndTime = jest.fn();

    render(
      <DateFilter
        startTime={mockStartTime}
        endTime={mockEndTime}
        onHandleStartTime={mockOnHandleStartTime}
        onHandleEndTime={mockOnHandleEndTime}
      />
    );

    // Check if the component renders correctly
    expect(screen.getByTestId("date-filter-row")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select start time...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select end time...")).toBeInTheDocument();
  });

  it("Given there's a change in start and end time, should call onHandleStartTime and onHandleEndTime once", () => {
    const mockStartTime = new Date("2025-04-14T10:00:00");
    const mockEndTime = new Date("2025-04-14T12:00:00");
    const mockOnHandleStartTime = jest.fn();
    const mockOnHandleEndTime = jest.fn();

    render(
      <DateFilter
        startTime={mockStartTime}
        endTime={mockEndTime}
        onHandleStartTime={mockOnHandleStartTime}
        onHandleEndTime={mockOnHandleEndTime}
      />
    );

    // Simulate changing the start time
    const newStartTime = new Date("2025-04-14T11:00:00");
    fireEvent.change(screen.getByPlaceholderText("Select start time..."), {
      target: { value: format(newStartTime, "yyyy-MM-dd HH:mm") },
    });
    expect(mockOnHandleStartTime).toHaveBeenCalledTimes(1);

    // Simulate changing the end time
    const newEndTime = new Date("2025-04-14T13:00:00");
    fireEvent.change(screen.getByPlaceholderText("Select end time..."), {
      target: { value: format(newEndTime, "yyyy-MM-dd HH:mm") },
    });
    expect(mockOnHandleEndTime).toHaveBeenCalledTimes(1);
  });
});