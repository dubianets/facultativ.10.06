import React, {useState} from 'react';
import Column from "./Column";
import 'bootstrap/dist/css/bootstrap.css'
import ControllPanell from "./ControllPanell";
import Trash from "./Trash";


const taskArray = [
    {id: Math.random(), name: 'First task', status: 'todo', priority: 1},
    {id: Math.random(), name: 'First two task', status: 'todo', priority: 3},
    {id: Math.random(), name: 'Second task', status: 'progress', priority: 1},
    {id: Math.random(), name: 'Third task', status: 'review', priority: 2},
    {id: Math.random(), name: 'Third two task', status: 'review', priority: 1},
    {id: Math.random(), name: 'Fourth task', status: 'done', priority: 1},
]

const columnArray = [
    {id: Math.random(), title: 'ToDo', status: 'todo'},
    {id: Math.random(), title: 'Progress', status: 'progress'},
    {id: Math.random(), title: 'Review', status: 'review'},
    {id: Math.random(), title: 'Done', status: 'done'}
]

const trashArr = [
    {id: Math.random(), name: 'Deleted task', status: 'progress', priority: 1}
];

const statusChanger = ['todo', 'progress', 'review', 'done']

function App() {

    const [column, setColumn] = useState(columnArray);
    const [tasks, setTasks] = useState(taskArray);
    const [trashList, setTrashList] = useState(trashArr);

    const createTask = (newName, newStatus) => {
        let newObj = {
            id: Math.random(),
            name: newName,
            status: newStatus,
            priority: 1
        };
        const newTask = [...tasks, newObj ]
        setTasks(newTask)
    }

    const moveTaskLeftRight = (taskId, direction ) => {
       const newTask = tasks.map(elem => {
            if(elem.id === taskId){
                if( direction === 'right') elem.status = statusChanger[statusChanger.indexOf(elem.status) + 1];
                if( direction === 'left') elem.status = statusChanger[statusChanger.indexOf(elem.status) - 1];
                // if( direction === 'up') elem.priority = prioritys [prioritys.indexOf(elem.priority) + 1]
                // if( direction === 'down') elem.priority = prioritys [prioritys.indexOf(elem.priority) - 1]

            }
            return elem;
        })
        setTasks(newTask);
    }

    const del = (taskId) => {
        let newTrashList = [];
        const newList = tasks
            .map(el => {
                if(el.id === taskId) {
                    newTrashList = [...trashList,el]
                }
                return el;
            })
            .filter(el => el.id !== taskId)
        setTasks(newList);
        setTrashList(newTrashList);
    }

    const prioritys = [1, 2, 3, 4];

    const priorityChange = (id, value) => {
       const newList = tasks.map(el => {
           if(el.id === id){
              el.priority = prioritys [prioritys.indexOf(el.priority) + value]
           }
           return el;
       })
        setTasks(newList);
    }

    const editTask = (id, updateTask) => {
        const newTasks = tasks.map(el => {
            if(el.id === id){
                return {...el, ...updateTask}
            }
            return el;
        })
        setTasks(newTasks);
    }

    const trashReturn = (trashId) => {
      const newList = trashList.map(el => {
          if(el.id === trashId) {return [...tasks, el]}
          return el;
      })
        console.log(newList)
        setTasks(newList);
      //  const newList = trashList.filter( el => el.id !== trashId)
      // setTrashList(newList);
    }

    return (
        <div className='container'>

                <ControllPanell createTask={createTask}/>

            <div className='row'>

                {column.map((el,index) =>
                    <Column
                        key={Math.random()}
                        editTask={editTask}
                        prioritys={prioritys}
                        priorityChange={priorityChange}
                        del={del}
                        moveTaskLeftRight={moveTaskLeftRight}
                        column={el}
                        tasks={tasks}
                    />
                )}

            </div>

            <div>


                <Trash
                key={Math.random()}
                trashReturn={trashReturn}
                trashList={trashList}
                />

            </div>

        </div>
    );
}

export default App;
