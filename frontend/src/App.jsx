import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import '/styles/app.css';

function App() {
    const [coords, setCoords] = useState({ lat: '', lng: '' });
    const [notes, setNotes] = useState('');
    const [converted, setConverted] = useState('');

    const handleConvert = () => {
        // Conversion logic from DD to DMS
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
        axios.post('http://localhost:8000/coords', { notes, ...coords })
            .then(res => console.log('Saved successfully:', res.data))
            .catch(err => console.error('Error saving data:', err));
    };

    return (
        <div>
            <input type="text" placeholder="Latitude" value={coords.lat} onChange={e => setCoords({ ...coords, lat: e.target.value })} />
            <input type="text" placeholder="Longitude" value={coords.lng} onChange={e => setCoords({ ...coords, lng: e.target.value })} />
            <input type="text" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
            <button onClick={handleConvert}>Convert Coords</button>
            <button onClick={handleSave}>Save Coords</button>
            <div>{converted}</div>
            {/* Google Maps integration here */}
        </div>
    );
}

export default App;
