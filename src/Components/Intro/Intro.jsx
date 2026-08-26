import React from 'react'
import './Intro.css'

const Intro = () => {
  return (
    <div className="intro">
      <div className="intro-left">
        <div className="i-l-text">
          <span className="i-hello">Hello!</span>
          <span>I am</span>
          <span>Ganesh Raaj S S</span>
          <span>Software Engineer</span>
          <span className="i-desc">
            2+ years in full-stack development with C#, .NET, Python, React.js &amp; Azure
          </span>
        </div>
        <div className="btn-intro">
          <a href="mailto:ssganeshraaj@gmail.com">
            <button className="button-i-btntalk">Lets Connect!</button>
          </a>
          <a href="https://github.com/ganeshraaj" target="_blank" rel="noreferrer">
            <button className="button-i-btnproject">Projects</button>
          </a>
        </div>
      </div>

      <div className="intro-right">
        <div className="blobs">
          <svg className="pic2-svg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#d83536"
              d="M855.5,633.5Q868,767,760,868Q652,969,544,832Q436,695,271.5,740.5Q107,786,105,643Q103,500,235.5,452Q368,404,364.5,237.5Q361,71,505,56.5Q649,42,729.5,158.5Q810,275,826.5,387.5Q843,500,855.5,633.5Z"
            />
          </svg>
          <svg className="pic1-svg" viewBox="0 200 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="shape">
                <path d="M751,694Q724,888,567.5,771.5Q411,655,247.5,577.5Q84,500,236.5,404Q389,308,521.5,271Q654,234,716,367Q778,500,751,694Z" />
              </clipPath>
            </defs>
            <g clipPath="url(#shape)">
              <path
                fill="#8773ee"
                d="M751,694Q724,888,567.5,771.5Q411,655,247.5,577.5Q84,500,236.5,404Q389,308,521.5,271Q654,234,716,367Q778,500,751,694Z"
              />
            </g>
          </svg>
        </div>
        <div className="i-r-text">
          <span>“It's through mistakes that you actually can grow. You have to get bad in order to get good.”</span>
          <span>-PAULA SCHER</span>
        </div>
      </div>
    </div>
  )
}

export default Intro
