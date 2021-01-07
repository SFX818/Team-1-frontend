import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/auth.service";
import axios from "axios";
import authHeader from "../utilities/authHeader.utilities";
import { Card, CardDeck, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Particles from "react-particles-js";
import { ParticlesOptions } from "./ParticleOptions.js";



const Home = () => {


  const currentUser = getCurrentUser();


  const [quotes, setQuotes] = useState([]);
  const [news, setNews] = useState([])


  useEffect(() => {
    quoteGrabber();
    newsGrabber()
  }, []);


  const quoteGrabber = () => {
    const quoteData = axios
      .get("https://type.fit/api/quotes", { headers: authHeader() })
      .then((quoteData) => setQuotes([quoteData.data[getRandomInt()]]));
    // .catch(err => console.log(err.message))
  } 
  
  const newsGrabber = () => {
    axios.get('https://newsapi.org/v2/top-headlines?q=technology&apiKey=1d9ca5b13652436b801f9572b8878b27')
    .then (response =>{
      setNews(response.data.articles)
    })
  }



//GENERATE A NEW QUOTE 
  function getRandomInt(min, max) {
    min = Math.ceil(1);
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


  const newQuote = () =>{
    if (quotes.length > 0 ) {
      return (
      <div> 
        <p> "{quotes[0].text}" </p> 
      <p id="author"> by {quotes[0].author} </p> 
      </div>
      )}
  }

  // create num generator that and put that inside the data array
  

  return <div id="bigboy">
    <div id="home"> 
    {/* <Particles
        className="particles particles-box"
        params={ParticlesOptions}
      /> */}
    <h3 id="userHome">
      <strong> Welcome {currentUser.username} </strong>
    </h3>
    <Particles
        className="particles particles-box"
        params={ParticlesOptions}
      />
  <br></br>
   <h5> {newQuote()}</h5>
   </div>
   <br></br>
   <br></br>
   <h1>Take a look at the latest in Tech News:</h1>
   <br></br>
   <Container>
     
  <CardDeck className="newsDeck">
    <Row sm={4} md={4} xl={4} lg={4}>
  {news.slice(-3).map((article) =>(
  <Col sm={4} md={4} xl={4} lg={4}>
    <Card className="newsCard"> 
    <Card.Img className="newsImg" variant="top" src={article.urlToImage} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{article.author}</Card.Subtitle>
          <a href={article.url} target='_blank' rel="noreferrer">
          <Button className="glow-on-hover" variant="info">See Article</Button>
          </a>
      </Card.Body>
    </Card>
    </Col>
  ))}
  </Row>
  </CardDeck>
  </Container>
  <br></br>
  </div>;
};

export default Home;







