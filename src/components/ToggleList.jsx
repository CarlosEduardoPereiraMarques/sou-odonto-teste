import React, { useState } from "react";
import styles from "@/app/styles/components/ToggleList.module.css";

const ToggleList = ({ buylists, onItemClick }) => {
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList(!showList);
  };

  const handleItemClick = (item) => {
    onItemClick(item);
  };

  return (
    <div>
      <button onClick={toggleList} className={styles.button}>
        A qual lista deseja adicionar?
      </button>
      {showList && (
        <ul>
          {buylists.map((item) => (
            <li
              key={item._id}
              onClick={() => handleItemClick(item)}
              className={styles.li}
            >
              {item.name}
            </li>
          ))}
          <li onClick={() => handleItemClick(true)} className={styles.li}>
            Criar nova lista de compras
          </li>
        </ul>
      )}
    </div>
  );
};

export default ToggleList;
