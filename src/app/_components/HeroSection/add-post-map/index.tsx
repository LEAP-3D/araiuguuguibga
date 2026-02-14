'use client';

import Map from './Map';

type Props = {
  setLocation: (loc: string) => void;
};

export default function AddPostMap({ setLocation }: Props) {
  return <Map setLocation={setLocation} />;
}
