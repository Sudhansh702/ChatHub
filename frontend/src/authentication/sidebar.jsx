import vectorAuth from '../assets/vectorAuth.jpg';

export default function Sidebar() {
  return (
    <div className="flex-2/5  not-landscape:hidden">
      <div className="min-h-screen flex items-center justify-center p-4">
        <img src={vectorAuth} alt="Vector Image" />
      </div>
    </div>
  );
}