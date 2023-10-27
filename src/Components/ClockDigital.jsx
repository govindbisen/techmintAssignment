import { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ClockDigital.css';

function ClockDigital({ timezone }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockRunning, setIsClockRunning] = useState(true);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(
          `http://worldtimeapi.org/api/timezone/${timezone}`
        );
        const data = await response.json();
        const time = new Date(data.utc_datetime);
        setCurrentTime(time);
      } catch (error) {
        console.error('Error fetching current time', error);
      }
    };

    fetchTime();

    const interval = setInterval(() => {
      if (isClockRunning) {
        setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone, isClockRunning]);

  const toggleClock = () => {
    setIsClockRunning((prevIsClockRunning) => !prevIsClockRunning);
  };

  const timeToPrint = timezone
    ? currentTime.toLocaleTimeString('en-GB', { timeZone: `${timezone}` })
    : currentTime.toLocaleTimeString('en-GB');

  return (
    <div>
      <div className='digital-clock'>
        <p className='the_clock'>
          {timeToPrint == 'Invalid Date' ? '00:00:00' : timeToPrint}
        </p>
        <button onClick={toggleClock} className='button_start_stop'>
          {isClockRunning ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
}
ClockDigital.propTypes = {
  timezone: PropTypes.string.isRequired, // Add PropTypes validation for 'timezone'
};
Component.defaultProps = {
  timezone: 'Africa/Abidjan',
};

export default ClockDigital;
