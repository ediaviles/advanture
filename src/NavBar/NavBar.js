import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faMessage } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css'

const icons = [
    { id: 1, icon: faSearch},
    { id: 2, icon: faHome},
    { id: 3, icon: faMessage},
  ];


export function NavBar({ navBarIcon, setNavBarIcon }) {
    return(
        <div className="navbar-container">
            <ul className="navbar-nav">
                {icons.map((icon) => (
                     <li key={icon.id} className={`nav-item ${navBarIcon === icon.id ? 'selected' : ''}`}>
                        <FontAwesomeIcon
                        icon={icon.icon}
                        onClick={() => setNavBarIcon(icon.id)}
                        />
                   </li>
                ))}
            </ul>
        </div>
    )
}