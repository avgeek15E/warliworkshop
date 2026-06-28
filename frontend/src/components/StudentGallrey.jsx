import { useState } from "react";

function StudentGallery() {
  const [paused, setPaused] = useState(false);

  const paintings = [
    "/students/1.webp",
    "/students/2.webp",
    "/students/3.webp",
    "/students/4.webp",
    "/students/5.webp"
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
