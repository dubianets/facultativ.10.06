import React, {useState} from "react";
import {Button, Modal, ModalBody , ModalFooter, ModalHeader} from "reactstrap";

function Trash(props) {


    const [trashMode, setTrashMode] = useState(false)

    return (
        <div>
            <Button onClick={() => setTrashMode(!trashMode)}>Trash basket 🗑</Button>
            <>
                <Modal isOpen={trashMode}>
                    <ModalHeader>Trash :</ModalHeader>
                    <ModalBody>{props.trashList.map(el =>
                        <div>

                            {el.name}
                            {' '}
                        </div>)}

                    </ModalBody>
                    <ModalFooter>
                            <Button color="primary" onClick={props.trashReturn}>return iteams</Button>
                        <Button color="secondary" onClick={() => setTrashMode(!trashMode)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>

        </div>
    )
}

export default Trash;