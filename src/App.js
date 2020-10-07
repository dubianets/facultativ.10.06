import React, {useState} from 'react';
import Column from "./Column";
import 'bootstrap/dist/css/bootstrap.css'


const taskArray = [
    {id: Math.random(), name: 'First task', status: 'todo'},
    {id: Math.random(), name: 'Second task', status: 'progress'},
    {id: Math.random(), name: 'Third task', status: 'review'},
    {id: Math.random(), name: 'Fourth task', status: 'done'},
]

const columnArray = [
    {id: Math.random(), title: 'ToDo', status: 'todo'},
    {id: Math.random(), title: 'Progress', status: 'progress'},
    {id: Math.random(), title: 'Review', status: 'review'},
    {id: Math.random(), title: 'Done', status: 'done'}
]

const statusChanger = ['todo', 'progress', 'review', 'done']

function App() {

    const [column, setColumn] = useState(columnArray);
    const [tasks, setTasks] = useState(taskArray);

    const moveTaskLeftRight = (taskId, direction ) => {
       const newTask = taskArray.map(elem => {
            if(elem.id === taskId){
                if( direction === 'right') elem.status = statusChanger[statusChanger.indexOf(elem.status) + 1];
                if( direction === 'left') elem.status = statusChanger[statusChanger.indexOf(elem.status) - 1];
            }
            return elem;
        })
        setTasks(newTask);
    }

    return (
        <div className='container'>

            <div className='row'>

                {column.map((el,index) =>
                    <Column
                        moveTaskLeftRight={moveTaskLeftRight}
                        column={el}
                        tasks={tasks}
                    />
                )}

            </div>

        </div>
    );
}

export default App;
