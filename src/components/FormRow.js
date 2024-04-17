import React from 'react'

const FormRow = ({ type, name, text, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        className='form-input'
        onChange={handleChange}
        name={name}
      />
    </div>
  )
}

export default FormRow
