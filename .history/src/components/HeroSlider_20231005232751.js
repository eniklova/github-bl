import {Carousel} from 'react-bootstrap'
import "./HeroSlider.css"

const HeroSlider = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item interval={5000}>
                    <img
                        className="a-block"
                        src="https://www.hostinger.com/blog/wp-content/uploads/sites/4/2023/06/Choosing-the-Best-Backup-Solution-Restic-vs.-Borg--1024x596.webp"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Why did the React developer get lost?</h3>
                        <p>They forgot to use the React Router.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                        className="b-block"
                        src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/06/Website-Development-alt-1.webp"
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
                        src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/08/how-to-make-an-online-portfolio.webp"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>What do you call a React component that always follows the rules?</h3>
                        <p>A StrictMode component.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
            </Carousel>
        </>
    )
}

export default HeroSlider