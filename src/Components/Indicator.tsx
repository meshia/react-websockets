interface IndicatorProps {
    isConnected: boolean
}

const Indicator: React.FC<IndicatorProps> = (isConnected: IndicatorProps) => {
    return (
        <div className="indicator">
            <span className={`dot ${isConnected ? 'green' : 'red'}`}></span>
            <span>{isConnected ? 'Connected' : 'Not Connected'}</span>
        </div>
    )
}

export default Indicator;