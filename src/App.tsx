import React, { useState } from 'react';
import './App.css';

export default function App1() {

    function stringMath(eq: any, callback: any) {
        if (typeof eq !== 'string') return handleCallback(new TypeError('The [String] argument is expected.'), null);
        const mulDiv = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([*/])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
        const plusMin = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([+-])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
        const parentheses = /(\d)?\s*\(([^()]*)\)\s*/;
        var current;
        while (eq.search(/^\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*$/) === -1) {
            eq = fParentheses(eq);
            if (eq === current) return handleCallback(new SyntaxError('The equation is invalid.'), null);
            current = eq;
        }
        return handleCallback(null, +eq);

        function fParentheses(eq: any) {
            while (eq.search(parentheses) !== -1) {
                eq = eq.replace(parentheses, function (a: any, b: any, c: any) {
                    c = fMulDiv(c);
                    c = fPlusMin(c);
                    return typeof b === 'string' ? b + '*' + c : c;
                });
            }
            eq = fMulDiv(eq);
            eq = fPlusMin(eq);
            return eq;
        }

        function fMulDiv(eq: any) {
            while (eq.search(mulDiv) !== -1) {
                eq = eq.replace(mulDiv, function (a: any) {
                    const sides: any = mulDiv.exec(a);
                    const result = sides[2] === '*' ? +sides[1] * +sides[3] : +sides[1] / +sides[3];
                    return result >= 0 ? '+' + result : result;
                });
            }
            return eq;
        }

        function fPlusMin(eq: any) {
            eq = eq.replace(/([+-])([+-])(\d|\.)/g, function (a: any, b: any, c: any, d: any) { return (b === c ? '+' : '-') + d; });
            while (eq.search(plusMin) !== -1) {
                eq = eq.replace(plusMin, function (a: any) {
                    const sides: any = plusMin.exec(a);
                    return sides[2] === '+' ? +sides[1] + +sides[3] : +sides[1] - +sides[3];
                });
            }
            return eq;
        }

        function handleCallback(errObject: any, result: any) {
            if (typeof callback !== 'function') {
                if (errObject !== null) throw errObject;
            } else {
                callback(errObject, result);
            }
            return result;

        }

    }

    const [input, setInput] = useState<any[]>([]);
    const handleClick = (value: any) => {
        setInput([...input, value]);
        setResult2('');
    };

    function handleRemove() {
        setInput(input.slice(0, -1));
    }

    const [result2, setResult2] = useState("");
    const handleResult = () => {
        let result1 = stringMath((input.map((e: any) => e).join('')).toString(), '');
        setResult2(result1);
        setInput([]);
    }

    function handleClear() {
        setInput([]);
        setResult2('');
    }

    return (
        <div className="grid-container">
            {/* row1 */}
            <div className="item1">{result2 === '' ? input : result2}</div>
            {/* row2 */}
            <div className="item2"><button onClick={() => handleClick(7)}>7</button></div>
            <div className="item2"><button onClick={() => handleClick(8)}>8</button></div>
            <div className="item3"><button onClick={() => handleClick(9)}>9</button></div>
            <div className="item4"><button onClick={() => handleClick('*')}
            className={result2 !== '' || input.toString() === '' ? 'disabled' : ''}
            >*</button></div>
            {/* row3 */}
            <div className="item5"><button onClick={() => handleClick(4)}>4</button></div>
            <div className="item6"><button onClick={() => handleClick(5)}>5</button></div>
            <div className="item7"><button onClick={() => handleClick(6)}>6</button></div>
            <div className="item8"><button onClick={() => handleClick('/')}
            className={result2 !== '' || input.toString() === '' ? 'disabled' : ''}
            >/</button></div>
            {/* row4 */}
            <div className="item9"><button onClick={() => handleClick(1)}>1</button></div>
            <div className="item10"><button onClick={() => handleClick(2)}>2</button></div>
            <div className="item11"><button onClick={() => handleClick(3)}>3</button></div>
            <div className="item12"><button onClick={() => handleClick('+')}
            className={result2 !== '' || input.toString() === '' ? 'disabled' : ''}
            >+</button></div>
            {/* row5 */}
            <div className="item13"><button onClick={() => handleClick('(')}>{'\u0028'}</button></div>
            <div className="item14"><button onClick={() => handleClick(0)}>0</button></div>
            <div className="item15"><button onClick={() => handleClick(')')}>{'\u0029'}</button></div>
            <div className="item16"><button onClick={() => handleClick('-')}>-</button></div>
            {/* row6 */}
            <div className="item19"><button onClick={() => handleClear()}>C</button></div>
            <div className="item18"><button onClick={() => handleClick('.')}>.</button></div>
            <div className="item17"><button onClick={() => handleRemove()}
            className={result2 !== '' || input.toString() === '' ? 'disabled' : ''}
            >{'\u21FD'}</button></div>
            <div className="item19"><button onClick={() => handleResult()}
            className={result2 !== '' || input.toString() === '' ? 'disabled' : ''}
            >=</button></div>
        </div>
    )

}