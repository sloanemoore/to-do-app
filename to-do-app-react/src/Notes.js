import React, {useState, useEffect} from "react";

// you'll need to include this function into all components
function deepFreeze (o) {
    Object.freeze(o);
  
    Object.getOwnPropertyNames(o).forEach(function (prop) {
      if (o.hasOwnProperty(prop)
      && o[prop] !== null
      && (typeof o[prop] === "object" || typeof o[prop] === "function")
      && !Object.isFrozen(o[prop])) {
        deepFreeze(o[prop]);
      }
    });
    
    return o;
  };


export default function Notes(props) {
    const {toDoList, setToDoList, index, currentDate} = props;


    console.log({props});
    console.log({toDoList});
    console.log({currentDate});

    function handleNotesEdit (event, key) {
        let placeholderToDoList;
        const newNotes = event.target.value;
        placeholderToDoList = toDoList.map(item => {
            // console.log({key});
            // console.log("item.key: ", item.key);
            // console.log({newNotes});
            if (item.key === key) {
                // console.log(key===item.key);
                for (let i=0; i<item.dates.length; i++) {
                    const day = Object.keys(item.dates[i])[0];
                    console.log("day: ", day);
                    console.log({currentDate});
                    console.log(currentDate === day);
                    if (day === currentDate) {
                        const dateItem = {...item.dates[i][day]};
                        const updatedDateItem = {...dateItem, dayNotes: newNotes}; // I changed this line, too
                        console.log({updatedDateItem});
                        const newDates = [...item.dates];
                        newDates[i] = {[day]: updatedDateItem};
                        const newItem = {...item, dates: newDates};
                        return newItem;
                    } 
                }
            } else {
                return item;
                }
            })
            setToDoList(deepFreeze(placeholderToDoList));
    }

    return (
        <>
        <table>
            <thead>
                <tr>
                <th className="rowHighlight" colSpan="4">
                        Notes
                    </th>
                </tr>
                <tr>
                    <td className="taskEntry">
                        Task Details
                    </td>
			</tr>
            </thead>
                <tbody>
                    {toDoList.map((item, index) => {
                        const key = item.key;
                        // console.log({key})

                        return <tr key={key}>
                            <td className="notesEntry">
                                <span><input type="text" placeholder="Add a note" defaultValue={item.note} key={key} onChange={(event) => handleNotesEdit(event, key)}/></span>
                            </td>
                        </tr>
                    })
                    }
                </tbody>
        </table>
        </>
    )
}