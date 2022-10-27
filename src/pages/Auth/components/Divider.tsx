// created by Artem
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type DividerProps = {
  children: ReactNode;
};
export const AuthDivider: FC<DividerProps> = ({ children }) => <Divider>{children}</Divider>;

const Divider = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 30px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 162%;
  color: #0E1D40;
  &:before, &:after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: #EBECF0;
  }
  
  &:before {
    margin-right: 30px;
  }
  
  &:after {
    margin-left: 30px;
  }
`;
