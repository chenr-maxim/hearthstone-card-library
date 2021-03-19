import React from 'react';

const Cardsets = ({cardSets, handleSelectChange}) => {
  const setList = cardSets.map(set => {
    return (
      <option value={set.slug} key={set.id}>
        {set.name}
      </option>
    )
  });

  return (
    <div>
      <select
        onChange={handleSelectChange}
      >
        {setList}
      </select>
    </div>
  );
};

export default Cardsets;