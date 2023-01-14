import React from 'react';
import styled from 'styled-components';
interface Props {
  type: string;
  placeholder: string;
  name: string;
}
const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 10px auto;
`;
const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <StyledInput
    type={props.type}
    placeholder={props.placeholder || ''}
    name={props.name || ''}
    ref={ref}
  />
));

export default Input;
