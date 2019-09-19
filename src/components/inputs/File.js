import React from 'react';

const File = ({ placeholder, value, name = 'upload', onChange, accept }) => {
  return (
    <div className="input-file-wrapper">
      <label
        className={`${
          value.name ? 'with-file' : ''
        } w-100 cursor-pointer text-center align-items-center`}
      >
        <span className="upload-button h-100 bg-main text-white">Upload resume</span>
        <div className={`placeholder ${value.name ? 'with-file' : ''}`}>
          {value.name || placeholder}
        </div>
        <input
          className="inputfile"
          type="file"
          name={name}
          value={value && value.filename}
          accept={accept}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default File;
