import Header from '../pages/Microsite/Header';
import Footer from '../pages/Microsite/Footer';
import { Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiPath } from '../../Utils/Utils';
import { useAppDispatch } from '../store/hooks';
import { addEventData } from '../slice/micrositeSlice';
import Preloader from '../common/Preloader';
import { ErrorState } from '../common/StateViews';

const MicrositeLayout = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let active = true;

    async function fetchEventData() {
      if (!id) {
        setError('Event link is missing or invalid.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${apiPath}/Events/${id}.json`);
        if (!res.data) throw new Error('This event could not be found.');
        if (active) dispatch(addEventData(res.data));
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Could not load event microsite.');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchEventData();
    return () => {
      active = false;
    };
  }, [id, dispatch]);

  if (loading) return <Preloader />;

  if (error) {
    return (
      <div className="eh-page flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <ErrorState title="Event page unavailable" description={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 overflow-x-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MicrositeLayout;
