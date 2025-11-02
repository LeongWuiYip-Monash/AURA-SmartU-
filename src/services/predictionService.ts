export interface Prediction {
  message: string;
  severity: 'high' | 'medium' | 'low';
  icon: 'traffic' | 'lift' | 'parking' | 'general';
  confidence: number;
}

export async function predictNextHour(): Promise<Prediction> {
  const hour = new Date().getHours();
  const predictions = [
    { time: [7, 8, 9], message: 'Morning rush expected - parking and lifts will be busy', severity: 'high' as const, icon: 'parking' as const },
    { time: [12, 13], message: 'Lunch hour approaching - canteen will be crowded', severity: 'medium' as const, icon: 'general' as const },
    { time: [17, 18], message: 'Evening peak - expect heavy traffic leaving campus', severity: 'high' as const, icon: 'traffic' as const },
    { time: [10, 11, 14, 15, 16], message: 'Normal campus activity expected', severity: 'low' as const, icon: 'general' as const },
  ];

  const currentPrediction = predictions.find(p => p.time.includes(hour)) || predictions[predictions.length - 1];

  console.log('AI Prediction generated:', currentPrediction);

  return {
    message: currentPrediction.message,
    severity: currentPrediction.severity,
    icon: currentPrediction.icon,
    confidence: 0.85
  };
}
