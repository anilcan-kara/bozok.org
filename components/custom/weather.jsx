"use client";

import cx from "classnames";
import { format, isWithinInterval, setDefaultOptions } from "date-fns";
import { tr } from "date-fns/locale";
import { useEffect, useState } from "react";

setDefaultOptions({ locale: tr, weekStartsOn: 1 });

const YozgatOrnekVeri = { "latitude": 39.75, "longitude": 34.875, "generationtime_ms": 0.02491474151611328, "utc_offset_seconds": 10800, "timezone": "Europe/Istanbul", "timezone_abbreviation": "+03", "elevation": 1304.0, "current_units": { "time": "iso8601", "interval": "seconds", "temperature_2m": "°C" }, "current": { "time": "2024-10-23T10:30", "interval": 900, "temperature_2m": 7.3 }, "hourly_units": { "time": "iso8601", "temperature_2m": "°C" }, "hourly": { "time": ["2024-10-23T00:00", "2024-10-23T01:00", "2024-10-23T02:00", "2024-10-23T03:00", "2024-10-23T04:00", "2024-10-23T05:00", "2024-10-23T06:00", "2024-10-23T07:00", "2024-10-23T08:00", "2024-10-23T09:00", "2024-10-23T10:00", "2024-10-23T11:00", "2024-10-23T12:00", "2024-10-23T13:00", "2024-10-23T14:00", "2024-10-23T15:00", "2024-10-23T16:00", "2024-10-23T17:00", "2024-10-23T18:00", "2024-10-23T19:00", "2024-10-23T20:00", "2024-10-23T21:00", "2024-10-23T22:00", "2024-10-23T23:00", "2024-10-24T00:00", "2024-10-24T01:00", "2024-10-24T02:00", "2024-10-24T03:00", "2024-10-24T04:00", "2024-10-24T05:00", "2024-10-24T06:00", "2024-10-24T07:00", "2024-10-24T08:00", "2024-10-24T09:00", "2024-10-24T10:00", "2024-10-24T11:00", "2024-10-24T12:00", "2024-10-24T13:00", "2024-10-24T14:00", "2024-10-24T15:00", "2024-10-24T16:00", "2024-10-24T17:00", "2024-10-24T18:00", "2024-10-24T19:00", "2024-10-24T20:00", "2024-10-24T21:00", "2024-10-24T22:00", "2024-10-24T23:00", "2024-10-25T00:00", "2024-10-25T01:00", "2024-10-25T02:00", "2024-10-25T03:00", "2024-10-25T04:00", "2024-10-25T05:00", "2024-10-25T06:00", "2024-10-25T07:00", "2024-10-25T08:00", "2024-10-25T09:00", "2024-10-25T10:00", "2024-10-25T11:00", "2024-10-25T12:00", "2024-10-25T13:00", "2024-10-25T14:00", "2024-10-25T15:00", "2024-10-25T16:00", "2024-10-25T17:00", "2024-10-25T18:00", "2024-10-25T19:00", "2024-10-25T20:00", "2024-10-25T21:00", "2024-10-25T22:00", "2024-10-25T23:00", "2024-10-26T00:00", "2024-10-26T01:00", "2024-10-26T02:00", "2024-10-26T03:00", "2024-10-26T04:00", "2024-10-26T05:00", "2024-10-26T06:00", "2024-10-26T07:00", "2024-10-26T08:00", "2024-10-26T09:00", "2024-10-26T10:00", "2024-10-26T11:00", "2024-10-26T12:00", "2024-10-26T13:00", "2024-10-26T14:00", "2024-10-26T15:00", "2024-10-26T16:00", "2024-10-26T17:00", "2024-10-26T18:00", "2024-10-26T19:00", "2024-10-26T20:00", "2024-10-26T21:00", "2024-10-26T22:00", "2024-10-26T23:00", "2024-10-27T00:00", "2024-10-27T01:00", "2024-10-27T02:00", "2024-10-27T03:00", "2024-10-27T04:00", "2024-10-27T05:00", "2024-10-27T06:00", "2024-10-27T07:00", "2024-10-27T08:00", "2024-10-27T09:00", "2024-10-27T10:00", "2024-10-27T11:00", "2024-10-27T12:00", "2024-10-27T13:00", "2024-10-27T14:00", "2024-10-27T15:00", "2024-10-27T16:00", "2024-10-27T17:00", "2024-10-27T18:00", "2024-10-27T19:00", "2024-10-27T20:00", "2024-10-27T21:00", "2024-10-27T22:00", "2024-10-27T23:00", "2024-10-28T00:00", "2024-10-28T01:00", "2024-10-28T02:00", "2024-10-28T03:00", "2024-10-28T04:00", "2024-10-28T05:00", "2024-10-28T06:00", "2024-10-28T07:00", "2024-10-28T08:00", "2024-10-28T09:00", "2024-10-28T10:00", "2024-10-28T11:00", "2024-10-28T12:00", "2024-10-28T13:00", "2024-10-28T14:00", "2024-10-28T15:00", "2024-10-28T16:00", "2024-10-28T17:00", "2024-10-28T18:00", "2024-10-28T19:00", "2024-10-28T20:00", "2024-10-28T21:00", "2024-10-28T22:00", "2024-10-28T23:00", "2024-10-29T00:00", "2024-10-29T01:00", "2024-10-29T02:00", "2024-10-29T03:00", "2024-10-29T04:00", "2024-10-29T05:00", "2024-10-29T06:00", "2024-10-29T07:00", "2024-10-29T08:00", "2024-10-29T09:00", "2024-10-29T10:00", "2024-10-29T11:00", "2024-10-29T12:00", "2024-10-29T13:00", "2024-10-29T14:00", "2024-10-29T15:00", "2024-10-29T16:00", "2024-10-29T17:00", "2024-10-29T18:00", "2024-10-29T19:00", "2024-10-29T20:00", "2024-10-29T21:00", "2024-10-29T22:00", "2024-10-29T23:00"], "temperature_2m": [3.5, 3.4, 3.5, 4.4, 4.1, 4.0, 3.3, 3.5, 4.0, 5.4, 6.7, 7.8, 8.9, 9.8, 10.5, 10.9, 10.8, 10.0, 8.5, 7.3, 6.6, 5.8, 5.3, 4.8, 4.4, 4.0, 3.8, 3.6, 3.4, 3.2, 2.9, 2.6, 3.0, 5.6, 7.7, 9.5, 10.8, 12.0, 12.5, 12.5, 11.9, 10.7, 8.8, 7.4, 6.7, 6.2, 5.8, 5.3, 4.8, 4.3, 4.0, 3.9, 4.0, 3.6, 3.4, 3.4, 3.9, 6.2, 7.8, 9.4, 10.1, 11.1, 11.8, 11.9, 11.6, 10.9, 9.5, 8.1, 7.2, 6.3, 5.7, 5.0, 4.5, 4.2, 3.7, 3.4, 3.3, 3.2, 3.0, 2.8, 3.4, 5.8, 7.7, 10.0, 11.8, 12.8, 13.1, 13.0, 12.1, 10.6, 9.2, 8.1, 7.1, 6.2, 5.6, 5.1, 4.7, 4.3, 3.9, 3.6, 3.2, 2.9, 2.8, 3.0, 3.4, 4.2, 5.3, 6.7, 8.0, 9.0, 9.9, 10.2, 9.7, 8.6, 7.4, 6.3, 5.0, 3.9, 3.0, 2.3, 1.6, 1.0, 0.5, 0.2, 1.7, 1.4, 1.3, 1.4, 1.6, 2.4, 4.4, 7.1, 9.1, 10.2, 10.8, 10.8, 10.0, 8.6, 7.3, 6.2, 5.2, 4.4, 3.8, 3.4, 3.0, 2.7, 2.4, 2.1, 1.7, 1.3, 1.1, 1.0, 1.2, 2.0, 3.8, 6.1, 7.9, 8.9, 9.4, 9.3, 8.6, 7.4, 6.2, 5.3, 4.3, 3.6, 3.1, 2.7] }, "daily_units": { "time": "iso8601", "sunrise": "iso8601", "sunset": "iso8601" }, "daily": { "time": ["2024-10-23", "2024-10-24", "2024-10-25", "2024-10-26", "2024-10-27", "2024-10-28", "2024-10-29"], "sunrise": ["2024-10-23T06:59", "2024-10-24T07:00", "2024-10-25T07:01", "2024-10-26T07:03", "2024-10-27T07:04", "2024-10-28T07:05", "2024-10-29T07:06"], "sunset": ["2024-10-23T17:49", "2024-10-24T17:48", "2024-10-25T17:47", "2024-10-26T17:45", "2024-10-27T17:44", "2024-10-28T17:43", "2024-10-29T17:42"] } };

function n(num) {
    return Math.ceil(num);
}

export function Weather({
    weatherAtLocation = YozgatOrnekVeri,
}) {
    const currentHigh = Math.max(
        ...weatherAtLocation.hourly.temperature_2m.slice(0, 24),
    );
    const currentLow = Math.min(
        ...weatherAtLocation.hourly.temperature_2m.slice(0, 24),
    );

    const isDay = isWithinInterval(new Date(weatherAtLocation.current.time), {
        start: new Date(weatherAtLocation.daily.sunrise[0]),
        end: new Date(weatherAtLocation.daily.sunset[0]),
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const hoursToShow = isMobile ? 5 : 6;

    const currentTimeIndex = weatherAtLocation.hourly.time.findIndex(
        (time) => new Date(time) >= new Date(weatherAtLocation.current.time),
    );

    const displayTimes = weatherAtLocation.hourly.time.slice(
        currentTimeIndex,
        currentTimeIndex + hoursToShow,
    );

    const displayTemperatures = weatherAtLocation.hourly.temperature_2m.slice(
        currentTimeIndex,
        currentTimeIndex + hoursToShow,
    );

    return (
        <div
            className={cx(
                "flex flex-col gap-4 rounded-2xl p-4 skeleton-bg",
                {
                    "bg-blue-400": isDay,
                },
                {
                    "bg-indigo-900": !isDay,
                },
            )}
        >
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                    <div
                        className={cx(
                            "size-10 rounded-full skeleton-div",
                            {
                                "bg-yellow-300": isDay,
                            },
                            {
                                "bg-indigo-100": !isDay,
                            },
                        )}
                    />
                    <div className="text-4xl font-medium text-blue-50">
                        {n(weatherAtLocation.current.temperature_2m)}
                        {weatherAtLocation.current_units.temperature_2m}
                    </div>
                </div>

                <div className="text-blue-50">{`En Yüksek: ${n(currentHigh)}°, En Düşük: ${n(currentLow)}°`}</div>
            </div>

            <div className="flex flex-row justify-between">
                {displayTimes.map((time, index) => (
                    <div key={time} className="flex flex-col items-center gap-1">
                        <div className="text-blue-100 text-xs">
                            {format(new Date(time), "HH:mm")}
                        </div>
                        <div
                            className={cx(
                                "size-6 rounded-full skeleton-div",
                                {
                                    "bg-yellow-300": isDay,
                                },
                                {
                                    "bg-indigo-200": !isDay,
                                },
                            )}
                        />
                        <div className="text-blue-50 text-sm">
                            {n(displayTemperatures[index])}
                            {weatherAtLocation.hourly_units.temperature_2m}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
