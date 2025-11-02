export interface Prediction {
  message: string;
  severity: 'high' | 'medium' | 'low';
  icon: 'traffic' | 'lift' | 'parking' | 'general';
  confidence: number;
}

export async function predictNextHour(): Promise<Prediction> {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  const isWeekend = day === 0 || day === 6;

  if (isWeekend) {
    return {
      message: 'Weekend - Minimal campus activity expected',
      severity: 'low',
      icon: 'general',
      confidence: 0.90
    };
  }

  if (hour >= 7 && hour <= 9) {
    return {
      message: 'Morning rush hour - parking and lifts will be very busy',
      severity: 'high',
      icon: 'parking',
      confidence: 0.92
    };
  }

  if (hour >= 11 && hour <= 14) {
    return {
      message: 'Peak lunch period - canteen extremely crowded, long queues expected',
      severity: 'high',
      icon: 'general',
      confidence: 0.90
    };
  }

  if (hour >= 17 && hour <= 19) {
    return {
      message: 'Evening rush - heavy traffic leaving campus, parking clearing out',
      severity: 'high',
      icon: 'traffic',
      confidence: 0.88
    };
  }

  if (hour >= 10 && hour <= 10) {
    return {
      message: 'Mid-morning - moderate activity, classes in session',
      severity: 'medium',
      icon: 'general',
      confidence: 0.80
    };
  }

  if (hour >= 15 && hour <= 16) {
    return {
      message: 'Afternoon classes - steady campus activity',
      severity: 'medium',
      icon: 'general',
      confidence: 0.82
    };
  }

  if (hour >= 20 || hour <= 6) {
    return {
      message: 'Late evening/Early morning - minimal activity, campus mostly quiet',
      severity: 'low',
      icon: 'general',
      confidence: 0.95
    };
  }

  return {
    message: 'Normal campus activity expected',
    severity: 'low',
    icon: 'general',
    confidence: 0.75
  };
}
