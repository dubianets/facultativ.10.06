import React, {useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader} from "reactstrap";
import EditModel from "./EditModel";

function Tasks (props) {

    const [confirmationMode, setConfirmationMode] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const changeEditModel =() => {
        setEditMode(!editMode)
    }

    return (
        <div className='card'>

            <EditModel editTask={props.editTask} task={props.tasks} editMode={editMode} changeEditModel={changeEditModel} />
            <div className='card-body'>


            <h5 className='card-title'>{props.tasks.name}{' '}{props.tasks.priority}</h5>
               <Button disabled={props.tasks.priority === props.prioritys[props.prioritys.length-1]} outline color="info" onClick={() => props.priorityChange(props.tasks.id, 1)}>↑</Button>
               <Button disabled={props.tasks.priority === props.prioritys[0]} outline color="info" onClick={() => props.priorityChange(props.tasks.id, -1)}>↓</Button>
            <p>{props.tasks.status}</p>
                {props.tasks.status !== 'todo' &&
            <a className="btn btn-primary" href="#" role="button"
               onClick={() => props.moveTaskLeftRight(props.tasks.id,'left')}>←</a>
                    }
                {props.tasks.status !== 'done' &&
            <a className="btn btn-primary" href="#" role="button"
               onClick={() => props.moveTaskLeftRight(props.tasks.id,'right')}>→</a>
                }
                <Button onClick={() => setConfirmationMode(!confirmationMode)}>delete</Button>
                <Button outline color="warning" onClick={() => setEditMode(true)}>Edit</Button>

            </div>
            <>
            <Modal isOpen={confirmationMode}  >
                <ModalHeader>Confirmation</ModalHeader>
                <ModalFooter>
                    <Button color="primary" onClick={() => props.del(props.tasks.id)}>YES</Button>{' '}
                    <Button color="secondary" onClick={() => setConfirmationMode(!confirmationMode)} >NO</Button>
                </ModalFooter>
            </Modal>
        </>

        </div>
    );
}

export default Tasks;