"use client"
import DockClient from "@/components/dock/DockClient/page";
import ProtectedRoute from "@/components/protect/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <DockClient />

      <section className="px-4 pb-16 h-screen bg-slate-100 flex items-center">
        <div className="container mx-auto max-w-md">

          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Halo, <span className="text-primary">Admin</span>
            </h1>
            <p className="text-sm text-secondary">
              Selamat datang kembali.
            </p>
          </div>

          {/* Overview Card */}
          <div className="space-y-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-secondary">
                Total Ruangan
              </p>

              <h2 className="mt-2 text-4xl font-bold text-gray-900">
                2
              </h2>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-secondary">
                Total Ruangan Aktif
              </p>

              <h2 className="mt-2 text-4xl font-bold text-gray-900">
                1
              </h2>
            </div>
          </div>

        </div>
      </section>
    </ProtectedRoute>
  );
}