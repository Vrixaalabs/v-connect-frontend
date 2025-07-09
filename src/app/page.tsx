import { SettingsForm } from '@/components/Settings/SettingsForm';
import './settings.css'; // 👈 link the custom CSS


export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-left text-blue-800">Settings</h1>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <SettingsForm />
        </div>
      </div>
    </main>
  );
}
