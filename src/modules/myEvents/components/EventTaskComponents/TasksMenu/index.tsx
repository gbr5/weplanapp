import React from 'react';

import {
  Container,
  MenuButton,
  MenuButtonText,
  MenuButtonIcon,
} from './styles';

interface IProps {
  selectSection: (e: string) => void;
  selectedSection: string;
}

export function TasksMenu({
  selectSection,
  selectedSection,
}: IProps): JSX.Element {
  const iconSize = 30;

  function handleSection(newSection: string) {
    selectSection(newSection);
  }

  return (
    <Container>
      <MenuButton
        isActive={selectedSection === 'not started'}
        stage="not started"
        onPress={() => handleSection('not started')}
      >
        <MenuButtonIcon
          size={iconSize}
          name="cloud"
          isActive={selectedSection === 'not started'}
          stage="not started"
        />
        <MenuButtonText
          isActive={selectedSection === 'not started'}
          stage="not started"
        >
          Início
        </MenuButtonText>
      </MenuButton>
      <MenuButton
        isActive={selectedSection === 'running'}
        stage="running"
        onPress={() => handleSection('running')}
      >
        <MenuButtonIcon
          size={iconSize}
          name="zap"
          isActive={selectedSection === 'running'}
          stage="running"
        />
        <MenuButtonText
          isActive={selectedSection === 'running'}
          stage="running"
        >
          Execução
        </MenuButtonText>
      </MenuButton>
      <MenuButton
        isActive={selectedSection === 'finnished'}
        stage="finnished"
        onPress={() => handleSection('finnished')}
      >
        <MenuButtonIcon
          size={iconSize}
          name="award"
          isActive={selectedSection === 'finnished'}
          stage="finnished"
        />
        <MenuButtonText
          isActive={selectedSection === 'finnished'}
          stage="finnished"
        >
          Fim
        </MenuButtonText>
      </MenuButton>
    </Container>
  );
}
