import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create categories
  const sareesCategory = await prisma.category.upsert({
    where: { slug: 'sarees' },
    update: {},
    create: {
      name: 'Sarees',
      slug: 'sarees',
      description: 'Elegant traditional sarees for every occasion',
      order: 1,
    },
  })

  const lehengasCategory = await prisma.category.upsert({
    where: { slug: 'lehengas' },
    update: {},
    create: {
      name: 'Lehengas',
      slug: 'lehengas',
      description: 'Stunning lehengas for special celebrations',
      order: 2,
    },
  })

  const kurtasCategory = await prisma.category.upsert({
    where: { slug: 'kurtas-sets' },
    update: {},
    create: {
      name: 'Kurtas & Sets',
      slug: 'kurtas-sets',
      description: 'Comfortable and stylish kurtas and sets',
      order: 3,
    },
  })

  const dupattasCategory = await prisma.category.upsert({
    where: { slug: 'dupattas-shawls' },
    update: {},
    create: {
      name: 'Dupattas & Shawls',
      slug: 'dupattas-shawls',
      description: 'Beautiful dupattas and shawls to complete your look',
      order: 4,
    },
  })

  // Create subcategories
  const silkSubcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: sareesCategory.id, slug: 'silk' } },
    update: {},
    create: {
      name: 'Silk',
      slug: 'silk',
      description: 'Luxurious silk sarees',
      categoryId: sareesCategory.id,
      order: 1,
    },
  })

  const cottonSubcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: sareesCategory.id, slug: 'cotton' } },
    update: {},
    create: {
      name: 'Cotton',
      slug: 'cotton',
      description: 'Comfortable cotton sarees',
      categoryId: sareesCategory.id,
      order: 2,
    },
  })

  const bridalSubcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: lehengasCategory.id, slug: 'bridal' } },
    update: {},
    create: {
      name: 'Bridal',
      slug: 'bridal',
      description: 'Exquisite bridal lehengas',
      categoryId: lehengasCategory.id,
      order: 1,
    },
  })

  const partySubcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: lehengasCategory.id, slug: 'party' } },
    update: {},
    create: {
      name: 'Party',
      slug: 'party',
      description: 'Stylish party lehengas',
      categoryId: lehengasCategory.id,
      order: 2,
    },
  })

  // Create admin user
  const adminPassword = await hashPassword('admin123')
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@pushkaraexpressions.com' },
    update: {},
    create: {
      email: 'admin@pushkaraexpressions.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      verified: true,
    },
  })

  // Create sample products
  const products = [
    {
      name: 'Elegant Silk Saree',
      description: 'Beautiful traditional silk saree with intricate embroidery work. Perfect for weddings and special occasions.',
      price: 25000,
      images: JSON.stringify(['/images/products/silk-saree-1.jpg', '/images/products/silk-saree-2.jpg']),
      colors: JSON.stringify(['#dc2626', '#7c2d12', '#fbbf24']),
      sizes: JSON.stringify(['Free Size']),
      categoryId: sareesCategory.id,
      subcategoryId: silkSubcategory.id,
      featured: true,
      available: true,
      stock: 5,
      sku: 'SAR-SIL-001',
      tags: JSON.stringify(['silk', 'traditional', 'wedding', 'embroidery']),
    },
    {
      name: 'Cotton Comfort Saree',
      description: 'Lightweight and comfortable cotton saree ideal for daily wear and casual occasions.',
      price: 3500,
      images: JSON.stringify(['/images/products/cotton-saree-1.jpg', '/images/products/cotton-saree-2.jpg']),
      colors: JSON.stringify(['#16a34a', '#2563eb', '#ec4899']),
      sizes: JSON.stringify(['Free Size']),
      categoryId: sareesCategory.id,
      subcategoryId: cottonSubcategory.id,
      featured: false,
      available: true,
      stock: 10,
      sku: 'SAR-COT-001',
      tags: JSON.stringify(['cotton', 'comfortable', 'daily wear', 'casual']),
    },
    {
      name: 'Royal Bridal Lehenga',
      description: 'Stunning bridal lehenga with heavy embroidery and sequin work. A perfect choice for your special day.',
      price: 75000,
      images: JSON.stringify(['/images/products/bridal-lehenga-1.jpg', '/images/products/bridal-lehenga-2.jpg']),
      colors: JSON.stringify(['#dc2626', '#fbbf24', '#9333ea']),
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      categoryId: lehengasCategory.id,
      subcategoryId: bridalSubcategory.id,
      featured: true,
      available: true,
      stock: 3,
      sku: 'LEH-BRI-001',
      tags: JSON.stringify(['bridal', 'heavy embroidery', 'sequin', 'wedding']),
    },
    {
      name: 'Party Wear Lehenga',
      description: 'Trendy party lehenga with modern design and comfortable fit. Perfect for celebrations and parties.',
      price: 15000,
      images: JSON.stringify(['/images/products/party-lehenga-1.jpg', '/images/products/party-lehenga-2.jpg']),
      colors: JSON.stringify(['#ec4899', '#2563eb', '#16a34a']),
      sizes: JSON.stringify(['S', 'M', 'L']),
      categoryId: lehengasCategory.id,
      subcategoryId: partySubcategory.id,
      featured: false,
      available: true,
      stock: 8,
      sku: 'LEH-PAR-001',
      tags: JSON.stringify(['party', 'modern', 'trendy', 'celebration']),
    },
    {
      name: 'Designer Kurta Set',
      description: 'Elegant kurta set with matching dupatta. Comfortable and stylish for any occasion.',
      price: 4500,
      images: JSON.stringify(['/images/products/kurta-set-1.jpg', '/images/products/kurta-set-2.jpg']),
      colors: JSON.stringify(['#16a34a', '#2563eb', '#dc2626']),
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      categoryId: kurtasCategory.id,
      subcategoryId: null,
      featured: false,
      available: true,
      stock: 12,
      sku: 'KUR-SET-001',
      tags: JSON.stringify(['kurta', 'set', 'comfortable', 'stylish']),
    },
    {
      name: 'Embroidered Dupatta',
      description: 'Beautiful embroidered dupatta to complement your outfit. Available in various colors.',
      price: 1200,
      images: JSON.stringify(['/images/products/dupatta-1.jpg', '/images/products/dupatta-2.jpg']),
      colors: JSON.stringify(['#dc2626', '#2563eb', '#16a34a', '#fbbf24']),
      sizes: JSON.stringify(['Free Size']),
      categoryId: dupattasCategory.id,
      subcategoryId: null,
      featured: false,
      available: true,
      stock: 20,
      sku: 'DUP-EMB-001',
      tags: JSON.stringify(['dupatta', 'embroidered', 'accessory', 'colorful']),
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    })
  }

  // Create site settings
  const settings = [
    { key: 'site_name', value: 'Pushkara Expressions', description: 'Site name' },
    { key: 'site_description', value: 'Your trusted boutique for authentic Indian wear', description: 'Site description' },
    { key: 'contact_email', value: 'info@pushkaraexpressions.com', description: 'Contact email' },
    { key: 'contact_phone', value: '+91 98765 43210', description: 'Contact phone' },
    { key: 'address', value: '123 Fashion Street, Mumbai, Maharashtra 400001', description: 'Store address' },
  ]

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
