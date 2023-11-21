import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { close } from '../../slices/modalSlice';
import { useSocket, useFilter } from '../../hooks';

const Rename = () => {
  const filterWords = useFilter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();
  const rollbar = useRollbar();
  const inputRef = useRef(null);
  const channalId = useSelector((state) => state.modal.extra.channalId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const existingChannels = channels.map((channel) => channel.name);
  const oldNameChannel = channels.find((channel) => channel.id === channalId)?.name || '';

  const formik = useFormik({
    initialValues: { name: oldNameChannel },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required('обязательное поле')
        .min(3, 'минимум 3 символа')
        .max(20, 'максимум 20 символов')
        .test('is-unique', 'Должно быть уникальным', (value) => !existingChannels.includes(value)),
    }),
    onSubmit: async ({ name }) => {
      const filteredRename = filterWords(name);
      try {
        await socket.renameChannel(channalId, filteredRename);
        toast.success(t('notifications.renameChannel'));
        dispatch(close());
      } catch (error) {
        toast.error(t('notifications.errorRenameChannel'));
        rollbar.error('RenameChannel', error);
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show centered onHide={() => dispatch(close())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} controlId="name">
          <Form.Group>
            <Form.Control
              type="text"
              ref={inputRef}
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              name="name"
              isInvalid={formik.errors.name}
            />
            <Form.Label htmlFor="name" visuallyHidden>{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(close())}>{t('modal.send')}</Button>
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('modal.cancel')}</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
