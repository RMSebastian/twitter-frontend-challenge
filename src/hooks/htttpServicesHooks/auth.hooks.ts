import { SingInData, SingUpData } from "../../service";
import { postData } from "../../service/HttpRequestService";
import { login_endpoint, signup_endpoint } from "../../endpoints";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/toast/ToastProvider";
import { ToastType } from "../../components/toast/Toast";

type TokenProps = {
  token: string;
};

export const useSignup = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  return useMutation<TokenProps, Error, Partial<SingUpData>>({
    mutationKey: ["useSignup"],
    mutationFn: (data: Partial<SingUpData>): Promise<TokenProps> =>
      postData<Partial<SingUpData>, TokenProps>(signup_endpoint, data),
    onSuccess: (response) => {
      localStorage.setItem("token", `Bearer ${response.token}`);
      addToast({
        message: "Account created successfully",
        type: ToastType.SUCCESS,
      });
      navigate("/");
    },
    onError: (error) => {
      addToast({ message: "Error creating account", type: ToastType.ALERT });
      console.error("Signup error:", error);
    },
  });
};
export const useLogin = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  return useMutation<TokenProps, Error, SingInData>({
    mutationKey: ["useLogin"],
    mutationFn: (data: SingInData): Promise<TokenProps> =>
      postData<SingInData, TokenProps>(login_endpoint, data),
    onSuccess: (response) => {
      addToast({
        message: "Account entered successfully",
        type: ToastType.SUCCESS,
      });
      localStorage.setItem("token", `Bearer ${response.token}`);
      navigate("/");
    },
    onError: (error) => {
      addToast({ message: "Error accessing account", type: ToastType.ALERT });
      console.error("Signin error:", error);
    },
  });
};
