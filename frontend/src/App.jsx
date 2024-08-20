import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import MapComponent from './components/MapComponent';
import '/styles/app.css';

function App() {
    const [coords, setCoords] = useState({ lat: '', lng: '' });
    const [notes, setNotes] = useState('');
    const [converted, setConverted] = useState('');
    const [showMap, setShowMap] = useState(false);

    const handleConvert = () => {
        const convertDMS = (coord) => {
            const absolute = Math.abs(coord);
            const degrees = Math.floor(absolute);
            const minutesNotTruncated = (absolute - degrees) * 60;
            const minutes = Math.floor(minutesNotTruncated);
            const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
            return `${degrees}°${minutes}'${seconds}"`;
        };

        setConverted(`Lat: ${convertDMS(coords.lat)}, Lng: ${convertDMS(coords.lng)}`);
    };

    const handleSave = () => {
        if (!validateCoordinates(coords.lat, coords.lng)) {
            alert('Invalid latitude or longitude values. Please enter values within the correct range.');
            return;
        }

        axios.post('http://localhost:8000/coords', { notes, ...coords })
            .then(res => {
                console.log('Saved successfully:', res.data);
                alert('Coordinates saved successfully!');
            })
            .catch(err => {
                console.error('Error saving data:', err);
                alert('Failed to save coordinates. Check console for more details.');
            });
    };

    const validateCoordinates = (lat, lng) => {
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);
        return latNum >= -90 && latNum <= 90 && lngNum >= -180 && lngNum <= 180;
    };

    return (
        <div>
            <Header />
            <input type="text" placeholder="Latitude" value={coords.lat} onChange={e => setCoords({ ...coords, lat: e.target.value })} />
            <input type="text" placeholder="Longitude" value={coords.lng} onChange={e => setCoords({ ...coords, lng: e.target.value })} />
            <input type="text" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
            <button onClick={handleConvert}>Convert Coords</button>
            <button onClick={handleSave}>Save Coords</button>
            <button onClick={() => setShowMap(true)}>Show on Map</button>
            <div>{converted}</div>
            {showMap && <MapComponent coords={coords} />}
            <Footer />
        </div>
    );
}

export default App;
