import React from "react";
import { render, screen } from "@testing-library/react";
import { LocationFilter } from "./location-filter";
import { useTrajectoriesContext } from "../../context/trajectories-context";

// Mock the useTrajectoriesContext hook
jest.mock("../../context/trajectories-context", () => ({
  useTrajectoriesContext: jest.fn(),
}));

describe("LocationFilter", () => {
  const mockDepartureList = [
    { value: "JFK", label: "JFK" },
    { value: "LAX", label: "LAX" },
  ];
  const mockArrivalList = [
    { value: "ORD", label: "ORD" },
    { value: "ATL", label: "ATL" },
  ];

  beforeEach(() => {
    (useTrajectoriesContext as jest.Mock).mockReturnValue({
      departureList: mockDepartureList,
      arrivalList: mockArrivalList,
      isLoadingAirports: false,
    });
  });

  it("Given the correct props being passed in, should render the LocationFilter component correctly", () => {
    const mockOnHandleDeparture = jest.fn();
    const mockOnHandleArrival = jest.fn();

    render(
      <LocationFilter
        departure=""
        arrival=""
        departureRef={React.createRef()}
        arrivalRef={React.createRef()}
        onHandleDeparture={mockOnHandleDeparture}
        onHandleArrival={mockOnHandleArrival}
      />
    );

    // Check if the component renders correctly
    expect(screen.getByText("Departure (ICAO)")).toBeInTheDocument();
    expect(screen.getByText("Arrival (ICAO)")).toBeInTheDocument();
    expect(screen.getByText("Select Departure...")).toBeInTheDocument();
    expect(screen.getByText("Select Arrival...")).toBeInTheDocument();
  });
});