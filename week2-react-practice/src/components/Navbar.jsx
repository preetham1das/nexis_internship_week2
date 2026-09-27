import {Link} from "react-router-dom";
import styles from "../styles/Navbar.module.css";
function Navbar(){
    return (
        <nav className={styles.navbar}>
            <h2>Product Task Manager</h2>
            <div>
                <Link to ="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/about">About</Link>

            </div>

        </nav>
    );
}
export default Navbar;