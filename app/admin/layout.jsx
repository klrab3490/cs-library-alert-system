import Provider from '@components/Provider';
import 'styles/styles.modules.css';


const AdminLayout = ({ children }) => {
    return (
        <Provider>
            <section className='app'>{children}</section>
        </Provider>
    )
};

export default AdminLayout;