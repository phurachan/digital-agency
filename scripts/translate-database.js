/**
 * Script to translate Thai content to English in the database
 * Usage: node scripts/translate-database.js
 */

const translations = {
  // Service translations
  services: {
    '68e0ee413c3b9db261f3c5e0': {
      title: {
        en: 'Professional Video Production and Editing'
      },
      description: {
        en: 'Tell your story through professional video shooting and editing. Let us turn your ideas into reality. #Interviews #ShortClips - Contact us now!'
      }
    },
    '68e0e5fa85520fdf75440236': {
      title: {
        en: 'Special Celebration Documentation'
      },
      description: {
        en: 'Thank you for trusting us to document your special celebration. Wishing you happiness, love, and joy forever.'
      }
    },
    '68e0e5fa85520fdf75440237': {
      title: {
        en: 'Phatharavej Hospital Eye Spa Service Video'
      },
      description: {
        en: 'Short video introducing the eye spa service at Phatharavej Hospital by judhaijob.agency'
      }
    },
    '68e0ee413c3b9db261f3c5e2': {
      title: {
        en: 'Turning Vision into Reality'
      },
      description: {
        en: 'Tell your story through professional video shooting and editing. Let us turn your ideas into reality.'
      }
    }
  },

  // Team member translations
  teamMembers: {
    '68e072cac4de7d795e7bdcb9': {
      name: {
        en: 'Short Video'
      },
      position: {
        en: 'Shooting + Editing'
      }
    },
    '68e072cac4de7d795e7bdcba': {
      name: {
        en: 'Innovative Marketing'
      },
      position: {
        en: 'Brand Elevation'
      }
    },
    '68e072cac4de7d795e7bdcbb': {
      name: {
        en: 'Creative Content'
      },
      position: {
        en: 'Short Clips & Marketing Videos'
      }
    }
  }
};

async function login() {
  try {
    const response = await fetch('http://localhost:3000/api/digital-agency/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@moonoi.com',
        password: 'admin123'
      })
    });

    const result = await response.json();
    if (result.success && result.data.token) {
      return result.data.token;
    } else {
      throw new Error('Login failed: ' + result.message);
    }
  } catch (error) {
    throw new Error('Login error: ' + error.message);
  }
}

async function updateServices(token) {
  console.log('Updating Services...');

  for (const [id, data] of Object.entries(translations.services)) {
    try {
      const response = await fetch(`http://localhost:3000/api/digital-agency/cms/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        console.log(`✓ Updated service: ${id}`);
      } else {
        console.error(`✗ Failed to update service ${id}:`, result.message);
      }
    } catch (error) {
      console.error(`✗ Error updating service ${id}:`, error.message);
    }
  }
}

async function updateTeamMembers(token) {
  console.log('\nUpdating Team Members...');

  for (const [id, data] of Object.entries(translations.teamMembers)) {
    try {
      const response = await fetch(`http://localhost:3000/api/digital-agency/cms/team/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        console.log(`✓ Updated team member: ${id}`);
      } else {
        console.error(`✗ Failed to update team member ${id}:`, result.message);
      }
    } catch (error) {
      console.error(`✗ Error updating team member ${id}:`, error.message);
    }
  }
}

async function main() {
  console.log('='.repeat(50));
  console.log('Database Translation Script');
  console.log('='.repeat(50));
  console.log('');

  // Login first to get token
  console.log('Logging in...');
  const token = await login();
  console.log('✓ Login successful\n');

  await updateServices(token);
  await updateTeamMembers(token);

  console.log('');
  console.log('='.repeat(50));
  console.log('Translation Complete!');
  console.log('='.repeat(50));
}

main().catch(console.error);
