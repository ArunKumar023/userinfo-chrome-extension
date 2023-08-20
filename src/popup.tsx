import React, { useState } from 'react';
import axios from 'axios';
import './Popup.css'; // Add your custom styles here

const Popup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [locationInfo, setLocationInfo] = useState('');

  const fetchLocation = async () => {
    setIsLoading(true);

    try {
      const ipAddressResponse = await axios.get('https://api.ipify.org?format=json');
      const userIP = ipAddressResponse.data.ip;

      const ipinfoToken = '6ee0ffb1188679';
      const locationResponse = await axios.get(`https://ipinfo.io/${userIP}?token=${ipinfoToken}`);

      const { country, city } = locationResponse.data;

      setLocationInfo(`Your country is ${country} and city is ${city}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLocationInfo('Error fetching location data');
    }

    setIsLoading(false);
  };

  return (
    <div className="popup">
      <button
        className={`button ${isLoading ? 'loading' : ''}`}
        onClick={fetchLocation}
      >
        {isLoading ? 'Loading...' : 'Show my location'}
      </button>
      {locationInfo && (
        <p className="location-info">{locationInfo}</p>
      )}
    </div>
  );
};

export default Popup;
