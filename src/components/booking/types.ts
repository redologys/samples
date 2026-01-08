export type BookingData = {
  deviceType: 'iphone' | 'samsung' | 'android' | 'tablet' | null;
  deviceModel: string;
  issueType: string;
  estimatedPrice: number;
  date: Date | null;
  timeSlot: string | null;
  contact: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };
};

export type StepProps = {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
};
