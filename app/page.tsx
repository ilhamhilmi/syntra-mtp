"use client"
import DockClient from "@/components/dock/DockClient/page";
import ProtectedRoute from "@/components/protect/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <DockClient />

      <section className="px-4 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto max-w-md">

          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground font-inter">
              Halo, <span className="text-primary">Admin</span>
            </h1>
            <p className="text-sm text-secondary mt-1">
              Selamat datang kembali.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="space-y-5">
            <div className="clay-card-sm p-6">
              <p className="text-sm font-medium text-secondary">
                Total Ruangan
              </p>
              <h2 className="mt-2 text-4xl font-bold text-foreground">
                2
              </h2>
            </div>

            <div className="clay-card-sm p-6">
              <p className="text-sm font-medium text-secondary">
                Total Ruangan Aktif
              </p>
              <h2 className="mt-2 text-4xl font-bold text-foreground">
                1
              </h2>
            </div>
          </div>

        </div>
      </section>
    </ProtectedRoute>
  );
}