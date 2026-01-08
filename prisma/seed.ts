import { PrismaClient, DeviceType, IssueType, UserRole, BookingStatus, PaymentStatus, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Create Default Admin User
  const adminEmail = 'admin@mobileexperts.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        role: UserRole.ADMIN,
        // In production, use a hashed password
        password: 'securepassword123',
        emailVerified: new Date(),
      },
    });
    console.log('👤 Created admin user');
  }

  // 2. Business Settings
  const settings = await prisma.businessSettings.findFirst();
  if (!settings) {
    await prisma.businessSettings.create({
      data: {
        name: 'Mobile Experts',
        phone: '(929) 789-2786',
        email: 'info@mobileexpertsbrooklyn.com',
        address: '1134 Liberty Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipCode: '11208',
        taxRate: 0.08875, // NY Sales Tax
        isAcceptingBookings: true,
      },
    });
    console.log('⚙️ Created business settings');
  }

  // 3. Services (Sample Data)
  const services = [
    {
      name: 'Screen Replacement',
      slug: 'screen-replacement',
      description: 'Replace cracked or broken screens with OEM-quality parts.',
      price: 89.99,
      duration: 30, // minutes
      deviceType: DeviceType.PHONE,
      issueType: IssueType.SCREEN,
      features: ['Gorilla Glass', 'True Tone Restoration', 'Lifetime Warranty'],
    },
    {
      name: 'Battery Replacement',
      slug: 'battery-replacement',
      description: 'Restore your device\'s battery life to 100%.',
      price: 49.99,
      duration: 20,
      deviceType: DeviceType.PHONE,
      issueType: IssueType.BATTERY,
      features: ['High Capacity Cells', 'Zero Cycle Count', '1 Year Warranty'],
    },
    {
      name: 'Water Damage Repair',
      slug: 'water-damage',
      description: 'Professional ultrasonic cleaning and diagnostic.',
      price: 59.99,
      duration: 120,
      deviceType: DeviceType.PHONE,
      issueType: IssueType.WATER_DAMAGE,
      features: ['Ultrasonic Cleaning', 'Board Level Repair', 'No Fix No Fee'],
    },
    {
      name: 'Charging Port Repair',
      slug: 'charging-port',
      description: 'Fix loose or broken charging ports.',
      price: 39.99,
      duration: 30,
      deviceType: DeviceType.PHONE,
      issueType: IssueType.CHARGING,
      features: ['Premium Parts', 'Fast Charging Support'],
    },
  ];

  for (const service of services) {
    const existing = await prisma.service.findUnique({ where: { slug: service.slug } });
    if (!existing) {
      await prisma.service.create({ data: service });
    }
  }
  console.log('🔧 Created services');

  // 4. Products (Accessories)
  const products = [
    {
      name: 'Ultra-Clear Screen Protector',
      slug: 'screen-protector-glass',
      description: '9H Hardness tempered glass screen protector.',
      price: 15.00,
      category: 'Screen Protectors',
      inventory: 100,
      images: ['/products/screen-protector.jpg'],
    },
    {
      name: 'Heavy Duty Shockproof Case',
      slug: 'shockproof-case-iphone',
      description: 'Military-grade drop protection for your iPhone.',
      price: 25.00,
      category: 'Cases',
      inventory: 50,
      images: ['/products/case-shockproof.jpg'],
    },
    {
      name: 'Fast Charger (20W USB-C)',
      slug: 'fast-charger-20w',
      description: 'High-speed charging adapter.',
      price: 19.99,
      category: 'Chargers',
      inventory: 30,
      images: ['/products/charger-20w.jpg'],
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (!existing) {
      await prisma.product.create({ data: product });
    }
  }
  console.log('🛍️ Created products');

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
