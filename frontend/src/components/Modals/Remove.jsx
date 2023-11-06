import { Modal, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { close } from '../../slices/modalSlice';
import { useSocket } from '../../hooks';

const Remove = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channalId = useSelector((state) => state.modal.extra.channalId);
  const hendleClose = () => dispatch(close());
  const sokcet = useSocket();
  const handleRemove = async () => {
    try {
      sokcet.removeChannel(channalId);
      toast.success('Канал удален');
      dispatch(close());
    } catch (error) {
      toast.error('Ошибка с удалением канала');
    }
  };

  return (
    <Modal show={isOpened}>
      <Modal.Header closeButton onHide={hendleClose}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleRemove}>
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
