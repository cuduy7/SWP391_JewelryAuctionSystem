import { FormatUI, RegisterFooter, RegisterForm } from "@/app/components";

const RegisterPage = () => {
    return (
        <FormatUI
            src="/images/login_background.jpg"
            title="Đăng ký"
            body={<RegisterForm />}
            footer={<RegisterFooter />}
        />
    );
};

export default RegisterPage