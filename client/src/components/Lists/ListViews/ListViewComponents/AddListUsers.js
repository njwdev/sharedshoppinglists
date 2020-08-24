import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const AddListUsers = ({ onChange, options, getOptionLabel, renderOption }) => {
  return (
    <AutoComplete
      multiple
      id='search users'
      options={options}
      getOptionLabel={getOptionLabel}
      forcePopupIcon={false}
      noOptionsText='No users found'
      onChange={onChange}
      clearOnBlur
      clearOnEscape
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          id='sharedWith'
          name='sharedWith'
          label='Share your list with... (optional)'
        />
      )}
    />
  );
};

AddListUsers.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  renderOption: PropTypes.func.isRequired,
};

export default AddListUsers;
