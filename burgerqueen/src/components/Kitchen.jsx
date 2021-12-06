/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase/firebaseConfig';
import { helpHttp } from '../helpers/helpHttp';
import KitchenOrder from './KitchenOrder';
import Header from './Header';
import Logo from '../assets/upper-icon.png';
import './styles/Kitchen.scss';

const Kitchen = () => {
  const [kitchenOrder, setKitchenOrder] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [today, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const navigate = useNavigate();

  const api = helpHttp();
  const urlK = 'http://localhost:5000/kitchen';

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    }
  });

  useEffect(() => {
    const endpoint = `${urlK}?status=pending`;
    api.get(endpoint).then((res) => {
      if (!res.err) {
        setKitchenOrder(res);
      } else {
        setKitchenOrder(res.err);
      }
    });
  }, []);

  const updateData = (data) => {
    const endpoint = `${urlK}/${data.id}`;
    const options = {
      body: { status: 'done', salida: time.toLocaleTimeString() },
      headers: { 'Content-Type': 'application/json' }
    };
    api.patch(endpoint, options).then((res) => {
      if (res.err) {
        console.log(res.statusText);
      }
    });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeOrder = (item) => {
    const select = kitchenOrder.filter((x) => x.id !== item.id);
    setKitchenOrder(select);
  };

  const difference = (timeStart, timeEnd) => {
    const timeStartNumber = timeStart.toLocaleNumber('es-MX');
    const resultInMinutes = Math.round(
      (timeEnd.getTime() - timeStartNumber.getTime()) / 60000
    );
    alert(`La orden quedo lista en ${resultInMinutes} minutos`);
  };

  return (
    <div className="kitchen-content">
      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
        today={today}
        setDate={setDate}
        time={time}
        setTime={setTime}
      />
      <div className="kitchen-titles">
        <img src={Logo} alt="Logo" className="logo-kitchen" />
        <h1>Órdenes en cocina</h1>
      </div>
      <div>
        <KitchenOrder
          kitchenOrder={kitchenOrder}
          updateData={updateData}
          removeOrder={removeOrder}
          difference={difference}
          time={time}
        />
        <div />
      </div>
    </div>
  );
};
export default Kitchen;
