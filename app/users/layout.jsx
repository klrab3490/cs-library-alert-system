import Provider from '@components/Provider';
import 'styles/styles.modules.css';
import UserNav from '@components/UserNav';

const UserLayout = ({ children }) => {
    return (
        <Provider>
            <UserNav />
            <section className=''>{children}</section>
        </Provider>
    )
};

export default UserLayout;