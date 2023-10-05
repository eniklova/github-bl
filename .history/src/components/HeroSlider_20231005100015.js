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
                        <h3>This is the first slide!</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://topdev4u.com/wp-content/uploads/2023/06/how-to-remove-version-from-css-and-js-in-wordpress.jpg.webp"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images.pexels.com/photos/1480687/pexels-photo-1480687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images.pexels.com/photos/1480689/pexels-photo-1480689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
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