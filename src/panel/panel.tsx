import CalcScreen from './calc-screen/calc-screen'
import CalcButton from './calc-button/calc-button'
import CalcRow from './calc-row/calc-row'
import * as Symbols from '../constants/symbols'
import type { CalcActions } from '../types/calc'

interface CalcPanelProps {
  /** Current data to visualise on screen */
  screenData: string;

  /** Methods set to  */
  actions: CalcActions;
}

function CalcPanel({screenData, actions, message, isMemoryUsed}: CalcPanelProps) {
    return (
        <div className="calc-panel w-112 h-128 bg-bluebird flex flex-col flex-auto justify-around">
          <CalcRow>
            <CalcScreen screenData={screenData} isMemoryUsed={isMemoryUsed} message={message}/>
          </CalcRow>
          <CalcRow>
            <CalcButton symbol={Symbols.MEMORY_RECALL} action={() => actions.memoryRecallClear()} color={'clouds'} />
            <CalcButton symbol={Symbols.MEMORY_PLUS} action={() => actions.memoryAdd()} color={'clouds'} />
            <CalcButton symbol={Symbols.MEMORY_MINUS} action={() => actions.memorySub()} color={'clouds'} />
            <CalcButton symbol={Symbols.CLEAR_ALL} action={() => actions.clearAll()} color={'clouds'} />
            <CalcButton symbol={Symbols.CLEAR_LAST} action={() => actions.clearLast()} color={'clouds'} />
          </CalcRow>
          <CalcRow>
            <CalcButton symbol={Symbols.SQUARE_ROOT} action={() => actions.append(Symbols.SQUARE_ROOT)} color={'clouds'} />
            <CalcButton symbol={Symbols.PARENTHESES_OPEN} action={() => actions.append(Symbols.PARENTHESES_OPEN)} color={'clouds'} />
            <CalcButton symbol={Symbols.PARENTHESES_CLOSE} action={() => actions.append(Symbols.PARENTHESES_CLOSE)} color={'clouds'} />
            <CalcButton symbol={Symbols.PI} action={() => actions.append(Symbols.PI)} color={'clouds'} />
            <CalcButton symbol={Symbols.E}  action={() => actions.append(Symbols.E)} color={'clouds'} />
          </CalcRow>
          <CalcRow>
            
            <CalcButton symbol={Symbols.POWER} action={() => actions.append(Symbols.POWER)} color={'clouds'} />
            <CalcButton symbol={Symbols.ONE} action={() => actions.append(Symbols.ONE)} color={'clouds'} />
            <CalcButton symbol={Symbols.TWO} action={() => actions.append(Symbols.TWO)} color={'clouds'} />
            <CalcButton symbol={Symbols.THREE} action={() => actions.append(Symbols.THREE)} color={'clouds'} />
            <CalcButton symbol={Symbols.PLUS} action={() => actions.append(Symbols.PLUS)} color={'clouds'} />
          </CalcRow>
          <CalcRow>
            <CalcButton symbol={Symbols.PERCENTS} action={() => actions.append(Symbols.PERCENTS)} color={'clouds'}  />
            <CalcButton symbol={Symbols.FOUR} action={() => actions.append(Symbols.FOUR)} color={'clouds'} />
            <CalcButton symbol={Symbols.FIVE} action={() => actions.append(Symbols.FIVE)} color={'clouds'} />
            <CalcButton symbol={Symbols.SIX} action={() => actions.append(Symbols.SIX)} color={'clouds'} />
            <CalcButton symbol={Symbols.MINUS} action={() => actions.append(Symbols.MINUS)} color={'clouds'} />
          </CalcRow>
          <CalcRow>
            <CalcButton symbol={Symbols.FACTORIAL} action={() => actions.append(Symbols.FACTORIAL)} color={'clouds'} />
            <CalcButton symbol={Symbols.SEVEN} action={() => actions.append(Symbols.SEVEN)} color={'clouds'} />
            <CalcButton symbol={Symbols.EIGHT} action={() => actions.append(Symbols.EIGHT)} color={'clouds'} />
            <CalcButton symbol={Symbols.NINE} action={() => actions.append(Symbols.NINE)} color={'clouds'} />
            <CalcButton symbol={Symbols.MULTIPLICATION} action={() => actions.append(Symbols.MULTIPLICATION)} color={'clouds'} />
          </CalcRow>
          <CalcRow>
            <CalcButton symbol={Symbols.DOUBLE_ZERO} action={() => actions.append(Symbols.DOUBLE_ZERO)} color={'clouds'} />
            <CalcButton symbol={Symbols.ZERO} action={() => actions.append(Symbols.ZERO)} color={'clouds'} />
            <CalcButton symbol={Symbols.PERIOD} action={() => actions.append(Symbols.PERIOD)} color={'clouds'} />
            <CalcButton symbol={Symbols.EQUALS} action={() => actions.getResult()} color={'clouds'} />
            <CalcButton symbol={Symbols.DIVISION} action={() => actions.append(Symbols.DIVISION)} color={'clouds'} />
          </CalcRow>
          
        </div>
      )
}
    
export default CalcPanel