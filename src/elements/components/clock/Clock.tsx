import React, {useEffect} from 'react';
import {DateTime} from "luxon";
import classNames from "classnames";

import './style.css';

export interface ClockProps extends React.HTMLProps<HTMLDivElement> {
    className?: string;
    onClick?: (event) => void;
    children?: any;
    disabled?: boolean;
}

const Clock: React.FC<ClockProps> = (
    {
        className,
        onClick = () => {
        },
        children,
        ...other
    }) => {
    const zone = 'Europe/Moscow';
    const getCurrentTime = () => DateTime.local().setZone(zone);
    const now = getCurrentTime();
    let [time, setTime] = React.useState(now);
    const updateTime = () => {
        setTime(getCurrentTime())
    }
    useEffect(() => {
        const interval = setInterval(() => {
            updateTime();
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div
            className={classNames('clock', className)}
            onClick={onClick}
            {...other}
        >
            <p className={'clock-time'}>{time.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}</p>
            <p className={'clock-date'}>{time.toLocaleString(DateTime.DATE_FULL)}</p>
            {children}
        </div>
    );
};

export default Clock;
