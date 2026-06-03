interface CalcScreenProps {
    /** Current data to show on the screen */
    screenData: string;

    /** Flag if memory is used now */
    isMemoryUsed: boolean;

    /** Expression, which used to set answer on screen after calculating  */
    message: string;
}

function CalcScreen({screenData, isMemoryUsed, message = ""}: CalcScreenProps) {
    return (
        <div className="calc-screen w-5/6 h-16 bg-clouds border relative ">
            <div className="absolute top-1 left-1 text-sm">{message}</div>
            <div className={`absolute top-1 right-1 text-l ${isMemoryUsed ? '' : 'invisible'}`}>
                M
            </div>
            <div className="absolute bottom-1 left-1 text-2xl">
                {screenData}
            </div>
            
        </div>
      );
}
    
export default CalcScreen