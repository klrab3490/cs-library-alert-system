import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/global.css';

export const metadata = {
    title: "Library Alert System",
    description: "Discover & Share AI Prompts"
}

const Rootlayout = ({children}) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default Rootlayout;