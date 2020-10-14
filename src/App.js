import React, {useEffect, useState} from 'react';
import Column from "./Column";
import 'bootstrap/dist/css/bootstrap.css'
import ControllPanell from "./ControllPanell";
import Trash from "./Trash";
import axios from 'axios';


// const taskArray = [
//     {id: Math.random(), name: 'First task', status: 'todo', priority: 1},
//     {id: Math.random(), name: 'First two task', status: 'todo', priority: 3},
//     {id: Math.random(), name: 'Second task', status: 'progress', priority: 1},
//     {id: Math.random(), name: 'Third task', status: 'review', priority: 2},
//     {id: Math.random(), name: 'Third two task', status: 'review', priority: 1},
//     {id: Math.random(), name: 'Fourth task', status: 'done', priority: 1},
// ]
//
const columnArray = [
    {id: Math.random(), title: 'ToDo', status: 'todo'},
    {id: Math.random(), title: 'Progress', status: 'progress'},
    {id: Math.random(), title: 'Review', status: 'review'},
    {id: Math.random(), title: 'Done', status: 'done'}
]

const trashArr = [];

const statusChanger = ['todo', 'progress', 'review', 'done']

function App() {

    const [column, setColumn] = useState(columnArray);
    const [tasks, setTasks] = useState([]);
    const [trashList, setTrashList] = useState(trashArr);

    const createTask = async (newName, newStatus, newDescription, newPriority) => {
        let newObj = {
            id: Math.random(),
            name: newName,
            status: newStatus,
            priority: newPriority,
            description: newDescription
        };
       await axios.post("https://nazarov-kanban-server.herokuapp.com/card/",newObj)
           .then(res => {
               axios.get("https://nazarov-kanban-server.herokuapp.com/card")
                   .then(res => {
                       setTasks(res.data)
                   });
                   })
                   .catch(err => {
                       console.log(err)});
    }

    const moveTaskLeftRight = async (taskId, direction ) => {
       let result = tasks.filter(elem => elem.id === taskId)
        result.map(el => {
                if( direction === 'right') return {...el, status: statusChanger[statusChanger.indexOf(el.status) + 1]};
                if( direction === 'left') return  {...el, status: statusChanger[statusChanger.indexOf(el.status) - 1]};
        console.log(result);
        })
        const obj = {...result[0]}
              await  axios.patch("https://nazarov-kanban-server.herokuapp.com/card/" + taskId, {status: statusChanger[2]} )
                    .then(res => {
                        axios.get("https://nazarov-kanban-server.herokuapp.com/card")
                            .then(res => {
                                setTasks(res.data)
                            });
                    })
                    .catch(err => {
                        console.log(err)});
    }

    // const del = (taskId) => {
    //     let newTrashList = [];
    //     const newList = tasks
    //         .map(el => {
    //             if(el.id === taskId) {
    //                 newTrashList = [...trashList,el]
    //             }
    //             return el;
    //         })
    //         .filter(el => el.id !== taskId)
    //     setTasks(newList);
    //     setTrashList(newTrashList);
    // }
    const del =(taskId) => {
        axios.delete("https://nazarov-kanban-server.herokuapp.com/card/" + taskId)
            .then(res => {
                axios.get("https://nazarov-kanban-server.herokuapp.com/card")
                    .then(res => {
                        setTasks(res.data);
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
            .catch((err => {
                console.log(err) })
            )}

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
      const newList = [...tasks,...trashList];
      //     trashList.map(el => {
      //     if(el.id === trashId) {return [...tasks,el]}
      //     return el;
      // })
      //   console.log(newList)
        setTasks(newList);
       //const newTrash = trashList.filter( el => el.id !== trashId)
      setTrashList(trashArr);
    }

    useEffect(() => {
        axios.get("https://nazarov-kanban-server.herokuapp.com/card")
            .then(res => {
                setTasks(res.data);
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='container'>

                <ControllPanell
                    createTask={createTask}
                />

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
