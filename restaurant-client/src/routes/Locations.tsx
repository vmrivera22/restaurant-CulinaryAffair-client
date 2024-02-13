import "../css/Locations.css";

// Locations page.
const Locations = () => {
  return (
    <div className="locations--container border--1px container--width">
      <ul>
        <h1>Our Location:</h1>
        <h2>1234 Main St. Central City, California, U.S.A</h2>
        <h2>Hours:</h2>
        <li>Sun: 9AM - 10PM</li>
        <li>Mon-Thur: 9AM - 8PM</li>
        <li>Fri-Sat: 10AM - 11PM</li>
      </ul>

      <ul>
        <h1>Sister Locations:</h1>
        <h2>2345 River Rd. High City, New York, U.S.A</h2>
        <h2>Hours:</h2>
        <li>Sun: 9AM - 8PM</li>
        <li>Mon-Thur: 8AM - 8PM</li>
        <li>Fri-Sat: 10AM - 11PM</li>
      </ul>
      <ul>
        <h2>212 Hammer Ave. New City, New Mexico, U.S.A</h2>
        <h2>Hours:</h2>
        <li>Sun: 10AM - 8PM</li>
        <li>Mon-Thur: 10AM - 8PM</li>
        <li>Fri-Sat: 10AM - 11PM</li>
      </ul>
      <ul>
        <h2>8191 Church Ave. Maiami, Florida, U.S.A</h2>
        <h2>Hours:</h2>
        <li>Sun: 9AM - 9PM</li>
        <li>Mon-Thur: 8AM - 9PM</li>
        <li>Fri-Sat: 9AM - 11PM</li>
      </ul>
    </div>
  );
};

export default Locations;
