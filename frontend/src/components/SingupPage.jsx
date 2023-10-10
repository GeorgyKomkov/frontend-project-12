import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import avatarReg from '../assets/avatarReg.jpg';

const SignupPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required('обязательное поле')
        .min(3, 'минимум 3 символа')
        .max(20, 'максимум 20 символов'),
      password: yup
        .string()
        .required('обязательное поле')
        .min(6, 'минимум 6 символов'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    }),
    onSubmit: (values) => {
      console.log(values);
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
                alt="Регистрация"
              />
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    id="username"
                    placeholder="От 3 до 20 символов"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.errors.username}
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-3" controlId="password">
                  <Form.Control
                    type="password"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    placeholder="Не менее 6 символов"
                    value={formik.values.password}
                    autocomplete="new-password"
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.password}
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="form-floating mb-4"
                  controlId="confirmPassword"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.confirmPassword}
                  />
                  <Form.Label htmlFor="confirmPassword">
                    Подтвердите пароль
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  Зарегистрироваться
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