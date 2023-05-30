import Provider from '@components/Provider';
import '@styles/user.modules.css';

const AddusersLayout = ({ children }) => {
    return (
        <Provider>
            <section className='flex-center'>{children}</section>
        </Provider>
    )
};

export default AddusersLayout;