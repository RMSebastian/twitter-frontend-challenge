import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { useSignup } from "../../../hooks/htttpServicesHooks/auth.hooks";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  Username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),
  Name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  Email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  Password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[^A-Za-z0-9]/, "Password must contain a special character")
    .required("Password is required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("Password")], "Passwords must match")
    .required("Confirm password is required"),
});
interface SignUpData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpPage = () => {
  const { mutate: signUp, isError: error } = useSignup();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (
    value: SignUpData,
    actions: FormikHelpers<SignUpData>
  ) => {
    const dto: Partial<SignUpData> = {
      username: value.username,
      name: value.name,
      email: value.email,
      password: value.password,
    };
    console.log(dto);
    try {
      signUp(dto);
      actions.setSubmitting(false);
    } catch (error) {
      actions.setSubmitting(false);
      console.error(error);
    }
  };

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <Formik
            initialValues={{
              name: "",
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }: any) => (
              <Form>
                <div className={"input-container"}>
                  <LabeledInput
                    name="name"
                    required
                    placeholder={"Enter name..."}
                    title={t("input-params.name")}
                    error={error}
                  />
                  <LabeledInput
                    name="username"
                    required
                    placeholder={"Enter username..."}
                    title={t("input-params.username")}
                    error={error}
                  />
                  <LabeledInput
                    name="email"
                    required
                    placeholder={"Enter email..."}
                    title={t("input-params.email")}
                    error={error}
                  />
                  <LabeledInput
                    name="password"
                    type="password"
                    required
                    placeholder={"Enter password..."}
                    title={t("input-params.password")}
                    error={error}
                  />
                  <LabeledInput
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder={"Confirm password..."}
                    title={t("input-params.confirm-password")}
                    error={error}
                  />
                  <div>
                    {error && (
                      <p className={"error-message"}>{t("error.signup")}</p>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    text={t("buttons.register")}
                    buttonType={ButtonType.FOLLOW}
                    size={"MEDIUM"}
                    disabled={isSubmitting}
                  />
                  <Button
                    text={t("buttons.login")}
                    buttonType={ButtonType.OUTLINED}
                    size={"MEDIUM"}
                    onClick={() => navigate("/sign-in")}
                    disabled={isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
