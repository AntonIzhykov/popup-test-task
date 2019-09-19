import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable/dist/react-select.esm';

class Select extends Component {
  render() {
    const { className, options, onChange } = this.props;

    const selectStyles = {
      input: () => ({ padding: 8 }),
      placeholder: () => ({ color: '#c5c5c5' })
    };

    return (
      <CreatableSelect
        className={className}
        placeholder="Сhoose your city"
        isClearable
        onChange={onChange}
        options={options}
        styles={selectStyles}
      />
    );
  }
}

export default Select;
