import React, {useEffect, useState} from "react";
import {FaPlus as PlusIcon, FaMinus as MinusIcon} from "react-icons/fa";
/*
Props:
    updateState- to add/remove objects to the parent state
    limit- the number to max out at
    object- the object to concat/remove from the objectArray
    objectArray- used for the length of the array to keep track of the #
 */
const NumberPicker = ({limit = 100, object, objectArray, updateState}) => {
    const [amount, setAmount] = useState(-1);
    const change = (num, object, objArr) => {
        setAmount(num);
        let newObjArr = [...objArr];
        let x = parseInt(num) || 0;
        x = (x > limit ? limit : x);

        let cur = newObjArr.length;
        if (x > cur) {
            while (cur !== x) {
                newObjArr.push(object);
                cur++;
            }
        } else if (x < cur)
            while (cur !== x) {
                newObjArr.pop();
                cur--;
            }
        return newObjArr;
    };

    useEffect(() => {
      setAmount(objectArray.length);
    }, [objectArray]);

    return (
        <div className={"numberpickerwrapper"}>
            <div
                className={`numbersub ${amount === 0 ? 'disabled' : ''}`}
                onClick={()=>{
                    updateState(change(amount-1, object, objectArray));
                }}
            >
                <MinusIcon className={"posabs"}/>
            </div>
            <div className={"numberinput"}>
                <input
                    type={"text"}
                    placeholder={amount}
                    value={amount}
                    onChange={e => setAmount(parseInt(e.currentTarget.value) || 0)}
                    onKeyPress={(e) => {
                        if(e.key === "Enter")
                            updateState(change(amount, object, objectArray));
                    }}
                />
            </div>
            <div
                className={`numberadd ${amount === limit ? 'disabled' : ''}`}
                onClick={() => {
                    updateState(change(amount+1, object, objectArray));
                }}
            >
                <PlusIcon className={"posabs"}/>
            </div>
        </div>
    )
};


export default NumberPicker;