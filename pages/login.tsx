import { FormatUI, LoginFooter, LoginForm } from "@/app/components";

const LoginPage = () => {
    return (
        <FormatUI
            src="/images/login_background.jpg"
            title="Đăng nhập"
            body={<LoginForm />}
            footer={<LoginFooter />}
        />
    );
};

export default LoginPage
