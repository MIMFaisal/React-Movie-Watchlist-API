import React from "react";

const SearchBox = (props) => {
  const handleChange = (e) => {
    props.setSearch(e.target.value)
  }
  return (
    <div className="col col-sm-4">
      <input className="form-control" onChange={handleChange} placeholder="Search Movies... (example: Harry Potter)"></input>
    </div>
  );
};

export default SearchBox;
