import { Link } from "react-router-dom";

function CourseContent() {
  return (
    <section className="course-content">
      <h2 className="course-title">You will learn</h2>

      <div className="course-grid">
        <div className="course-card card-1">
          <img src="/topics/warli history.png" alt="Warli History" />
          <h3>Warli Tradition and History</h3>
        </div>

        <div className="course-card card-2">
          <img src="/topics/shapes.jpeg" alt="Shapes" />
          <h3>Basic Shapes</h3>
        </div>

        <div className="course-card card-3">
          <img src="/topics/figure.png" alt="Figures" />
          <h3>Human Figures</h3>
        </div>

        <div className="course-card card-4">
          <img src="/topics/animals.png" alt="Animals" />
          <h3>Animals & Nature</h3>
        </div>

        <div className="course-card card-5">
          <img src="/topics/borders.png" alt="Borders" />
          <h3>Warli Borders</h3>
        </div>

        <div className="course-card card-8">
          <img src="/topics/artwork.jpg" alt="Artwork" />
          <h3>Final Artwork</h3>
        </div>
      </div>

      {/* REGISTER BUTTON */}

      <Link to="/register" className="hero-button">
        Register Now!!
      </Link>
    </section>
  );
}

export default CourseContent;
