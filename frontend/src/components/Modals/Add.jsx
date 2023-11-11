import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { close } from '../../slices/modalSlice';
import { useSocket } from '../../hooks/index';
import filterWords from '../../filterWords';

const Add = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const inputRef = useRef();
  // eslint-disable-next-line arrow-body-style
  const existingChannels = useSelector((state) => {
    return state.channelsInfo.channels.map((channel) => channel.name);
  });
  const dispath = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const rollbar = useRollbar();
  const hendleClose = () => dispath(close());

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: { body: '' },

    validationSchema: yup.object().shape({
      body: yup
        .string()
        .required(t('validation.emptyField'))
        .min(3, t('validation.minMaxsimSymbols'))
        .max(20, t('validation.minMaxsimSymbols'))
        .test('is-unique', t('validation.uniqueness'), (value) => !existingChannels.includes(value)),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ body }, { resetForm }) => {
      const filteredNameChannel = filterWords(body);

      try {
        await socket.newChannel(filteredNameChannel);
        toast.success(t('notifications.addChannel'));
        resetForm();
      } catch (error) {
        toast.error(t('notifications.errorAddChannel'));
        rollbar.error('AddChannel', error);
      } finally {
        hendleClose();
      }
    },
  });

  return (
    <Modal show={isOpened} centered>
      <Modal.Header closeButton onHide={hendleClose}>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="input-body"
              name="body"
              isInvalid={
                formik.touched.body && formik.errors.body
              }
            />
            <Form.Control.Feedback type="invalid">
              { formik.errors.body }
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={hendleClose}>{t('modal.send')}</Button>
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('modal.cancel')}</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Add;
