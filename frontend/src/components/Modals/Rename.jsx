import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { close } from '../../slices/modalSlice';
import { useSocket } from '../../hooks';
import filterWords from '../../filterWords';

const Rename = () => {
  const { t } = useTranslation();
  const channalId = useSelector((state) => state.modal.extra.channalId);
  const dispatch = useDispatch();
  const socket = useSocket();
  const hendleClose = () => dispatch(close());

  const existingChannels = useSelector((state) => state.channelsInfo.channels
    .map((channel) => channel.name));

  const oldNameChannal = useSelector((state) => state.channelsInfo.channels
    .filter((channel) => channalId === channel.id)[0].name);

  const formik = useFormik({
    initialValues: { body: oldNameChannal },
    validationSchema: yup.object().shape({
      body: yup
        .string()
        .required('обязательное поле')
        .min(3, 'минимум 3 символа')
        .max(20, 'максимум 20 символов')
        .test('is-unique', 'Должно быть уникальным', (value) => !existingChannels.includes(value)),
    }),
    onSubmit: async ({ body }) => {
      const filteredRename = filterWords(body);
      try {
        socket.renameChannel(channalId, filteredRename);
        toast.success(t('notifications.renameChannel'));
        hendleClose();
      } catch (error) {
        toast.error(t('notifications.errorRenameChannel'));
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={hendleClose}>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
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
            <FormControl.Feedback type="invalid">
              { formik.errors.body }
            </FormControl.Feedback>
          </FormGroup>
          <input type="button" className="me-2 btn btn-secondary" value={t('modal.send')} onClick={hendleClose} />
          <input type="submit" className="btn btn-primary" value={t('modal.cancel')} />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
