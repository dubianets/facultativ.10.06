import React from 'react';
import Tasks from "./Tasks";


function Column (props) {


    return (
        <div className='col-4 col-sm' style={{border: '1px solid'}}>

            <h3>{props.column.title}</h3>
            {props.tasks.filter(el => props.column.status === el.status)
                .sort((a, b) => b.priority - a.priority)
                .map((el,index) =>
                <Tasks
                    key={Math.random()}
                    editTask={props.editTask}
                    prioritys={props.prioritys}
                    priorityChange={props.priorityChange}
                    del={props.del}
                    columnStatus = {props.column.status}
                    index={index}
                    moveTaskLeftRight={props.moveTaskLeftRight}
                    tasks={el}
                />)}


        </div>
    );
}

export default Column;
