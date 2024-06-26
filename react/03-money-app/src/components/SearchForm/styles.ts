import { styled } from 'styled-components';

export const SearchFormContainer = styled.form`
    display: flex;
    gap: 1rem;

    input {
        flex: 1;
        border-radius: 6px;
        border: 0;
        background-color: ${props => props.theme['gray-900']};
        color: ${props => props.theme['gray-300']};
        padding: 1rem;

        &::placeholder {
            color: ${props => props.theme['gray-500']};
        };
    }

    button {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border: 1px solid ${props => props.theme['green-300']};
        padding: 1rem;
        background-color: transparent;
        color: ${props => props.theme['green-300']};
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;

        &:not(:disabled):hover {
            background-color: ${props => props.theme['green-500']};
            color: ${props => props.theme.white};
            border-color: ${props => props.theme['green-500']};
            transition: background-color 0.2s, color 0.2s, border-color 0.2s;
        };

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }
`;
