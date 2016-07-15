import React, { PropTypes } from 'react';
import { MdMoreVert } from 'react-icons/lib/md';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
require('./OptionDropdown.sass');

const OptionDropdown = ({ label, options, contentStyle }) => {
  let result = null;
  if (options.length === 0) {
    result = label ? (<div className="dropdown-label-only">{label}</div>) : null;
  } else {
    const trigger = label ?
      <div className="label">{label}</div> :
      <div className="dropown-icon-wrapper">
        <MdMoreVert size={24} style={{ margin: 4 }} />
      </div>;

    result = (
      <Dropdown>
        <DropdownTrigger>
          {trigger}
        </DropdownTrigger>
        <DropdownContent style={contentStyle || {}}>
          <ul>
          {
            options.map(({ label: optionLabel, onClick }, index) => (
              <li key={`option:${index}`} onClick={onClick}>{optionLabel}</li>
            ))
          }
          </ul>
        </DropdownContent>
      </Dropdown>
    );
  }
  return result;
};
OptionDropdown.propTypes = {
  label: PropTypes.string,
  contentStyle: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
};

export default OptionDropdown;