import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import avatarReg from '../assets/avatarReg.jpg';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';

const SignupPage = () => {
  const inputName = useRef(null);

  useEffect(() => {
    if (inputName.current) {
      inputName.current.focus();
    }
  }, []);

  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required(t('validation.emptyField'))
        .min(3, t('validation.minMaxsimSymbols'))
        .max(20, t('validation.minMaxsimSymbols')),
      password: yup
        .string()
        .required(t('validation.emptyField'))
        .min(6, t('validation.minLengthPassword')),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], t('validation.passwordMatch')),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        await axios.post(routes.signupPage(), { username, password });
        await auth.logIn(username, password);
        navigate(routes.home());
      } catch (error) {
        if (error.response.status === 409) {
          formik.setErrors({
            username: 'Такой пользователь уже существует',
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
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <img
                src={avatarReg}
                className="rounded-circle"
                alt={t('registration')}
              />
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('registration')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    id="username"
                    placeholder={t('placeholder.username')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.errors.username}
                    ref={inputName}
                  />
                  <Form.Label htmlFor="username">{t('userName')}</Form.Label>
                  <div className="invalid-tooltip">
                    {formik.errors.username }
                  </div>
                </Form.Group>

                <Form.Group className="form-floating mb-3" controlId="password">
                  <Form.Control
                    type="password"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    placeholder={t('placeholder.password')}
                    value={formik.values.password}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.password}
                  />
                  <Form.Label>{t('password')}</Form.Label>
                  <div className="invalid-tooltip">
                    {formik.errors.password}
                  </div>
                </Form.Group>
                <Form.Group
                  className="form-floating mb-4"
                  controlId="confirmPassword"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder={t('placeholder.confirmPassword')}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.confirmPassword}
                  />
                  <Form.Label>
                    {t('confirmPassword')}
                  </Form.Label>
                  <div className="invalid-tooltip">
                    {formik.errors.confirmPassword}
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {t('register')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
