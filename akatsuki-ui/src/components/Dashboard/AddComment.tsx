import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const AddComment = () => {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => {console.log(value)
    setValue(event.target.value);
  };
  return (
    <div className="my-5">
      <TextField
        fullWidth
        id="outlined-multiline-static"
        label="Comment"
        multiline
        rows={4}
        variant="outlined"
        value={value}
        onChange={handleChange}
      />
      <button onClick={() => console.log('clicked')} className="btn btn-primary mt-4">Add Comment</button>
    </div>
  )
}