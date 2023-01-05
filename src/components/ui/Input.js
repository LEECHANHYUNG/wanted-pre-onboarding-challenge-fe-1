import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 10px auto;
`;
const Input = React.forwardRef((props, ref) => (
  <StyledInput
    type={props.type}
    placeholder={props.placeholder || ''}
    name={props.name || ''}
    defaultValue={props.defaultValue || ''}
    ref={ref}
  />
));

export default Input;
