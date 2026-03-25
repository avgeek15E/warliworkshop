import { Link } from "react-router-dom";

function CourseContent() {
  return (
    <section className="course-content">
      <h2 className="course-title">You will learn</h2>

      <div className="course-grid">
        <div className="course-card card-1">
          <img src="/topics/warli history.png" alt="Warli History" />
          <h3>Warli Tradition</h3>
          <p className="course-desc">
            Explore the rich culture and lifestyle of Maharashtra through the
            ancient roots of Warli art.
          </p>
        </div>

        <div className="course-card card-2">
          <img src="/topics/shapes.jpeg" alt="Shapes" />
          <h3>Warli Basics</h3>
          <p className="course-desc">
            Understand basic shapes like circle, triangle, and lines and gain
            perfect control in Warli art.
          </p>
        </div>

        <div className="course-card card-3">
          <img src="/topics/figure.png" alt="Figures" />
          <h3> Warli Figures & Nature</h3>
          <p className="course-desc">
            Bring your art to life with human figures, animals, houses, and
            nature elements that tell beautiful tribal stories.
          </p>
        </div>

        <div className="course-card card-4">
          <img src="/topics/borders.jpeg" alt="Animals" />
          <h3>Warli Borders</h3>
          <p className="course-desc">
            Learn to create elegant borders that frame your artwork and give
            every scene a complete and attractive look.
          </p>
        </div>

        <div className="course-card card-5">
          <img src="/topics/artwork.jpeg" alt="Borders" />
          <h3>Warli Final Artwork</h3>
          <p className="course-desc">
            Use traditional brush strokes and textures to create a stunning
            Warli artwork that tells your unique story.
          </p>
        </div>

        <div className="course-card card-8">
          <img src="/topics/artwork.jpeg" alt="Artwork" />
          <h3>Final Artwork</h3>
          <p className="course-desc">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>

      <Link to="/register" className="hero-button">
        Register Now!!
      </Link>
    </section>
  );
}

export default CourseContent;
