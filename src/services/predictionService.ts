export interface Prediction {
  message: string;
  severity: 'high' | 'medium' | 'low';
  icon: 'traffic' | 'lift' | 'parking' | 'general';
  confidence: number;
}

export async function predictNextHour(): Promise<Prediction> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://0ec90b57d6e95fcbda19832f.supabase.co';
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw';

    const apiUrl = `${supabaseUrl}/functions/v1/predict-next-hour`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Prediction API error: ${response.statusText}`);
    }

    const prediction = await response.json();

    return {
      message: prediction.message || 'Unable to generate prediction',
      severity: prediction.severity || 'low',
      icon: prediction.icon || 'general',
      confidence: prediction.confidence || 0.5
    };
  } catch (error) {
    console.error('Prediction error:', error);

    const hour = new Date().getHours();
    const predictions = [
      { time: [7, 8, 9], message: 'Morning rush expected - parking and lifts will be busy', severity: 'high' as const, icon: 'parking' as const },
      { time: [12, 13], message: 'Lunch hour approaching - canteen will be crowded', severity: 'medium' as const, icon: 'general' as const },
      { time: [17, 18], message: 'Evening peak - expect heavy traffic leaving campus', severity: 'high' as const, icon: 'traffic' as const },
      { time: [10, 11, 14, 15, 16], message: 'Normal campus activity expected', severity: 'low' as const, icon: 'general' as const },
    ];

    const currentPrediction = predictions.find(p => p.time.includes(hour)) || predictions[predictions.length - 1];

    return {
      message: currentPrediction.message,
      severity: currentPrediction.severity,
      icon: currentPrediction.icon,
      confidence: 0.6
    };
  }
}
