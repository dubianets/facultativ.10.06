import React, {useState} from 'react';
import  { Input,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




function EditModel (props) {

    const[nameInputValue, setNameInputV] = useState(props.task.name)
    const[statusInputValue, setStatusInputV] = useState(props.task.status)
    const[descriptionInputValue, setDescriptionInputV] = useState(props.task.description)
    const[priorityInputValue, setPriorityInputV] = useState(props.task.priority)


    const CreateButtonHandler = () => {
        props.editTask(props.task._id, descriptionInputValue, nameInputValue, priorityInputValue, statusInputValue)
        props.changeEditModel();
    }

    return (
        <div>

            <>
                <Modal isOpen={props.editMode}>
                    <ModalHeader>Edit Task</ModalHeader>
                    <ModalBody>
                        <label>Description :</label>
                        <Input type="text" value={descriptionInputValue} placeholder="type description here"
                               onChange={(event) => setDescriptionInputV(event.target.value) }/>
                        <label>Name:</label>
                        <Input type="text" value={nameInputValue} placeholder="type name here"
                               onChange={(event) => setNameInputV(event.target.value) }/>
                               <label>Priority :</label>
                        <Input type="text" value={priorityInputValue} placeholder="type priority here"
                               onChange={(event) => setPriorityInputV(event.target.value) }/>
                        <label>Status:</label>
                        <Input type="select" value={statusInputValue} onChange={(event) => setStatusInputV(event.target.value)}>
                            <option value='todo'>To do</option>
                            <option value='progress'>In progress</option>
                            <option selected='true' value="review">Review</option>
                            <option value='done'>Done</option>
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={CreateButtonHandler}>Edit task</Button>{' '}
                        <Button color="secondary" onClick={() => props.changeEditModel()} >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>


        </div>
    );
}

export default EditModel;