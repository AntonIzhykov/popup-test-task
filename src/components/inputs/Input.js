import React from 'react';

const Input = ({ placeholder, value, className, onChange, name, type = 'text', ...optionals }) => {
  return (
    <div className={className ? className : ''}>
      <input
        className={className}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
