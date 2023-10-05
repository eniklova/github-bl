import {Carousel} from 'react-bootstrap'

const HeroSlider = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/02/build-website-with-chatgpt-2.webp"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Why did the React developer get lost?</h3>
                        <p>They forgot to use the React Router.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://topdev4u.com/wp-content/uploads/2023/06/how-to-remove-version-from-css-and-js-in-wordpress.jpg.webp"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>What do you call a React developer's favorite toy?</h3>
                        <p>React DevTools!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.hostinger.de/tutorials/wp-content/uploads/sites/23/2023/09/Website-Development-alt-1.webp"
                        src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/09/website-color-schemes.webp"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>What do you call a React component that always follows the rules?</h3>
                        <p>A StrictMode component.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.hostinger.de/tutorials/wp-content/uploads/sites/23/2023/09/Website-Development-alt-1.webp"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Fourth slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HeroSlider