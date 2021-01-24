import React from "react";
import {FaPlus as PlusIcon, FaMinus as MinusIcon} from "react-icons/fa";
/*
Props:
    updateState- to add/remove objects to the parent state
    limit- the number to max out at
    object- the object to concat/remove from the objectArray
    objectArray- used for the length of the array to keep track of the #
 */
const NumberPicker = ({limit = 100, object, objectArray, updateState}) => {
    let num = objectArray.length;
    // let limit = limit || 100;

    const change = (num, object, objArr) => {
        // let newObjArr = JSON.parse(JSON.stringify(objArr));
        let newObjArr = [...objArr];
        let x = parseInt(num) || 0;
        x = (x > limit ? limit : x);

        let cur = newObjArr.length;
        if (x > cur) {
            while(cur !== x){
                newObjArr.push(object);
                cur++;
            }
        }
        else if (x < cur)
            while(cur !== x){
                newObjArr.pop();
                cur--;
            }
        return newObjArr;
    };

    return (
        <div className={"numberpickerwrapper"}>
            <div
                className={`numbersub ${num === 0 ? 'disabled' : ''}`}
                onClick={()=>{
                    updateState(change(num-1, object, objectArray));
                }}
            >
                <MinusIcon className={"posabs"}/>
            </div>
            <div className={"numberinput"}>
                <input
                    type={"text"}
                    placeholder={num}
                    value={num}
                    onChange={(e) => {
                        updateState(change(e.currentTarget.value, object, objectArray));
                    }}
                />
            </div>
            <div
                className={`numberadd ${num === limit ? 'disabled' : ''}`}
                onClick={() => {
                    updateState(change(num+1, object, objectArray));
                }}
            >
                <PlusIcon className={"posabs"}/>
            </div>
        </div>
    )
};


export default NumberPicker;