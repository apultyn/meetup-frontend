# Meetup Planner

Frontend aplikacji do uzgadniania wspolnego terminu spotkania lub wyjazdu.

## Uruchomienie

Wymagany jest Node.js z `npm`.

```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
npm run build
```

## Obecny zakres

- Komponenty React dla logowania, panelu organizatora, tworzenia wydarzenia,
  dolaczania uczestnikow, edycji dostepnosci i wynikow.
- Tworca wydarzenia jest automatycznie dodawany jako uczestnik.
- Kazdy uczestnik ma prywatny `editToken` do edycji dostepnosci.
- Wyniki sa liczone po dolaczeniu kompletu uczestnikow i potwierdzeniu dat.
- Dlugosc wydarzenia jest skracana, jezeli nie da sie znalezc terminu o
  pierwotnej dlugosci.

Na tym etapie aplikacja korzysta z danych demonstracyjnych w `src/data/demo.js`.
