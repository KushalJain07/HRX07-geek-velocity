import React from 'react';

export interface QuestDetailScreenProps {
  videoUrl?: string;
  onStartQuiz?: () => void;
}

declare const QuestDetailScreen: React.FC<QuestDetailScreenProps>;
export default QuestDetailScreen; 