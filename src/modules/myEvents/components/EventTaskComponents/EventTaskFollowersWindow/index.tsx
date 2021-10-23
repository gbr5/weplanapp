import React from 'react';
import { SectionHeader } from '../../../../../components/SectionHeader';
import WindowContainer from '../../../../../components/WindowContainer';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { EventTaskFollower } from '../EventTaskFollower';

import {
  Container,
} from './styles';

export function EventTaskFollowersWindow() {
  const { selectedEventTask } = useEventVariables();
  const {
    handleCreateEventTaskFollowersWindow,
    handleEventTaskFollowersWindow,
    handleEventTaskFollowersDescriptionWindow,
  } = useEventTasks();

  return (
    <WindowContainer
      closeWindow={handleEventTaskFollowersWindow}
      zIndex={9}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <SectionHeader
          title="Seguidores"
          handleAddButton={handleCreateEventTaskFollowersWindow}
          handleInfoButton={handleEventTaskFollowersDescriptionWindow}
        />
        {selectedEventTask.task.followers.map(follower => {
            return (
              <EventTaskFollower
                key={follower.id}
                user={follower}
              />
            );
          })}
      </Container>
    </WindowContainer>
  );
}
