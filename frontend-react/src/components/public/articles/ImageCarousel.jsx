import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function ImageCarousel({arrImg}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  function loadImg(){

    return arrImg.map( img=>
        <Carousel.Item>
            <img className='d-block w-100 img-fluid' src={img.image}/>
        </Carousel.Item>
    )
  }

  return (
    <Carousel className='w-25' activeIndex={index} onSelect={handleSelect}>
      {loadImg()}
    </Carousel>
  );
}