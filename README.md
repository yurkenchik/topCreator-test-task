# TopCreator Test Task

## Опис проекту

Цей проект є прикладом використання Express.js, MongoDB та TypeScript для створення простого серверного застосунку. Проект включає налаштування для форматування коду за допомогою Prettier та підтримку оточення через `.env` файл.

## Необхідні вимоги

Перед запуском проекту переконайтеся, що у вас встановлено:

- **Node.js** (версія 18.0.0 або новіша)
- **yarn**
- **MongoDB** (локальний або віддалений екземпляр для зберігання даних)

## Налаштування проекту

### 1. Клонування репозиторію

```bash
git clone <URL_вашого_репозиторію>
cd topcreator-test-task

### Кроки:
1. **Опис проекту** – розповідає про що цей проект.
2. **Необхідні вимоги** – які інструменти необхідно мати встановленими для роботи з проектом.
3. **Налаштування проекту** – клонування репозиторію, встановлення залежностей, та налаштування змінних середовища.
4. **Команди для запуску** – пояснює як запускати проект у режимі розробки та як використовувати Prettier для форматування коду.
5. **Збирання TypeScript** – необов’язкова частина, якщо вам потрібно скомпілювати TypeScript у JavaScript для продакшену.
6. **Використані технології** – перелік основних інструментів, які використовуються в проекті.

Available Scripts
In the project directory, you can run the following scripts:

npm run start:dev
Runs the server in development mode using ts-node to execute TypeScript files directly.

npm run build
Compiles the TypeScript files into JavaScript. The output will be located in the dist folder.

npm run start
Runs the compiled JavaScript server from the dist folder. Make sure to run npm run build before this.