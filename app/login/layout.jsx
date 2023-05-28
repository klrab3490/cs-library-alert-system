import Provider from '@components/Provider';
import 'styles/login.modules.css';

const LoginLayout = ({ children }) => {
    return (
        <Provider>
            <section className='flex-center'>{children}</section>
        </Provider>
    )
};

export default LoginLayout;