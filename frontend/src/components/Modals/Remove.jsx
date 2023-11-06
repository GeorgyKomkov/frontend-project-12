import { Modal, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { close } from '../../slices/modalSlice';
import { useSocket } from '../../hooks';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channalId = useSelector((state) => state.modal.extra.channalId);
  const hendleClose = () => dispatch(close());
  const sokcet = useSocket();
  const handleRemove = async () => {
    try {
      sokcet.removeChannel(channalId);
      toast.success(t('notifications.removeChannel'));
      dispatch(close());
    } catch (error) {
      toast.error(t('notifications.errorRemoveChannel'));
    }
  };

  return (
    <Modal show={isOpened}>
      <Modal.Header closeButton onHide={hendleClose}>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleRemove}>
          <FormGroup>
            <input
              type="button"
              className="me-2 btn btn-secondary"
              value={t('modal.send')}
              onClick={hendleClose}
            />
            <input
              type="submit"
              className="btn btn-danger mt-2"
              value={t('modal.remove')}
            />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
