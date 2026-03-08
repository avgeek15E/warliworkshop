import { useEffect, useRef, useState } from "react";

function StudentGallery() {
  const sliderRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const paintings = [
    "/students/1.png",
    "/students/2.png",
    "/students/3.png",
    "/students/4.png",
    "/students/5.png",
  ];

  /* duplicate images for infinite loop */
  const infinitePaintings = [...paintings, ...paintings];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scroll = () => {
      if (paused) return;

      slider.scrollLeft += 1;

      /* reset when halfway */
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }
    };

    const interval = setInterval(scroll, 20);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="student-gallery">
      <h2 className="gallery-title">Students' Artwork</h2>

      <div
        className="gallery-slider"
        ref={sliderRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {infinitePaintings.map((img, index) => (
          <div className="gallery-card" key={index}>
            <img src={img} alt="Student artwork" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default StudentGallery;

