import Provider from '@components/Provider';
import 'styles/styles.modules.css';
import AdminNav from '@components/AdminNav';

const AdminLayout = ({ children }) => {
    return (
        <Provider>
            <AdminNav />
            <section className='app'>{children}</section>
        </Provider>
    )
};

export default AdminLayout;