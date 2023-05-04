import { useState } from 'react';
import axios from 'axios';
import { GeoLocation } from '../../utils/interfaces';

const Account = () => {
  const [addressValue, setAddressValue] = useState('');
  const [locationData, setLocationData] = useState({});
  // TODO: HANDLE AXIOS ERRORS
  const submitAddress = async () => {
    const url = `http://localhost:8000/geocode/address/${addressValue}`;
    const response = await axios.get(url);
    const { data } = response.data.data;

    const locationData: GeoLocation = {
      coordinates: [data.lng, data.lat],
      type: 'Point',
      city: data.city,
    };
    setLocationData(locationData);
  };

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const url = `http://localhost:8000/geocode/coords/lat/${lat}/lng/${lng}`;
        const response = await axios.get(url);

        const city = response.data.data.data;
        const locationData: GeoLocation = {
          coordinates: [lng, lat],
          type: 'Point',
          city,
        };
        setLocationData(locationData);
      });
    } else {
      // Error message that browser doesn't support
    }
  };
  return (
    <div>
      <label htmlFor="location">Enter your address...</label>
      <input
        onChange={e => setAddressValue(e.target.value)}
        name="location"
        type="text"
      />
      or...
      <button type="button" onClick={getGeoLocation}>
        Get your location
      </button>
      <button type="button" onClick={submitAddress}>
        Submit Your Address
      </button>
    </div>
  );
};

export default Account;
