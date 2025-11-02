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

    return {
      message: 'AI prediction temporarily unavailable',
      severity: 'low',
      icon: 'general',
      confidence: 0
    };
  }
}
