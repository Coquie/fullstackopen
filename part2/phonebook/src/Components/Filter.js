import React from "react";

const Filter = props => {
  return (
    <>
      filter: <input onChange={props.handleFilterChange} value={props.filter} />
    </>
  );
};

export default Filter;
