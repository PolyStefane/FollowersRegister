
import React from "react";
import Slider from "react-slick";

interface ImageSliderProps {
  images: string[];
  onSelectImage: (image: string) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, onSelectImage }) => {
  return (
    <Slider
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={3}
      slidesToScroll={1}
      centerMode={true}
      focusOnSelect={true}
      className="image-slider"
    >
      {images.map((image, index) => (
        <div key={index} className="slider-item">
          <img
            src={image}
            alt={`Follower ${index}`}
            onClick={() => onSelectImage(image)}
            className="slider-image"
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
