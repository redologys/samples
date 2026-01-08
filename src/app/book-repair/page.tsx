import { BookingWizard } from "@/components/booking/BookingWizard";

export default function BookRepairPage() {
  return (
    <main className="min-h-screen bg-neutral-50 pb-20">
      {/* Header for the booking flow is handled by the main layout, 
          but usually booking flows might want a cleaner header. 
          For now we inherit the main header. */}
      
      <div className="container-custom pt-8 md:pt-16">
        <div className="max-w-4xl mx-auto">
          <BookingWizard />
        </div>
      </div>
    </main>
  );
}
