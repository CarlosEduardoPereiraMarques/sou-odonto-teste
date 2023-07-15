import React, { useState } from 'react';

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
        <button onClick={toggleList}>Toggle List</button>
        {showList && (
          <ul>
            {buylists.map((item) => (
              <li key={item.id} onClick={() => handleItemClick(item)}>
                {item.name}
              </li>
            ))}
            <li key="create-list" onClick={() => handleItemClick(true)}>
              Criar nova lista de compras
            </li>
          </ul>
        )}
      </div>
    );
  };
  
  export default ToggleList;
  