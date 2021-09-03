import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../redux/action/addComment';

export const AddComment = ({userId, featureId, click, setClick}) => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
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
      <button onClick={() => {
        dispatch(createComment(userId, featureId, value));
        setValue('');
        setTimeout(()=> {
          setClick(!click)
        }, 0)
      }}
      disabled={value === ''}
      className="btn btn-primary mt-4">
        Add Comment
      </button>
    </div>
  )
}