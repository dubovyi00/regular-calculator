export interface CalcActions {
    /** Append symbol to current screen data */
    append: (data: string) => void;

    /** Remove last symbol from current screen data */
    clearLast: () => void;

    /** Reset current screen data */
    clearAll: () => void;

    /** Evaluate result from screen data */
    getResult: () => void;

    /** Recall or clear memory */
    memoryRecallClear: () => void;

    /** Add a number to memory */
    memoryAdd: () => void; 

    /** Subtract a number to memory */
    memorySub: () => void;
}