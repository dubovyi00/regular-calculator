interface CalcButtonProps {
    /** Symbolic designation for button */
    symbol: string;
    /** Button function */
    action: () => void;
    /** Color of button */
    color?: string;
}

function CalcButton({symbol, action, color = 'bluebird'}: CalcButtonProps) {
    return (
        <div className={`calc-button w-1/6 h-10 bg-${color} border`} onClick={action}>
            {symbol}
        </div>
      )
}
    
export default CalcButton