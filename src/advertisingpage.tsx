import Navbar from './Navbar';
import AdvertisementPage from './advertising';
import Calculator from './components/Calculator';
import Footer from './components/Footer';
import OwnershipCalculator from './components/Rent2owncalculator';

function advertisingpage() {
  return (
    <div>
        <Navbar />;
        <AdvertisementPage />;
        <Calculator />
        <OwnershipCalculator />
        <Footer />;

    </div>
  )
}

export default advertisingpage;