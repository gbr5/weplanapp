import React from 'react';
import theme from '../../../../../global/styles/theme';
import { useEventTasks } from '../../../../../hooks/eventTasks';

import {
  Container,
  MenuButton,
  MenuButtonText,
  MenuButtonIcon,
} from './styles';

export function TasksMenu(): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.menuShadow;
  const iconSize = 30;
  const { selectStatus, status } = useEventTasks();

  function handleSection(newSection: 'not started' | 'running' | 'finnished') {
    selectStatus(newSection);
  }

  return (
    <Container>
      <MenuButton
        style={status !== 'not started' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 5,
        }}
        isActive={status === 'not started'}
        stage="not started"
        onPress={() => handleSection('not started')}
      >
        <MenuButtonIcon
          size={iconSize}
          name="cloud"
          isActive={status === 'not started'}
          stage="not started"
        />
        <MenuButtonText
          isActive={status === 'not started'}
          stage="not started"
        >
          Início
        </MenuButtonText>
      </MenuButton>
      <MenuButton
        style={status !== 'running' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 5,
        }}
        isActive={status === 'running'}
        stage="running"
        onPress={() => handleSection('running')}
      >
        <MenuButtonIcon
          size={iconSize}
          name="zap"
          isActive={status === 'running'}
          stage="running"
        />
        <MenuButtonText
          isActive={status === 'running'}
          stage="running"
        >
          Execução
        </MenuButtonText>
      </MenuButton>
      <MenuButton
        style={status !== 'finnished' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 5,
        }}
        isActive={status === 'finnished'}
        stage="finnished"
        onPress={() => handleSection('finnished')}
      >
        <MenuButtonIcon
          size={iconSize}
          name="award"
          isActive={status === 'finnished'}
          stage="finnished"
        />
        <MenuButtonText
          isActive={status === 'finnished'}
          stage="finnished"
        >
          Fim
        </MenuButtonText>
      </MenuButton>
    </Container>
  );
}
