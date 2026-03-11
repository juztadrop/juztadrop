import { useEffect, useState } from 'react';

export function useVolunteerDetails(id: string) {
  const [volunteer, setVolunteer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVolunteer = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/volunteers/${id}`);
        if (!res.ok) throw new Error('Volunteer not found');
        const data = await res.json();
        setVolunteer(data);
      } catch (err: any) {
        setError(err.message ?? 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVolunteer();
  }, [id]);

  return { volunteer, isLoading, error };
}
