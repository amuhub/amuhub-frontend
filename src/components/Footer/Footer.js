import './Footer.css'

const Footer = () => {
  return (
    <div class="footer">
        <img src={require("./images/amuhub.png")} alt="" class="logo"/>
        <ul class="footer_soc_links">
            <li><a href="#" ><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="#" ><i class="fab fa-twitter"></i></a></li>
            <li><a href="#" ><i class="fab fa-instagram"></i></a></li> 
        </ul>
        <p class = "attribute">	&copy; AMUHUB | 2022 <span></span></p>
    </div>
  )
}

export default Footer
