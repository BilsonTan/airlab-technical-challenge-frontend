import { useRef } from 'react';
import { useTrajectoriesFilters } from '../../hooks/useTrajectoriesFilters';
import { DateFilter } from './date-filter';
import { LocationFilter } from './location-filter';
import { Row } from '../../common/row';
import './filter-bar.css';

export const FilterBar = () => {
  const {
    departure,
    arrival,
    startTime,
    endTime,
    handleSetArrival,
    handleSetDeparture,
    handleSetStartTime,
    handleSetEndTime,
    fetchFilteredTrajectories,
    handleResetFilters,
  } = useTrajectoriesFilters();

  const onHandleApply = async () => {
    await fetchFilteredTrajectories({
      departure: departure,
      arrival: arrival,
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    });
  };

  const departureRef = useRef<any>(null);
  const arrivalRef = useRef<any>(null);

  const resetSelections = () => {
    departureRef.current?.clearValue();
    arrivalRef.current?.clearValue();
  };

  const onHandleReset = () => {
    resetSelections();
    handleResetFilters();
  };

  return (
    <>
      <div className={'filter-bar'}>
        <Row
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DateFilter
            startTime={startTime}
            endTime={endTime}
            onHandleStartTime={handleSetStartTime}
            onHandleEndTime={handleSetEndTime}
          />
          <LocationFilter
            departure={departure}
            arrival={arrival}
            departureRef={departureRef}
            arrivalRef={arrivalRef}
            onHandleDeparture={handleSetDeparture}
            onHandleArrival={handleSetArrival}
          />
        </Row>
      </div>
      <div className="filter-bar-actions">
        <button onClick={onHandleApply}>Apply Filters</button>
        <button onClick={onHandleReset}>Reset Filters</button>
      </div>
    </>
  );
};
