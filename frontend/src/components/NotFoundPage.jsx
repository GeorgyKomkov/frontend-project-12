import { useTranslation } from 'react-i18next';
import error404 from '../assets/error404.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t('notFound')}
        style={{ maxHeight: '25vh' }}
        className="img-fluid h-25"
        src={error404}
      />
      <h1 className="h4 text-muted">{t('notFound')}</h1>
      <p className="text-muted">
        {t('redirectTextBegin')}
        <a href="/">{t('redirectTextEnd')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
