import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import SendMessageIcon from '../../icons/SendMessagesIcon';
import { newMessage } from '../../socketApi';

const NewMessegeForm = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const currentChannel = channels.filter((channel) => currentChannelId === channel.id)[0];
  const formik = useFormik({
    initialValues: { messageBody: '' },
    onSubmit: ({ messageBody }) => {
      try {
        console.log('Данные отправляются корректно');
        newMessage({
          body: messageBody,
          channelId: currentChannelId,
          username: currentChannel.name,
        });
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
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        className="py-1 border rounded-2"
      >
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
