import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../slices/modalSlice';

const Add = () => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({ onSubmit: console.log('yaaaz'), initialValues: { body: '' } });
  const dispath = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const hendleClose = () => dispath(close());
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
            />
          </FormGroup>
          <input type="button" className="me-2 btn btn-secondary" value="Отменить" onClick={hendleClose} />
          <input type="submit" className="btn btn-primary mt-2" value="Отправить" />
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Add;
