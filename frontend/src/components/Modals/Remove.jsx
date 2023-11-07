import { Modal, Button } from 'react-bootstrap';
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
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="danger" onClick={handleRemove}>{t('modal.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
