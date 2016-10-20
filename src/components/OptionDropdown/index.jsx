// const log = require('debug')('dag-history-component:OptionDropdown');
import React, { PropTypes } from 'react';
import { MdMoreVert } from 'react-icons/lib/md';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import './OptionDropdown.scss';

export default class OptionDropdown extends React.Component {
  render() {
    const {
      label,
      icon,
      options,
      triggerClass,
      contentClass,
    } = this.props;
    let result = null;
    if (options.length === 0) {
      result = label ? (
        <div className={`dropdown-label-only ${triggerClass}`}>
          {label}
        </div>
      ) : <div />;
    } else {
      const triggerLabel = label ? <div className="label">{label}</div> : null;
      let triggerIcon = icon;
      if (!triggerIcon && !label) {
        triggerIcon = (<MdMoreVert size={24} style={{ margin: 4 }} />);
      }
      if (triggerIcon) {
        triggerIcon = (
          <div className="dropown-icon-wrapper">
            {triggerIcon}
          </div>
        );
      }

      const optionClicked = (onClick) => {
        onClick();
        this.dropdown.hide();
      };

      result = (
        <Dropdown ref={e => (this.dropdown = e)}>
          <DropdownTrigger className={`history-dropdown-trigger ${triggerClass}`} onClick={() => this.dropdown.show()}>
            <div style={{ display: 'flex', flexDirection: 'row' }} onClick={() => this.setState({ show: true })}>
              {triggerLabel}
              {triggerIcon}
            </div>
          </DropdownTrigger>
          <DropdownContent className={`history-dropdown-content ${contentClass}`}>
            <ul>
              {
                options.map(({ element: optionElement, label: optionLabel, onClick }, index) => (
                  <li key={`option:${index}`} onClick={() => optionClicked(onClick)}>
                    {optionElement || optionLabel}
                  </li>
                ))
              }
            </ul>
          </DropdownContent>
        </Dropdown>
      );
    }
    return result;
  }
}

OptionDropdown.propTypes = {
  trigger: PropTypes.element,
  label: PropTypes.string,
  icon: PropTypes.element,
  triggerClass: PropTypes.string,
  contentClass: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
};
