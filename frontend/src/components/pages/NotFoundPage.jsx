import { useTranslation } from 'react-i18next';

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
        <a href="/">{t('toMain')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
