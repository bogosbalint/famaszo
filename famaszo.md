# Modellek
- Users
    - id
    - email
    - password
    - username
    - auth
    - Questions[]
    - created_at
    - updated_at
    - deleted_at = null
- Questions
    - id
    - question
    - answer
    - Users[]
    - created_at
    - updated_at
    - deleted_at = null
- Scores
    - id
    - value
    - username
    - created_at
    - updated_at
    - deleted_at = null    

# Igények
- Auth:
    - Bejelentkezés
    - Regisztráció
    - Profil
        - A user megnézheti a kérdéseit
    - Kijelentkezés

- Question menedzsment:
    - BREAD műveletek

- Scores:
    - pontszám hozzáadsa
    - pontszám kiolvasása