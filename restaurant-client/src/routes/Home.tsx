import { RecentOrders } from "@/components/RecentOrders";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/Home.css";
import tacoMan from "../assets/taco-man.png";
import burgerMan from "../assets/burger-man.png";

// Home Page.
const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div>
      <div className="home--recent">
        {isAuthenticated ? (
          <div className="recent--orders--container">
            <h1>Recent Orders</h1>
            <RecentOrders />
          </div>
        ) : (
          <div className="home--sign--up">
            <h1 onClick={() => loginWithRedirect()}>Sign Up</h1>
            <p>
              Savor the convenience! Sign up on our website to order your
              favorite dishes ahead of time. Skip the wait and enjoy a seamless
              dining experience. Join now for hassle-free and delicious meals!
            </p>
          </div>
        )}
      </div>
      <div className="home--chef--background--container background">
        <div className="home--chef--container white">
          <h1>Meet Your Chefs</h1>
          <div className="home--image--container">
            <img src={tacoMan} />
            <img src={burgerMan} />
          </div>
          <p>
            Introducing our culinary maestros: On the left, we have Jose Garcia,
            a world-renowned chef with a global culinary journey. Jose's
            expertise lies in the vibrant and flavorful realm of Mexican
            cuisine, a passion he cultivated from the tender age of 8. Having
            crafted delectable dishes for top restaurants worldwide, Jose brings
            an authentic touch to every plate, capturing the essence of his rich
            culinary heritage. On the right stands Christopher Mueller, a rising
            star in the culinary scene, celebrated among meat and burger
            enthusiasts. While he may not boast the longest culinary career,
            Christopher's innovative approach and unique flair infuse each dish
            with a delightful taste that appeals to lovers of hearty steaks and
            burgers. Together, Jose and Christopher form an unbeatable duo, each
            bringing their distinct expertise to elevate your dining experience
            to new heights.
          </p>
        </div>
      </div>
      <footer className="footer">
        <ul>
          <h1>Contact Us</h1>
          <li>(222) 222-2222</li>
          <li>email@email.com</li>
        </ul>
        <ul>
          <h1>About Us</h1>
          <li>All this is fake</li>
          <li>This is just an ex.</li>
        </ul>
        <ul>
          <h1>Careers</h1>
          <li>All we need is Jose</li>
          <li>And Christopher.</li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
