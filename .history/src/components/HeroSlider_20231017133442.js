import { Carousel } from 'react-bootstrap';
import "./HeroSlider.css";

const HeroSlider = () => {
    return (
        <Carousel>
            <Carousel.Item interval={4000}>
                <img
                    className="a-block"
                    src="../Images/1.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Why did the React developer get lost?</h3>
                    <p>They forgot to use the React Router.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <img
                    className="b-block"
                    src="./components/Images/3.webp"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>What do you call a React developer's favorite toy?</h3>
                    <p>React DevTools!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="c-block w-100"
                    src="./components/Images/4.webp"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>What do you call a React component that always follows the rules?</h3>
                    <p>A StrictMode component.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default HeroSlider;
