# Mind Forge - Платформа для навчання та менторства

## Опис проекту
Mind Forge - це інноваційна платформа, яка з'єднує учнів з кваліфікованими менторами (репетиторами) для покращення знань у різних галузях. Платформа спрямована на зробити освіту більш доступною та ефективною через персоналізоване навчання.

## Технічний стек
- **Backend**: 
  - TypeScript + Express.js
  - Prisma ORM для типобезпеки та роботи з базою даних
  - Supabase для автентифікації та чат-функціоналу
- **База даних**: PostgreSQL (через Supabase)
- **Деплой**: Supabase


## Функціональність

### Ролі користувачів
1. **Студент**
   - Базова інформація (ім'я, прізвище, email, аватар)
   - Профіль з контактною інформацією
   - Можливість створювати замовлення на навчання
   - Перегляд та оцінювання репетиторів
   - Система чатів для комунікації з репетиторами
   - Історія замовлень та відгуків

2. **Репетитор**
   - Розширений профіль з додатковою інформацією
   - Освіта (навчальні заклади, спеціальності, ступені)
   - Досвід роботи
   - Список предметів для викладання з цінами
   - Можливість приймати замовлення
   - Система відгуків та рейтингів
   - Календар занять

### Основні функції

#### Система замовлень
- Створення замовлень на навчання
- Вибір категорії (разове/повторюване)
- Вказання кількості сесій
- Встановлення дедлайнів
- Статуси замовлень (активне, в процесі, завершене)
- Можливість зміни репетитора
- Можливість розірвати замовлення, таким чином лишивши невиконаним або ж знайти заміну

#### Система сесій
- Планування онлайн-зустрічей
- Відстеження статусу сесій


#### Система комунікації
- Вбудований чат між студентом та репетитором
- Real-time повідомлення через Supabase
- Система сповіщень (Опціонально, вимагає окремий мікросервіс)

#### Система оцінювання
- Відгуки про репетиторів
- Рейтингова система
- Коментарі до відгуків

### База даних
Проект використовує PostgreSQL з наступними основними сутностями:
- Users (користувачі)
- Profiles (профілі)
- TutorEducation (освіта репетиторів)
- TutorExperience (досвід репетиторів)
- Subjects (предмети)
- Categories (категорії замовлень)
- Orders (замовлення)
- Sessions (навчальні сесії)
- Reviews (відгуки)
- Chats (чати)
- Messages (повідомлення)

### Детальний опис схеми Prisma

#### Моделі та їх зв'язки

```prisma
enum UserRole {
  STUDENT
  TUTOR
}

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  firstName     String
  lastName      String
  avatarUrl     String?
  createdAt     DateTime @default(now())
  role          UserRole @default(STUDENT)

  // Зв'язки
  profile         Profile?
  education       TutorEducation[]
  experiences     TutorExperience[]
  tutorSubjects   TutorSubject[]
  studentOrders   Order[]          @relation("StudentOrders")
  tutorOrders     Order[]          @relation("TutorOrders")
  sentMessages    Message[]
  studentReviews  Review[]         @relation("StudentReviews")
  tutorReviews    Review[]         @relation("TutorReviews")
}

model Profile {
  id          String   @id @default(uuid())
  userId      String   @unique
  bio         String?
  contactInfo String?
  phone       String?
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id])
}

model TutorEducation {
  id           String   @id @default(uuid())
  userId       String
  institution  String
  fieldOfStudy String
  degree       String
  startDate    DateTime
  endDate      DateTime?

  user         User     @relation(fields: [userId], references: [id])
}

model TutorExperience {
  id           String   @id @default(uuid())
  userId       String
  institution  String
  title        String
  startDate    DateTime
  endDate      DateTime?

  user         User     @relation(fields: [userId], references: [id])
}

model Subject {
  id            String   @id @default(uuid())
  name          String   @unique
  tutorSubjects TutorSubject[]
  orders        Order[]
}

model Category {
  id          String   @id @default(uuid())
  name        String   @unique
  isRecurring Boolean  @default(false)
  orders      Order[]
}

model TutorSubject {
  id         String   @id @default(uuid())
  tutorId    String
  subjectId  String
  hourlyRate Decimal

  tutor      User     @relation(fields: [tutorId], references: [id])
  subject    Subject  @relation(fields: [subjectId], references: [id])

  @@unique([tutorId, subjectId])
}

model Order {
  id                String   @id @default(uuid())
  studentId         String
  tutorId           String
  subjectId         String
  categoryId        String
  title             String
  description       String?
  createdAt         DateTime @default(now())
  status            String
  totalPrice        Decimal
  sessionsCount     Int
  sessionsCompleted Int      @default(0)

  // Зв'язки
  student    User     @relation("StudentOrders", fields: [studentId], references: [id])
  tutor      User     @relation("TutorOrders", fields: [tutorId], references: [id])
  subject    Subject  @relation(fields: [subjectId], references: [id])
  category   Category @relation(fields: [categoryId], references: [id])
  sessions   Session[]
  reviews    Review[]
  chat       Chat?
}

model Session {
  id             String   @id @default(uuid())
  orderId        String
  scheduledStart DateTime
  scheduledEnd   DateTime
  actualStart    DateTime?
  actualEnd      DateTime?
  status         String
  meetingLink    String?

  order          Order    @relation(fields: [orderId], references: [id])
}

model Review {
  id        String   @id @default(uuid())
  orderId   String
  studentId String
  tutorId   String
  rating    Int
  comment   String?
  createdAt DateTime @default(now())

  order     Order    @relation(fields: [orderId], references: [id])
  student   User     @relation("StudentReviews", fields: [studentId], references: [id])
  tutor     User     @relation("TutorReviews", fields: [tutorId], references: [id])
}

model Chat {
  id        String    @id @default(uuid())
  orderId   String    @unique
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  order     Order     @relation(fields: [orderId], references: [id])
  messages  Message[]
}

model Message {
  id        String   @id @default(uuid())
  chatId    String
  senderId  String
  content   String
  createdAt DateTime @default(now())
  isRead    Boolean  @default(false)

  chat      Chat     @relation(fields: [chatId], references: [id])
  sender    User     @relation(fields: [senderId], references: [id])
}
```

#### Ключові особливості схеми:

1. **Система ролей**:
   - Використання enum `UserRole` для розділення користувачів на студентів та репетиторів
   - Різні зв'язки для кожної ролі (наприклад, `studentOrders` та `tutorOrders`)

2. **Профілі користувачів**:
   - Базова інформація в моделі `User`
   - Додаткова інформація в моделі `Profile`
   - Спеціалізовані моделі для репетиторів (`TutorEducation`, `TutorExperience`)

3. **Система замовлень**:
   - Модель `Order` з'єднує студента та репетитора
   - Підтримка категорій (разові/повторювані замовлення)
   - Відстеження прогресу через `sessionsCount` та `sessionsCompleted`

4. **Система сесій**:
   - Планування через `scheduledStart` та `scheduledEnd`
   - Відстеження фактичного проведення через `actualStart` та `actualEnd`
   - Підтримка посилань на відеозустрічі

5. **Система комунікації**:
   - Чати прив'язані до замовлень
   - Відстеження статусу прочитання повідомлень
   - Timestamps для всіх повідомлень

6. **Система оцінювання**:
   - Відгуки прив'язані до замовлень
   - Двосторонній зв'язок між студентом та репетитором
   - Підтримка рейтингу та коментарів

7. **Предмети та категорії**:
   - Унікальні назви предметів
   - Гнучка система категорій з підтримкою повторюваних замовлень
   - Зв'язок репетиторів з предметами через `TutorSubject`

## Особливості реалізації
1. **Типобезпека**: Використання TypeScript та Prisma ORM забезпечує надійність коду
2. **Масштабованість**: Модульна архітектура дозволяє легко розширювати функціонал
3. **Безпека**: Інтеграція з Supabase для надійної автентифікації
4. **Real-time функціонал**: Використання Supabase для чатів та сповіщень
5. **Гнучкість**: Можливість легко додавати нові функції та інтегрувати додаткові сервіси

## Наступні кроки розвитку
1. Інтеграція системи оплати
2. Додавання календаря та системи нагадувань
3. Розробка системи рекомендацій
4. Додавання можливості групових занять
5. Інтеграція з відеоплатформами
6. Розробка мобільного додатку 