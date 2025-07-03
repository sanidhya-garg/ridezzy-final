
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

type CarouselProps = {
  images: string[];
};

export const Carousel = ({ images }: CarouselProps) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
  });

  return (
    <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden">
      {images.map((src, i) => (
        <div className="keen-slider__slide" key={i}>
          <img src={src} alt={`slide-${i}`} className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
};
