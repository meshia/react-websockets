import { useEffect, useState } from 'react';

interface IndicatorProps {
    isConnected: boolean
}

const Indicator: React.FC<IndicatorProps> = (props: IndicatorProps) => {

    return (
        <div className="indicator">
            <span className={`dot ${props.isConnected ? 'green' : 'red'}`}></span>
            <span>{props.isConnected  ? 'Connected' : 'Not Connected'}</span>
        </div>
    )
}

export default Indicator;