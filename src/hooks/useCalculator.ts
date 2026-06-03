import { evaluate } from 'mathjs'
import * as Symbols from '../constants/symbols'
import { useState, useMemo, useCallback } from 'react'
import type { CalcActions } from '../types/calc'

const nums: string[] = [
    Symbols.ONE, 
    Symbols.TWO,
    Symbols.THREE,
    Symbols.FOUR,
    Symbols.FIVE,
    Symbols.SIX,
    Symbols.SEVEN,
    Symbols.EIGHT,
    Symbols.NINE,
]
const constants: string[] = [
    Symbols.PI,
    Symbols.E,
]
const binaryOperators: string[] = [
    Symbols.PLUS,
    Symbols.MINUS,
    Symbols.MULTIPLICATION,
    Symbols.DIVISION,
    Symbols.POWER,
]
const parentheses: string[] = [
    Symbols.PARENTHESES_OPEN,
    Symbols.PARENTHESES_CLOSE,
]

export function useCalculator() {
    const [screenData, setScreenData] = useState<string>("0")
    const [message, setMessage] = useState<string>("")
    const [memoryValue, setMemoryValue] = useState<number>(0)
    const [mrcPressCount, setMrcPressCount] = useState<number>("")
    const [lastMrcTimestamp, setLastMrcTimestamp] = useState<Date>(() => Date.now()) 
    const [isMemoryUsed, setIsMemoryUsed] = useState<boolean>(false)

    function prepareExpression(data: string): string {
        let reformedScreenData: string = (
            data
            .replaceAll(Symbols.PI, "pi")
            .replaceAll(/(\d+\.?\d*|pi|e)\s*%/gi, '($1/100)')
        )
        
        reformedScreenData = reformedScreenData.replace(/√\s*(\d+\.?\d*)/g, 'sqrt($1)');
        reformedScreenData = reformedScreenData.replace(/√/g, 'sqrt(');
        const openParens: number = (reformedScreenData.match(/\(/g) || []).length;
        const closeParens: number = (reformedScreenData.match(/\)/g) || []).length;
        
        if (openParens > closeParens) {
            reformedScreenData += ')'.repeat(openParens - closeParens);
        }

        console.log(reformedScreenData)
        return reformedScreenData
    }

    function reformResult(num: number): string {
        if (!isFinite(num)) {
            return 'Error';
        }
        if (num === 0) return '0';
      
        const abs = Math.abs(num);
        if (abs >= 1e17) return 'Overflow';
        
        const fixed = abs.toFixed(10);
        const [intPart, fracPart] = fixed.split('.');
        
        if (intPart.length > 17) {
          return 'Overflow';
        }
        
        const trimmedFrac = fracPart.replace(/0+$/, '');
        
        let result: string = trimmedFrac ? `${intPart}.${trimmedFrac}` : intPart;
        
        if (num < 0) {
          result = '-' + result;
        }
        
        return result;
      }

    function isPlainNumber(value: string): boolean  {
        return /^-?\d+(\.\d+)?$/.test(value.trim());
    };

    const append = useCallback((data: string) => {
        setScreenData(screenData => {
            if (screenData.length >= 28) return screenData
            if (screenData === Symbols.ZERO) {
                if (
                    nums.includes(data) || 
                    parentheses.includes(data) || 
                    constants.includes(data) ||
                    data == Symbols.SQUARE_ROOT
                ) return data
                else if (
                    data === Symbols.PERIOD || 
                    binaryOperators.includes(data) 
                ) return screenData+data
            } 
            else {
                if (
                    data == Symbols.PERIOD
                ) {
                    const currentNumber = screenData.match(/[\d.]+$/)?.[0] ?? '';
                    
                    if (currentNumber.includes('.')) return screenData;
                    if (screenData === '' || screenData === '0' || /[+*/(^-]$/.test(screenData)) {
                        return screenData + '0.';
                    }

                    return screenData + '.';
                }

                if (
                    binaryOperators.includes(data) 
                ) {
                    if (!binaryOperators.includes(screenData.at(-1))) return screenData+data
                    else return screenData.slice(0, -1)+data
                }
                
                return screenData+data
            }
            return screenData
        })
        setMessage("")
    }, [])

    const clearLast = useCallback(() => {
        setScreenData(screenData => {
            if (screenData.length != 1) return screenData.slice(0, -1)
            else return Symbols.ZERO
        })
        setMessage("")
    }, [])

    const clearAll = useCallback(() => {
        setScreenData(Symbols.ZERO)
        setMessage("")
    }, [])
    
    const getResult = useCallback(() => {
        setMessage("")
        setScreenData((screenData) => {
            if (screenData.includes("/0")) {
                setMessage("Can't divide by 0!")
                return screenData
            }
            const reformedScreenData: string = prepareExpression(screenData)
            try {
                const result: number = evaluate(reformedScreenData)
                const reformedResult: string = reformResult(result)
                if (reformedResult === 'Overflow') {
                    setMessage("Overflow!")
                    return screenData
                }
                else if (reformedResult === 'Error') {
                    setMessage("I've got an error, please check the entered data!")
                    return screenData
                }
                else {
                    setMessage(screenData)
                    return reformedResult
                }
                
            }
            catch { 
                setMessage("I've got an error, please check the entered data!")
                return screenData
            }
        })
    }, [])

    const memoryRecallClear = useCallback(() => {
        const nowTimestamp: Date = new Date()
        const timeSinceLastPress = nowTimestamp - lastMrcTimestamp
        setMessage("")
        if (
            timeSinceLastPress < 1000 &&
            mrcPressCount === 1
        ) {
            setMemoryValue(0)
            setScreenData("0")
            setIsMemoryUsed(false)
            setMrcPressCount(0)
        } else {
            setScreenData(reformResult(memoryValue))
            setMrcPressCount(1)
        }
        setLastMrcTimestamp(new Date())
    }, [memoryValue, lastMrcTimestamp, mrcPressCount])

    const memoryAdd = useCallback(() => {
        if (!isPlainNumber(screenData)) {
            setMessage("Press the equal sign to get the result at first!")
            return
        }
        setMessage("")
        setIsMemoryUsed(true)
        setMemoryValue((memoryValue) => memoryValue + Number(screenData))
    }, [screenData])

    const memorySub = useCallback(() => {
        if (!isPlainNumber(screenData)) {
            setMessage("Press the equal sign to get the result at first!")
            return
        }
        setMessage("")
        setIsMemoryUsed(true)
        setMemoryValue((memoryValue) => memoryValue - Number(screenData))
        
    }, [screenData])

    const actions: CalcActions = useMemo(
        () => ({ append, clearLast, clearAll, getResult, memoryRecallClear, memoryAdd, memorySub }), 
        [append, clearLast, clearAll, getResult, memoryRecallClear, memoryAdd, memorySub ]
    );

    return { screenData, message, actions, isMemoryUsed };

}