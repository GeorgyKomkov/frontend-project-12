import { Modal, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../slices/modalSlice';
import { removeChannel } from '../../api/socketApi';

const Remove = () => {
  const dispath = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channalId = useSelector((state) => state.modal.extra.channalId);
  const hendleClose = () => dispath(close());
  const onSubmit = removeChannel(channalId);

  return (
    <Modal show={isOpened}>
      <Modal.Header closeButton onHide={hendleClose}>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <input
              type="button"
              className="me-2 btn btn-secondary"
              value="Отменить"
              onClick={hendleClose}
            />
            <input
              type="submit"
              className="btn btn-danger mt-2"
              value="Удалить"
            />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
