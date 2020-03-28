/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

import './styles.css';

export default function DevForm({ onSubmit }) {
    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });
        setGithub_username('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do GiHub</label>
                <input
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={(e) => setGithub_username(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={(e) => setTechs(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}
