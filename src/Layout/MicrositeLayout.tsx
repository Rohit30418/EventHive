import Header from '../pages/Microsite/Header';
import Footer from '../pages/Microsite/Footer';
import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { apiPath } from '../../Utils/Utils';
import { useAppDispatch } from '../store/hooks';
import { addEventData } from '../slice/micrositeSlice';
import Preloader from '../common/Preloader';
import { useState } from 'react';
const MicrositeLayout = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchEventData() {
      try {
        const res = await axios.get(`${apiPath}/Events/${id}.json`);
        const data = res.data;
        dispatch(addEventData(data));
      }finally{
        setLoading(false);
      }
    }

    if (id) {
      fetchEventData();
    }
  }, [id, dispatch]);


  if (loading) return <Preloader />;
  

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MicrositeLayout;
