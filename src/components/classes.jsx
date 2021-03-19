import React, {useState} from 'react';

const ClassesFilter = ({classes, filterChange, clearClassFilter}) => {
  const classList = classes.map(heroClass => {
    return (
      <option key={heroClass.id} value={heroClass.id}>
        {heroClass.name.en_US}
      </option>
    )
  })

  return (
    <div>
      <select        
        onChange={filterChange}
      >
        <option value={0}> all classes </option>
        {classList}
      </select>
      <button onClick={clearClassFilter}>
          remove filter
        </button>
    </div>
  );
};

export default ClassesFilter