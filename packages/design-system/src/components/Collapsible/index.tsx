import React from 'react';

import { styled } from '../../themed-styled-components';
import { CheveronUpIcon } from '../Icons/CheveronUpIcon';
import { CheveronDownIcon } from '../Icons/CheveronDownIcon';
import { focusable } from '../../mixings/focusable';

const CollapsibleContext = React.createContext({
  isOpen: false,
  toggle: () => {},
});

type CollapsibleProps = {
  openByDefault?: boolean;
  className?: string;
  onToggle?: (isOpen: boolean) => void;
  sectionRef: React.RefObject<HTMLElement> | null | undefined;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  openByDefault = false,
  className,
  children,
  onToggle,
  sectionRef,
}) => {
  const [isOpen, setIsOpen] = React.useState(openByDefault);

  const toggle = () => {
    const newIsOpen = !isOpen;

    setIsOpen(newIsOpen);

    if (onToggle) {
      onToggle(newIsOpen);
    }
  };

  return (
    <CollapsibleContext.Provider
      value={{
        isOpen,
        toggle,
      }}
    >
      <section className={className} ref={sectionRef}>
        {children}
      </section>
    </CollapsibleContext.Provider>
  );
};

const ToggleButton = styled.button`
  all: inherit;

  ${focusable}

  cursor: pointer;

  &:focus {
    outline: 5px auto -webkit-focus-ring-color;
  }
`;

type CollapsibleToggleProps = {
  className?: string;
};

export const CollapsibleToggle: React.FC<CollapsibleToggleProps> = ({
  className,
  children,
}) => {
  const { isOpen, toggle } = React.useContext(CollapsibleContext);

  return (
    <ToggleButton className={className} aria-expanded={isOpen} onClick={toggle}>
      {isOpen ? (
        <CheveronUpIcon alginWithText />
      ) : (
        <CheveronDownIcon alginWithText />
      )}{' '}
      {children}
    </ToggleButton>
  );
};

type CollapsibleBodyProps = {
  className?: string;
};

export const CollapsibleBody: React.FC<CollapsibleBodyProps> = ({
  className,
  children,
}) => {
  const { isOpen } = React.useContext(CollapsibleContext);

  return (
    <div className={className} hidden={!isOpen}>
      {children}
    </div>
  );
};
