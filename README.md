# Digital Agency

เอเจนซี่ดิจิทัลมาร์เก็ตติ้งที่ครบวงจร มุ่งเน้นในการสร้างแบรนด์และพัฒนาธุรกิจออนไลน์

## คุณสมบัติหลัก

- 🌐 **เว็บไซต์ดีไซน์** - ออกแบบและพัฒนาเว็บไซต์ที่โดดเด่นและตอบสนองความต้องการ
- 📱 **โซเชียลมีเดีย** - จัดการและสร้างการมีส่วนร่วมบนโซเชียลมีเดีย
- 🎯 **ดิจิทัลแคมเปญ** - พัฒนาแคมเปญดิจิทัลมาร์เก็ตติ้งและกลยุทธ์เนื้อหาของแบรนด์

## เทคโนโลยี

- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **Backend**: Nuxt Server API
- **Database**: MongoDB
- **Authentication**: JWT
- **i18n**: Multi-language support (Thai/English)

## การติดตั้ง

```bash
# Clone repository
git clone <repository-url>
cd digital-agency

# Install dependencies
yarn install

# Copy environment file
cp .env.example .env

# Start development server
yarn dev
```

## การใช้งาน

1. เข้าไปที่ `http://localhost:3000`
2. สำหรับ Admin Panel: `/digital-agency/admin`
3. Login: `/digital-agency/login`

## โครงสร้างโปรเจกต์

```
digital-agency/
├── components/          # Vue components
├── pages/              # Route pages
├── server/api/         # API endpoints
├── stores/            # Pinia stores
├── middleware/        # Route middleware
├── composables/       # Composable functions
├── locales/          # i18n translations
└── public/           # Static assets
```

## การพัฒนา

- `yarn dev` - เริ่ม development server
- `yarn build` - build สำหรับ production
- `yarn preview` - preview production build

## License

© 2024 Digital Agency. สงวนลิขสิทธิ์.