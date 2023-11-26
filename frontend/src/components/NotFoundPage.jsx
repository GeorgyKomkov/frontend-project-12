import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../routes';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t('notFound')}
        style={{ maxHeight: '25vh' }}
        className="img-fluid h-25"
      />
      <h1 className="h4 text-muted">{t('notFound')}</h1>
      <p className="text-muted">
        {t('returnToHome')}
        <Link to={routes.home()}>{t('toMain')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
