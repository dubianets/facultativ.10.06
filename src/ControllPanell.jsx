import React, {useState} from 'react';
import  { Input,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




function ControllPanell (props) {

    const [creatMode, setCreatMode] = useState(false)
    const[nameInputValue, setNameInputV] = useState('')
    const[statusInputValue, setStatusInputV] = useState('todo')
    const[priorityInputValue, setPriorityInputV] = useState('')
    const[descriptionInputValue, setDescriptionInputValue] = useState('')


    const CreateButtonHandler = () => {
        props.createTask(nameInputValue,statusInputValue, descriptionInputValue,priorityInputValue)
        setCreatMode(!creatMode)
        setNameInputV('')
        setStatusInputV('')
        setDescriptionInputValue('')
        setPriorityInputV('')
    }

    return (
        <div>

           <button onClick={() => setCreatMode(!creatMode)}>Create</button>
            {creatMode &&
                <>
                    <Modal isOpen={creatMode}  >
                        <ModalHeader>Creat new Task</ModalHeader>
                        <ModalBody>
                            <label>Name:</label>
                            <Input type="text" value={nameInputValue} placeholder="type name here"
                                   onChange={(event) => setNameInputV(event.target.value) }/>
                            <label>Description:</label>
                            <Input type="text" value={descriptionInputValue} placeholder="type description here"
                                   onChange={(event) => setDescriptionInputValue(event.target.value) }/>
                                   <label>Priority:</label>
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
                            <Button color="primary" onClick={CreateButtonHandler}>Create new task!</Button>{' '}
                            <Button color="secondary" onClick={() => setCreatMode(!creatMode)} >Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </>

            }




        </div>
    );
}

export default ControllPanell;