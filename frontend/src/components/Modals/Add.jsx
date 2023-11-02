import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { close } from '../../slices/modalSlice';
import { newChannel } from '../../api/socketApi';

const Add = () => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // получаем массив с именами существующих канналов
  // eslint-disable-next-line arrow-body-style
  const existingChannels = useSelector((state) => {
    return state.channelsInfo.channels.map((channel) => channel.name);
  });
  const dispath = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const hendleClose = () => dispath(close());
  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: yup.object().shape({
      body: yup
        .string()
        .required('обязательное поле')
        .min(3, 'минимум 3 символа')
        .max(20, 'максимум 20 символов')
        .test('is-unique', 'Должно быть уникальным', (value) => !existingChannels.includes(value)),
    }),
    onSubmit: ({ body }, { resetForm }) => {
      newChannel(body);
      resetForm();
      hendleClose();
    },
  });

  return (
    <Modal show={isOpened}>
      <Modal.Header closeButton onHide={hendleClose}>
        <Modal.Title>Добавить канал</Modal.Title>
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
          <input type="button" className="me-2 btn btn-secondary" value="Отменить" onClick={hendleClose} />
          <input type="submit" className="btn btn-primary mt-2" value="Отправить" />
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Add;
