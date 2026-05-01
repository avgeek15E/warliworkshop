function Instructor() {
  return (
    <section className="instructor">
      <div className="instructor-content">
        {/* Left: Text */}
        <div className="instructor-text">
          <h2 className="instructor-title">Hi, I'm Sarika Badhe</h2>

          <div className="instructor-name">Your Course Instructor</div>

          <div className="instructor-desc-block">
            <p className="instructor-desc">
              Warli art ही एक life art form आहे जी आपल्याला आपल्या surroundings,
              stories आणि traditions express करायला मदत करते
            </p>
            <p className="instructor-desc">
              Hi, मी Sarika, Warli art educator आणि Rangdhara ची founder.
              Rangdhara हे एक space आहे जिथे creativity आणि tradition एकत्र
              येतात.
            </p>

            <p className="instructor-desc">
              माझ्या 3-Hours Warli Art Hobby Experience मधून मी beginners ना एक
              creative journey सुरू करायला मदत करते, तेही stress-free way मध्ये.
              माझं vision आहे की जास्तीत जास्त लोकांपर्यंत creativity पोहोचावी
              आणि traditional art मधून आनंद पुन्हा discover करावा.
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="instructor-image">
          <img src="/Instructor.jpeg" alt="Sarika Badhe - Warli Artist" />
        </div>
      </div>
    </section>
  );
}

export default Instructor;
