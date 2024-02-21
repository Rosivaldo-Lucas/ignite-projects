import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  variant: ButtonVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 4px;
  margin: 0.5rem;
  color: #fff;

  ${props => css`background-color: ${props.theme['green-500']}`}
`;
