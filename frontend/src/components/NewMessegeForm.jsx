import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import SendMessageIcon from '../icons/SendMessagesIcon';

const NewMessegeForm = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { messageBody: '' },
    onSubmit: ({ messageBody }) => {
      try {
        console.log(messageBody);
      } catch (err) {
        console.error(err);
      }
    },
    validationSchema: yup.object().shape({
      messageBody: yup.string().required(),
    }),
  });
  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="input-group">
          <Form.Control
            name="messageBody"
            autoComplete="off"
            aria-label={t('newMessage')}
            placeholder={t('newMessagePlaceholder')}
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.messageBody}
          />
          <Button type="submit" variant="light" className="border-0">
            <SendMessageIcon />
            <span className="visually-hidden">{t('send')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewMessegeForm;
