import {Home} from './Components/Home'
import './Page.css'

export function Page({navBarIcon}) {
    const loadPageContent = () => {
        switch (navBarIcon) {
            case 1:
                return <div>search</div>;
            case 2:
                return <Home/>;
            case 3:
                return <div>message</div>;
            default:
            // Optional: render a default component or null if no icon is selected
                return <div>default</div>;
        }
    }
    return (
    <div className='page-content'>
        {loadPageContent()}
    </div>
    )
}