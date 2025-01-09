## Build Chirper with Inertia ReactJS

![laravel-chirps-react](https://raw.githubusercontent.com/balalii/laravel-chirps-react/refs/heads/main/public/assets/chrip.png)

## Usage

First,install dep:

```bash
php composer install
# and
npm install
```

Set Public Disk:

```bash
php artisan storage:link
```

Migrate db:

```bash
php artisan migrate:fresh --seed
```

Run development:

```bash
npm run dev
```

Run serve:

```bash
php artisan serve
```

Or artenatively, to run 3 concurrent task, to start `node development`, `artisan server` and `artisan queue:listen`  
you can use:

```bash
composer dev
```

Now you can accses app in: http://127.0.0.1:8000

Access account default:

```bash
# Admin
email: admin@localhost.com
password: 1234567890

# User
email: user@localhost.com
password: 1234567890
```

## Application reference

https://bootcamp.laravel.com/inertia/installation

## Application requirements

https://docs.google.com/spreadsheets/d/1INqqSmca0M0ILlAZe-QK-s5bpMq6l7JC1hy97dQC4sk/edit?gid=0#gid=0

## Contributor message

"Yang asal nyomot tanpa contrib skill issue" -dot-1x

"Yang asal nyomot bijinya besar sebelah" -balalii
