import Provider from "@components/Provider";
import '@styles/user.modules.css';

const IdLayout = ({children}) => {
    return (
        <Provider>
            <section className='flex-center'>{children}</section>
        </Provider>
    )
};

export default IdLayout;