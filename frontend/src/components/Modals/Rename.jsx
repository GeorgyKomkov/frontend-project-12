import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../slices/modalSlice';
import { renameChannel } from '../../api/socketApi';

const Rename = () => {
  const channalId = useSelector((state) => state.modal.extra.channalId);
  const dispatch = useDispatch();
  const hendleClose = () => dispatch(close());

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: ({ body }) => {
      renameChannel(channalId, body);
      hendleClose();
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={hendleClose}>
        <Modal.Title>Rename</Modal.Title>
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
          <input type="button" className="me-2 btn btn-secondary" value="отменить" onClick={hendleClose} />
          <input type="submit" className="btn btn-primary" value="отправить" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
