import Provider from '@components/Provider';
import '@styles/user.modules.css';

const RegisterLayout = ({ children }) => {
    return (
        <Provider>
            <section className='flex-center'>{children}</section>
        </Provider>
    )
};

export default RegisterLayout;