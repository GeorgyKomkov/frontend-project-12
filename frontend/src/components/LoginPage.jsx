import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';
import avatar from '../assets/avatar.jpg';
import routes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(t('validation.emptyField')).trim(),
      password: yup.string().required(t('validation.emptyField')).trim(),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        await auth.logIn(username, password);
        const { from } = location.state || {
          from: { pathname: routes.home() },
        };
        navigate(from);
      } catch (error) {
        if (error.response.status === 401) {
          formik.setErrors({
            username: t('validation.authFailed'),
            password: t('validation.authFailed'),
          });
        } else {
          console.error(error);
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={avatar}
                  className="rounded-circle"
                  alt={t('loginHeader')}
                />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">{t('loginHeader')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    id="username"
                    placeholder={t('username')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <Form.Label htmlFor="username">{t('username')}</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-4" controlId="password">
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete={t('password')}
                    placeholder={t('password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  {t('loginHeader')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('noAccountQM')}</span>
                <Link to={routes.signup()}>{t('registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
