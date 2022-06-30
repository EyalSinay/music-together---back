import Navbar from '../navbar/Navbar';
import Welcome from '../welcome/welcome';
import ConInfo from '../continentInfo/ConInfo';
import { useState, useEffect } from 'react';
import staticInfo from './home_data';
import { getContinent, getCountry } from '../../axios';
import Contry from '../contry/contry';

const Home = () => {
  const [lang, setLang] = useState('he');
  const [dataToDisplay, setDdataToDisplay] = useState(staticInfo.he);
  const [route, setRoute] = useState({
    type: 'welcome',
    region: undefined,
    contry: undefined,
  });
  const [isSpinner, setIsSpinner] = useState(false);

  const setContinant = (continant) => {
    setRoute({ type: 'continant', region: continant });
  };

  const setContry = (contry) => {
    setRoute({ type: 'contry', contry: contry });
  };

  const fetchContryData = async () => {
    try {
      setIsSpinner(true);
      const data = await getCountry(route.region, route.Contry, lang);
      setDdataToDisplay(data);
    } catch (e) {
      console.warn(e);
      //todo - error massage to user
    }
    setIsSpinner(false);
  };

  const fetchContinantData = async () => {
    try {
      setIsSpinner(true);
      const data = await getContinent(route.region, lang);
      setDdataToDisplay(data);
    } catch (e) {
      console.warn(e);
      //todo - error massage to user
    }
    setIsSpinner(false);
  };

  useEffect(() => {
    switch (route.type) {
      case 'continant':
        fetchContinantData();
      case 'contry':
        fetchContryData();
        break;
      default: //* === case: "welcome"
        setDdataToDisplay(staticInfo[lang]);
    }
  }, [lang, route]);

  if (isSpinner) return <Spinner />;

  return (
    <div>
      <Navbar lang={lang} setContinant={setContinant} setLang={setLang} />
      {route.type === 'welcome' && <Welcome data={dataToDisplay} lang={lang} />}
      {route.type === 'continant' && (
        <ConInfo data={dataToDisplay} setContry={setContry} />
      )}
      {route.type === 'contry' && <Contry data={dataToDisplay} />}
    </div>
  );
};

export default Home;

const Spinner = () => {
  return <h1>Loading...</h1>;
};
