# Mind Forge - Огляд проекту

## Зміст
1. [Опис проекту](#опис-проекту)
2. [Технічний стек](#технічний-стек)
3. [Структура проекту](#структура-проекту)
4. [Налаштування середовища](#налаштування-середовища)
5. [Запуск проекту](#запуск-проекту)
6. [Розробка](#розробка)
7. [Тестування](#тестування)
8. [Деплой](#деплой)

## Опис проекту
Mind Forge - це платформа для поєднання студентів з репетиторами. Проект включає:
- Систему реєстрації та автентифікації
- Профілі користувачів (студенти та репетитори)
- Систему замовлень та сесій
- Систему відгуків та рейтингів
- Чат між користувачами
- Адміністративну панель

## Технічний стек
- **Backend:**
  - Node.js + TypeScript
  - Express.js
  - Prisma ORM
  - PostgreSQL
  - Supabase (автентифікація, чат)
  - Docker

- **Інструменти розробки:**
  - ESLint
  - Prettier
  - Jest
  - TypeScript
  - Git

## Структура проекту
```
mindforge-backend/
├── src/
│   ├── controllers/     # Контролери API
│   │   ├── base.controller.ts
│   │   ├── auth.controller.ts
│   │   ├── profile.controller.ts
│   │   ├── tutor.controller.ts
│   │   ├── order.controller.ts
│   │   ├── review.controller.ts
│   │   └── chat.controller.ts
│   │
│   ├── services/       # Бізнес-логіка
│   │   ├── auth.service.ts
│   │   ├── profile.service.ts
│   │   ├── tutor.service.ts
│   │   ├── order.service.ts
│   │   ├── review.service.ts
│   │   └── chat.service.ts
│   │
│   ├── repositories/   # Робота з БД
│   │   ├── user.repository.ts
│   │   ├── tutor.repository.ts
│   │   ├── order.repository.ts
│   │   └── review.repository.ts
│   │
│   ├── middlewares/    # Middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── types/         # Типи та інтерфейси
│   │   ├── user.types.ts
│   │   ├── order.types.ts
│   │   └── review.types.ts
│   │
│   ├── utils/         # Утиліти
│   │   ├── logger.ts
│   │   ├── pagination.ts
│   │   └── validation.ts
│   │
│   ├── config/        # Конфігурація
│   │   ├── database.ts
│   │   ├── supabase.ts
│   │   └── app.ts
│   │
│   └── app.ts         # Точка входу
│
├── prisma/            # Схема бази даних
│   ├── schema.prisma
│   └── migrations/
│
├── tests/            # Тести
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docker/           # Docker конфігурація
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── scripts/          # Скрипти
│   ├── setup.sh
│   └── seed.ts
│
├── .env.example      # Приклад змінних середовища
├── .eslintrc.js     # Конфігурація ESLint
├── .prettierrc      # Конфігурація Prettier
├── package.json     # Залежності
├── tsconfig.json    # Конфігурація TypeScript
└── README.md        # Документація
```

## Налаштування середовища

### Вимоги
- Node.js 18+
- PostgreSQL 14+
- Docker та Docker Compose (опціонально)
- Git

### Змінні середовища
Створіть файл `.env` на основі `.env.example`:
```env
# База даних
DATABASE_URL="postgresql://user:password@localhost:5432/mindforge"

# Supabase
SUPABASE_URL="your-supabase-url"
SUPABASE_KEY="your-supabase-key"

# JWT
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"

# Сервер
PORT=3000
NODE_ENV=development

# Крос-доменні запити
CORS_ORIGIN="http://localhost:3000"
```

## Запуск проекту

### Локальний запуск

1. Встановлення залежностей:
```bash
npm install
```

2. Налаштування бази даних:
```bash
# Створення міграцій
npx prisma migrate dev

# Заповнення тестовими даними (опціонально)
npm run seed
```

3. Запуск сервера:
```bash
# Розробка
npm run dev

# Продакшн
npm run build
npm start
```

### Запуск через Docker

1. Збірка та запуск контейнерів:
```bash
# Збірка
docker-compose build

# Запуск
docker-compose up -d
```

2. Застосування міграцій в контейнері:
```bash
docker-compose exec api npx prisma migrate deploy
```

3. Заповнення тестовими даними (опціонально):
```bash
docker-compose exec api npm run seed
```

## Розробка

### Команди
```bash
# Розробка
npm run dev

# Збірка
npm run build

# Лінтінг
npm run lint

# Форматування коду
npm run format

# Перевірка типів
npm run type-check
```

### Git Workflow
1. Створення нової гілки для задачі:
```bash
git checkout -b feature/task-name
```

2. Коміт змін:
```bash
git add .
git commit -m "feat: опис змін"
```

3. Пуш змін:
```bash
git push origin feature/task-name
```

4. Створення Pull Request

### Код стайл
- Використовуємо ESLint та Prettier
- Коміти відповідають Conventional Commits
- Типізація через TypeScript
- Документація через JSDoc

## Тестування та Документація

### Обов'язки розробника
Розробник відповідає тільки за:
1. Написання чистого, типізованого коду:
   - Чітке розділення відповідальності (сервіси, операції, контролери)
   - Правильна обробка помилок
   - Типізація всіх даних
   - Дотримання архітектурних принципів

2. Створення Pull Request з:
   - Описом змін в коді
   - Поясненням логіки роботи
   - Прикладами використання нової функціональності

### Обов'язки QA/DevOps
QA/DevOps команда відповідає за:
1. Тестування:
   - Написання всіх типів тестів
   - Налаштування тестового середовища
   - Аналіз покриття
   - Підтримка тестів

2. Документація для тестування:
   - Створення тест-кейсів
   - Опис тестових сценаріїв
   - Документація тестового середовища
   - Ведення тестової документації

### Обов'язки Технічного Письменника
Технічний письменник відповідає за:
1. Документацію API:
   - Опис ендпоінтів
   - Приклади запитів/відповідей
   - Опис помилок
   - Swagger/OpenAPI специфікація

2. Документацію для розробників:
   - Архітектурна документація
   - Інструкції з налаштування
   - Опис процесів розробки
   - Оновлення README

3. Документацію для користувачів:
   - Інструкції з використання
   - Опис функціональності
   - FAQ
   - Troubleshooting

### Процес розробки для розробника
1. Розробка функціональності:
   ```typescript
   // services/tutor.service.ts
   export class TutorService {
     async getTutorProfile(tutorId: string): Promise<TutorProfile> {
       // Реалізація бізнес-логіки
     }
   }
   ```

2. Створення Pull Request:
   ```markdown
   ## Опис змін
   Додано метод отримання профілю репетитора

   ## Логіка роботи
   - Перевірка існування репетитора
   - Отримання базової інформації
   - Отримання пов'язаних даних (відгуки, предмети)

   ## Приклад використання
   ```typescript
   const profile = await tutorService.getTutorProfile('123');
   ```
   ```

### Важливо для розробника
- Не потрібно писати тести
- Не потрібно писати документацію API
- Не потрібно оновлювати README
- Не потрібно створювати Swagger/OpenAPI специфікацію
- Не потрібно писати інструкції для користувачів

Всі аспекти тестування та документації будуть виконані відповідними командами після передачі коду.

## Деплой

### Обов'язки розробника
Розробник відповідає за:
1. Підготовку коду до деплою:
   - Коректне форматування коду
   - Відсутність помилок лінтера
   - Проходження всіх unit-тестів
   - Оновлення документації API

2. Надання необхідної інформації:
   - Опис змін в коді
   - Необхідні змінні середовища
   - Залежності від інших сервісів
   - Міграції бази даних

### Обов'язки DevOps
DevOps команда відповідає за:
1. Налаштування CI/CD:
   - Автоматична збірка
   - Запуск тестів
   - Деплой на різні середовища

2. Інфраструктуру:
   - Налаштування серверів
   - Конфігурація Docker
   - Налаштування моніторингу
   - Налаштування логування

3. Безпеку:
   - SSL сертифікати
   - Firewall
   - Rate limiting
   - Безпечне зберігання секретів

### Процес деплою для розробника
1. Підготовка коду:
   ```bash
   # Перевірка коду
   npm run lint
   npm run test:unit
   npm run type-check

   # Збірка
   npm run build
   ```

2. Створення Pull Request з:
   - Описом змін
   - Оновленою документацією
   - Інформацією про міграції
   - Необхідними змінними середовища

3. Очікування рев'ю та затвердження

### Важливо для розробника
- Не потрібно налаштовувати CI/CD
- Не потрібно налаштовувати сервери
- Не потрібно налаштовувати моніторинг
- Не потрібно налаштовувати безпеку

Всі ці аспекти будуть налаштовані DevOps командою після передачі проекту.

## Додаткова інформація

### Корисні посилання
- [Документація Prisma](https://www.prisma.io/docs)
- [Документація Express](https://expressjs.com/)
- [Документація Supabase](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Контакти
- Технічний лідер: [контакти]
- DevOps інженер: [контакти]
- Команда розробки: [контакти]

### Ліцензія
MIT License 

## Архітектурний підхід

### Шарова архітектура
Проект використовує шаровану архітектуру з чітким розділенням відповідальності:

1. **Сервісний шар** (services/)
   - Містить бізнес-логіку
   - Незалежний від HTTP/API
   - Може бути перевикористаний в різних контекстах
   - Приклад структури:
   ```typescript
   // services/tutor.service.ts
   export class TutorService {
     constructor(
       private tutorRepository: TutorRepository,
       private reviewService: ReviewService
     ) {}

     async getTutorProfile(tutorId: string): Promise<TutorProfile> {
       // Бізнес-логіка отримання профілю
     }

     async updateTutorSubjects(tutorId: string, subjects: Subject[]): Promise<void> {
       // Бізнес-логіка оновлення предметів
     }
   }
   ```

2. **Операційний шар** (operations/)
   - Об'єднує сервіси для виконання конкретних операцій
   - Обробляє валідацію вхідних даних
   - Керує транзакціями
   - Приклад структури:
   ```typescript
   // operations/tutor/get-tutor-profile.operation.ts
   export class GetTutorProfileOperation {
     constructor(
       private tutorService: TutorService,
       private validationService: ValidationService
     ) {}

     async execute(params: GetTutorProfileParams): Promise<OperationResult<TutorProfile>> {
       // Валідація параметрів
       // Виклик сервісів
       // Обробка помилок
       // Форматування результату
     }
   }
   ```

3. **Контролерний шар** (controllers/)
   - Обробляє HTTP запити
   - Використовує операції
   - Форматує HTTP відповіді
   - Приклад структури:
   ```typescript
   // controllers/tutor.controller.ts
   export class TutorController extends BaseController {
     constructor(
       private getTutorProfileOperation: GetTutorProfileOperation
     ) {
       super();
     }

     async getProfile(req: Request, res: Response): Promise<void> {
       const result = await this.getTutorProfileOperation.execute({
         tutorId: req.params.id,
         includeReviews: req.query.includeReviews === 'true'
       });

       this.sendResponse(res, result);
     }
   }
   ```

### Переваги такого підходу

1. **Модульність**
   - Сервіси можна тестувати і використовувати незалежно
   - Операції можна перевикористовувати в різних ендпоінтах
   - Легко додавати нову функціональність

2. **Тестованість**
   - Сервіси тестуються без HTTP контексту
   - Операції тестуються з мокованими сервісами
   - Контролери тестуються з мокованими операціями

3. **Підтримка**
   - Чітке розділення відповідальності
   - Легко знаходити і виправляти помилки
   - Просто додавати нові функції

4. **Масштабованість**
   - Можливість горизонтального масштабування
   - Легке додавання нових ендпоінтів
   - Просте розширення функціональності

### Приклад розробки нової функції

1. **Спочатку сервіс**
   ```typescript
   // services/review.service.ts
   export class ReviewService {
     async createReview(data: CreateReviewData): Promise<Review> {
       // Бізнес-логіка створення відгуку
     }
   }
   ```

2. **Потім операція**
   ```typescript
   // operations/review/create-review.operation.ts
   export class CreateReviewOperation {
     async execute(params: CreateReviewParams): Promise<OperationResult<Review>> {
       // Валідація
       // Виклик сервісу
       // Обробка помилок
     }
   }
   ```

3. **В кінці ендпоінт**
   ```typescript
   // controllers/review.controller.ts
   export class ReviewController extends BaseController {
     async createReview(req: Request, res: Response): Promise<void> {
       const result = await this.createReviewOperation.execute({
         orderId: req.params.orderId,
         data: req.body
       });
       this.sendResponse(res, result);
     }
   }
   ```

### Правила розробки

1. **Сервіси**
   - Містять тільки бізнес-логіку
   - Не залежать від HTTP/API
   - Можуть використовувати інші сервіси
   - Повертають доменні об'єкти

2. **Операції**
   - Об'єднують сервіси
   - Валідують вхідні дані
   - Керують транзакціями
   - Обробляють помилки
   - Повертають OperationResult

3. **Контролери**
   - Тільки HTTP логіка
   - Використовують операції
   - Форматують відповіді
   - Обробляють HTTP помилки

### Типові помилки

1. **Поміщення бізнес-логіки в контролери**
   ```typescript
   // ❌ Погано
   class TutorController {
     async updateProfile(req: Request, res: Response) {
       const tutor = await prisma.tutor.update({...});
       const reviews = await prisma.review.findMany({...});
       // Бізнес-логіка в контролері
     }
   }

   // ✅ Добре
   class TutorService {
     async updateProfile(data: UpdateProfileData) {
       // Бізнес-логіка в сервісі
     }
   }
   ```

2. **Пряме використання репозиторіїв в контролерах**
   ```typescript
   // ❌ Погано
   class OrderController {
     async createOrder(req: Request) {
       const order = await this.orderRepository.create({...});
     }
   }

   // ✅ Добре
   class CreateOrderOperation {
     async execute(params: CreateOrderParams) {
       const order = await this.orderService.createOrder(params);
     }
   }
   ``` 