import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { useLogin } from "../../../hooks/htttpServicesHooks/auth.hooks";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  Email: Yup.string().email("Invalid email address").required("Required"),
  Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[^A-Za-z0-9]/, "Password must contain a special character")
    .required("Required"),
});
const SignInPage = () => {
  const { mutate: signIn, isError: signInError } = useLogin();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSubmit = (
    value: { Email: string; Password: string },
    actions: FormikHelpers<{
      Email: string;
      Password: string;
    }>
  ) => {
    try {
      signIn({ email: value.Email, password: value.Password });
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
            <img src={logo} alt={"Twitter Logo"} />
            <StyledH3>{t("title.login")}</StyledH3>
          </div>
          <Formik
            initialValues={{
              Email: "",
              Password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(value, actions) => {
              handleSubmit(value, actions);
            }}
          >
            {({ isSubmitting }: any) => (
              <Form>
                <div className={"input-container"}>
                  <LabeledInput
                    name="Email"
                    required
                    placeholder={t("placeholder.email")}
                    title={t("input-params.email")}
                    type="text"
                  />
                  <LabeledInput
                    name="Password"
                    type="password"
                    required
                    placeholder={t("placeholder.password")}
                    title={t("input-params.password")}
                  />
                  <div>
                    {signInError && (
                      <p className={"error-message"}>{t("error.login")}</p>
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
                    text={t("buttons.login")}
                    buttonType={ButtonType.FOLLOW}
                    size={"MEDIUM"}
                    disabled={isSubmitting}
                  />
                  <Button
                    text={t("buttons.register")}
                    buttonType={ButtonType.OUTLINED}
                    size={"MEDIUM"}
                    onClick={() => navigate("/sign-up")}
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

export default SignInPage;
