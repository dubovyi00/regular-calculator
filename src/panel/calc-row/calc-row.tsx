
interface CalcRowProps {
    /** Children nodes to visualise in row */
    children: React.ReactNode;
}

function CalcRow({children}: CalcRowProps) {
    return (
        <div className="flex flex-row justify-around">
            {children}
        </div>
      )
}
    
export default CalcRow