# Szkolny Sklepik

## Opis projektu
**Szkolny Sklepik** to zaawansowana aplikacja webowa do zarządzania produktami i kategoriami w ramach szkolnego sklepiku. Umożliwia użytkownikom przeglądanie produktów, dodawanie ich do koszyka, natomiast administratorzy mają dostęp do funkcji zarządzania systemem.

---

## Funkcjonalności

### Użytkownik:
- Rejestracja i logowanie.
- Przeglądanie produktów według kategorii.
- Dodawanie produktów do koszyka.

### Administrator:
- Zarządzanie produktami (dodawanie, edycja, usuwanie).
- Zarządzanie kategoriami produktów.

### Dodatkowe funkcje:
- Obsługa tematów: jasny i ciemny.
- Testowanie funkcjonalności aplikacji.
- Responsywność na różnych urządzeniach.

---

## Technologie
- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express
- **Baza danych**: MySQL

---

## Instalacja i konfiguracja

### Wymagania:
- Node.js i npm.
- MySQL.
- XAMPP (jeśli MySQL jest uruchamiany lokalnie).

### Instrukcja instalacji:
1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/ugin07/szkolny_sklepik.git
   ```
2. Przejdź do katalogu głównego projektu:
   ```bash
   cd szkolny_sklepik
   ```
3. Zainstaluj zależności dla backendu:
   ```bash
   cd server
   npm install
   ```
4. Zainstaluj zależności dla frontendu:
   ```bash
   cd ../client
   npm install
   ```
5. Skonfiguruj bazę danych MySQL:
   - Uruchom XAMPP i aktywuj moduł MySQL.
   - Zainicjalizuj strukturę bazy danych:
     ```bash
     node server/db/initialize.js
     ```

---

## Uruchomienie

1. Uruchom backend:
   ```bash
   npm run dev
   ```
   Backend działa na porcie **5000**.

2. Uruchom frontend:
   ```bash
   npm start
   ```
   Frontend działa na porcie **3000**.

3. Aby uruchomić oba jednocześnie, użyj:
   ```bash
   npm start
   ```

---

## Testowanie
1. Sprawdzenie funkcji rejestracji i logowania.
2. Przegląd produktów i dodawanie do koszyka.
4. Zarządzanie kategoriami i produktami (dla administratora).
5. Zmiana trybów (jasny i ciemny).
6. Responsywność na różnych urządzeniach.


---

## Autor
Projekt opracowany przez **Yevhena Malenko** jako część nauki zaawansowanych aplikacji webowych.

