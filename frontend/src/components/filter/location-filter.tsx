import Select from "react-select";
import { useTrajectoriesContext } from "../../context/trajectories-context";
import React from "react";
import { TextLabel, Row } from "../../common";

interface LocationFilterProps {
  departure: string;
  arrival: string;
  departureRef: React.RefObject<any>;
  arrivalRef: React.RefObject<any>;
  onHandleDeparture: (value: string) => void;
  onHandleArrival: (value: string) => void;
}
export const LocationFilter = (props: LocationFilterProps) => {
  const {
    onHandleDeparture,
    onHandleArrival,
    departure,
    arrival,
    departureRef,
    arrivalRef,
  } = props;
  const { departureList, arrivalList, isLoadingAirports } =
    useTrajectoriesContext();

  return (
    <Row className={"location-filter-container"}>
      <div>
        <TextLabel
          text="Departure (ICAO)"
          sx={{ display: "block", marginBottom: "5px" }}
        />
        <Select
          ref={departureRef}
          value={departureList.find((option) => option.value === departure)}
          onChange={(selected) => {
            const val = selected?.value || "";
            onHandleDeparture(val);
          }}
          options={departureList}
          isLoading={isLoadingAirports}
          placeholder="Select Departure..."
          isSearchable
          isClearable
          styles={{ container: (base) => ({ ...base, width: "100%" }) }}
        />
      </div>
      <div>
        <TextLabel
          text="Arrival (ICAO)"
          sx={{ display: "block", marginBottom: "5px" }}
        />
        <Select
          ref={arrivalRef}
          value={arrivalList.find((option) => option.value === arrival)}
          onChange={(selected) => {
            const val = selected?.value || "";
            onHandleArrival(val);
          }}
          options={arrivalList}
          isLoading={isLoadingAirports}
          placeholder="Select Arrival..."
          isSearchable
          isClearable
          styles={{ container: (base) => ({ ...base, width: "100%" }) }}
        />
      </div>
    </Row>
  );
};
