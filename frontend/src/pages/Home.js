import React from 'react';
import './Home.css';
import MayankImage from "../images/Mayank.jpg";
const HomePage = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <h1 className="logo">Criminify</h1>
        <input type="checkbox" className="nav-toggle" id="nav-toggle" />
        <nav>
          <ul>
            <li><a href="#team-members">Team Members</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">SignUp</a></li>
          </ul>
        </nav>
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span>
        </label>
      </header>



      {/* Section One */}
      <section className="section-one">
        <h2 className="header">Heading</h2>
        <p className="section-one-paragraph">
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam numquam exercitationem iste dignissimos, incidunt ipsam, eos atque omnis labore aut repellat cumque distinctio? At laborum cupiditate fugit porro quia tempore.
        </p>
        <a href="" className="learn-more-btn">Learn More</a>
      </section>
{/* Team Members Section */}
<section id="team-members" className="team-members">
        <h2>Meet Our Team</h2>
        <div className="team-members-container">
          <div className="team-member-box">
            <img src={MayankImage}alt="Team Member 1" />
            <h3>Mayank Jaiswal</h3>
            <p>Roll No: 43</p>
          </div>
          <div className="team-member-box">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" />
            <h3>Ayam Bhardwaj</h3>
            <p>Roll No: 32</p>
          </div>
          <div className="team-member-box">
            <img src="https://via.placeholder.com/150" alt="Team Member 3" />
            <h3>Swayam Tambay</h3>
            <p>Roll no: 65</p>
          </div>
          <div className="team-member-box">
            <img src="https://via.placeholder.com/150" alt="Team Member 4" />
            <h3>Sujal Kothari</h3>
            <p>Roll no: 63</p>
          </div>
          <div className="team-member-box">
            <img src="https://via.placeholder.com/150" alt="Team Member 5" />
            <h3>Vedant Dharmadhikari</h3>
            <p>Roll No: 70</p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage;
