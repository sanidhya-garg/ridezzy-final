import Navbar from './Navbar';
import AdvertisementPage from './advertising';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

function advertisingpage() {
  return (
    <div>
        <Navbar />;
        <AdvertisementPage />;
        <Calculator />
        <Footer />;

    </div>
  )
}

export default advertisingpage;