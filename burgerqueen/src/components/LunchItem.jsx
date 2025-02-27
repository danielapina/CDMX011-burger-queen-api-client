/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

const LunchItem = ({ item, addItem, removeItem }) => {
  const { name, price } = item;

  return (
    <div>
      <ul>
        <li className="item-name">{name}</li>
        <li className="item-price">$ {price}</li>
        <button
          type="button"
          onClick={() => {
            removeItem(item);
          }}
        >
          <Icon
            icon="akar-icons:circle-minus-fill"
            color="#f2c744"
            height="30"
          />
        </button>
        <button
          type="button"
          onClick={() => {
            addItem(item);
          }}
        >
          <Icon
            icon="akar-icons:circle-plus-fill"
            color="#f2884b"
            height="30"
          />
        </button>
      </ul>
    </div>
  );
};

export default LunchItem;
