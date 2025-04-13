import DatePicker from 'react-datepicker';
import { TextLabel, Row } from '../../common';
import './filter-bar.css';

interface DateFilterProps {
  startTime: Date | null;
  endTime: Date | null;
  onHandleStartTime: (date: Date | null) => void;
  onHandleEndTime: (date: Date | null) => void;
}

export const DateFilter = (props: DateFilterProps) => {
  const { startTime, endTime, onHandleStartTime, onHandleEndTime } = props;

  return (
    <Row className="date-filter">
      <div>
        <TextLabel
          text="Start Time"
          sx={{
            display: 'block',
            marginBottom: '5px',
          }}
        />
        <DatePicker
          selected={startTime}
          onChange={onHandleStartTime}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="Select start time..."
        />
      </div>

      <div>
        <TextLabel
          text="End Time"
          sx={{
            display: 'block',
            marginBottom: '5px',
          }}
        />
        <DatePicker
          selected={endTime}
          onChange={onHandleEndTime}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="Select end time..."
        />
      </div>
    </Row>
  );
};
