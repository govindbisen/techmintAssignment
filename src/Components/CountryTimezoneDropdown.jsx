import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CountryTimezoneDropdown.css';

function CountryTimezoneDropdown(props) {
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('');

  useEffect(() => {
    // Fetch the list of timezones from the API
    fetch('http://worldtimeapi.org/api/timezone')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Set the timezones in state
        setTimezones(data);
      })
      .catch((error) => {
        console.error('Error fetching timezones:', error);
      });
  }, []);

  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
  };
  // useEffect(() => {}, [timezone]);
  props.setTimeZoneInProfile(selectedTimezone);

  return (
    <div>
      <select
        className='select'
        value={selectedTimezone}
        onChange={handleTimezoneChange}
      >
        <option value='Africa/Abidjan'>Select a timezone</option>
        {timezones.map((timezone, index) => (
          <option key={index} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
    </div>
  );
}

CountryTimezoneDropdown.propTypes = {
  setTimeZoneInProfile: PropTypes.func.isRequired, // Validate the function prop
};
export default CountryTimezoneDropdown;
