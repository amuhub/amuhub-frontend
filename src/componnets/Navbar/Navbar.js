import './Navbar.css'
import Button from '../Button/Button'

const navOpen = ()=>{
    const navLinks = document.querySelector('.nav-links-list-a');
    navLinks.classList.toggle('active');
}

const navClose = ()=>{
    const navLinks = document.querySelector('.nav-links-list-a');
    navLinks.classList.remove('active');
}


const Navbar = () => {
    const haveAccount = true;
  return (
    <nav className="fixed-nav">
        <h1 className="nav_logo">amu<span>hub</span></h1>
        {
        haveAccount ?
            (
                <>
                    <div className="nav-links-list-a">
                        <div className='mobile-style-wrapper'>
                        <i className="fa fa-times" aria-hidden="true" onClick={navClose}></i>
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><a href="">Feed</a></li>
                                <li><a href="">Questions</a></li>
                            </ul>
                        </div>
                        <div className="search-div">
                            <input type="text" className="input" placeholder="Search"/>
                            <i className="fa fa-search" aria-hidden="true" ></i>
                        </div>
                    </div>
                    <div className="nav-links-list-b">
                        <Button text = 'Ask Question'/>
                        <div className="profile-div"> 
                            <div className="profile-img"></div>
                            <p className="username">Hasan Faraz</p>
                        </div>
                    </div>
                    
                </>
            ) : 
            (
                <>
                    <div className = "nav-links-list-a">
                        <div className='mobile-style-wrapper'>
                        <i className="fa fa-times" aria-hidden="true" onClick={navClose}></i>
                            <ul>
                                <li><a href="#home">home</a></li>
                                <li><a href="#about-us">about</a></li>
                                <li><a href="#contact">contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <ul className="nav-links-list-b">
                        <li><a href="">Signin</a></li>
                        <li><Button text = 'Sign up'/></li>
                    </ul>
                    
                </>
            )
        }
        <label for="check" onClick = {navOpen} className = 'burger_btn'>
            {/* <input type="checkbox" id="check"/>  */}
            <span></span>
            <span></span>
            <span></span>
        </label>
    </nav>
  )
}

export default Navbar