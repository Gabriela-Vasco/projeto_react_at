import { Button } from '@mui/material';

const ButtonComponent = ({ children, ...props }) => {
  const { variant = "outlined", size = "large" } = props;

  return (
        <Button 
            className={`general-button ${props.className ? props.className : ""}`}
            variant={variant}
            size={size}
            {...props}
        >
            {children}
        </Button>
    )
}

export default ButtonComponent;