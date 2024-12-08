import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

const TextFieldComponent = (props) => {
  const { variant = "outlined" } = props;

  return <TextField
            className={`general-textfield ${props.className ? props.className : ""}`}
            variant={variant}
            {...props} />
}

export default TextFieldComponent;