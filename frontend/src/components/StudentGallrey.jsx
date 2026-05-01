import { useState } from "react";

function StudentGallery() {
  const [paused, setPaused] = useState(false);

  const paintings = [
    "/students/1.png",
    "/students/2.png",
    "/students/3.png",
    "/students/4.png",
    "/students/5.png",
  ];

  /* duplicate images for infinite effect */
  const infinitePaintings = [...paintings, ...paintings];

  return (
    <section className="student-gallery">
      <h2 className="gallery-title">Students' Artwork</h2>

      <div
        className="gallery-wrapper"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={`gallery-track ${paused ? "paused" : ""}`}>
          {infinitePaintings.map((img, index) => (
            <div className="gallery-card" key={index}>
              <img src={img} alt="Student artwork" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudentGallery;
