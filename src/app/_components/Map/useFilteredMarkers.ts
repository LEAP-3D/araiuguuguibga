'use client';

import { useMemo } from 'react';
import { mockVets } from '@/app/_components/HeroSection/mockVets';
import { usePosts } from '@/lib/postsContext';

type SelectedDistance = '1km' | '3km' | '5km';

function getDistance([lat1, lon1]: [number, number], [lat2, lon2]: [number, number]) {
  const R = 6371e3;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const φ1 = toRad(lat1),
    φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1),
    Δλ = toRad(lon2 - lon1);
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getRadius(selectedDistance: SelectedDistance) {
  if (selectedDistance === '1km') return 1000;
  if (selectedDistance === '3km') return 3000;
  return 5000;
}

export function useFilteredMarkers(userLocation: [number, number] | null, selectedDistance: SelectedDistance) {
  const { posts } = usePosts();
  const filteredVets = useMemo(() => {
    if (!userLocation) return mockVets;
    const radius = getRadius(selectedDistance);
    return mockVets.filter((vet) => getDistance(userLocation, [vet.lat, vet.lng]) <= radius);
  }, [userLocation, selectedDistance]);

  const filteredPosts = useMemo(() => {
    const radius = userLocation ? getRadius(selectedDistance) : null;

    return posts.filter((post) => {
      if (!post.location) return false;
      const [lat, lng] = post.location.split(',').map(Number);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
      if (!userLocation || radius === null) return true;
      return getDistance(userLocation, [lat, lng]) <= radius;
    });
  }, [userLocation, selectedDistance, posts]);

  return { filteredVets, filteredPosts };
}
