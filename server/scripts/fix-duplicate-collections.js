/**
 * Fix Duplicate Collections Migration Script
 *
 * This script fixes duplicate collections in MongoDB that differ only in case
 * Example: Services vs services, Users vs users
 *
 * It will:
 * 1. List all collections
 * 2. Identify duplicates (case-insensitive)
 * 3. Merge data from uppercase to lowercase collections
 * 4. Drop the uppercase collections
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env file')
  process.exit(1)
}

// Define the correct collection names (lowercase, plural as per Mongoose default)
const CORRECT_COLLECTIONS = {
  'User': 'users',
  'Users': 'users',
  'Service': 'services',
  'Services': 'services',
  'Role': 'roles',
  'Roles': 'roles',
  'Permission': 'permissions',
  'Permissions': 'permissions',
  'FAQ': 'faqs',
  'FAQs': 'faqs',
  'TeamMember': 'teammembers',
  'TeamMembers': 'teammembers',
  'HomeContent': 'homecontents',
  'homeContent': 'homecontents',
  'homecontent': 'homecontents',
  'AboutContent': 'aboutcontents',
  'aboutContent': 'aboutcontents',
  'aboutcontent': 'aboutcontents',
  'ContactContent': 'contactcontents',
  'contactContent': 'contactcontents',
  'contactcontent': 'contactcontents',
  'ServicesContent': 'servicescontents',
  'servicesContent': 'servicescontents',
  'TeamContent': 'teamcontents',
  'teamContent': 'teamcontents',
  'SiteSettings': 'sitesettings',
  'siteSettings': 'sitesettings'
}

async function fixDuplicateCollections() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await mongoose.connect(MONGO_URI)
    console.log('✅ Connected to MongoDB\n')

    const db = mongoose.connection.db

    // Get all collections
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(c => c.name)

    console.log('📋 Current collections:')
    collectionNames.forEach(name => console.log(`   - ${name}`))
    console.log('')

    // Find duplicates
    const duplicates = new Map()
    collectionNames.forEach(name => {
      const lowerName = name.toLowerCase()
      if (!duplicates.has(lowerName)) {
        duplicates.set(lowerName, [])
      }
      duplicates.get(lowerName).push(name)
    })

    // Process each collection and move to correct name
    for (const name of collectionNames) {
      // Find the correct collection name for this collection
      const correctName = CORRECT_COLLECTIONS[name] || name.toLowerCase()

      if (name !== correctName) {
        console.log(`\n⚠️  Found misnamed collection: "${name}" → should be "${correctName}"`)

        const wrongCollection = db.collection(name)
        const correctCollection = db.collection(correctName)
        const docs = await wrongCollection.find({}).toArray()

        if (docs.length > 0) {
          console.log(`   📦 Moving ${docs.length} documents from "${name}" to "${correctName}"`)

          // Insert documents (skip if _id already exists)
          let moved = 0
          for (const doc of docs) {
            try {
              await correctCollection.insertOne(doc)
              moved++
            } catch (error) {
              if (error.code === 11000) {
                console.log(`   ⚠️  Skipping duplicate document: ${doc._id}`)
              } else {
                throw error
              }
            }
          }

          // Drop the wrong collection
          await wrongCollection.drop()
          console.log(`   🗑️  Dropped collection "${name}"`)

          if (moved > 0) {
            console.log(`   ✅ Successfully moved ${moved} documents`)
          }
        } else {
          // Just drop empty collection
          await wrongCollection.drop()
          console.log(`   🗑️  Dropped empty collection "${name}"`)
        }
      }
    }

    // Final collection list
    const finalCollections = await db.listCollections().toArray()
    console.log('\n\n📋 Final collections:')
    finalCollections.forEach(c => console.log(`   - ${c.name}`))

    console.log('\n✅ Migration completed successfully!')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    console.log('\n👋 Disconnected from MongoDB')
    process.exit(0)
  }
}

// Run the migration
fixDuplicateCollections()
