type Props = {
  selectedType: 'all' | 'lost' | 'vets';
  selectedDistance: '1km' | '3km' | '5km';
};

export default function ListView({ selectedType, selectedDistance }: Props) {
  return (
    <div className="w-220 bg-white rounded-2xl p-4">
      <p className="font-bold">List View</p>
      <p>Type: {selectedType}</p>
      <p>Distance: {selectedDistance}</p>

      {/* later you map your data here */}
    </div>
  );
}
