README.md
====

#### Authentication Regression Testing Checklist
- Working Sets
    - Social Media Login:
        1. Is Facebook login/logout correctly
        2. Is Google login/logout correctly
        3. Is LinkedIn login/logout correctly
        4. Is Twitter login/logout correctly
        5. Is Login from social network persistent between app restart
        6. Able to login from different accounts
    - Phylo Login
        1. Is login/logout correctly?
        2. Is localstorage persistent between app restart
        3. able to login from different accounts
- Error/Warning Sets
        1. No Internet Connection
        2. Empty form entry Warning
        3. Problem with Connection during registration process
        4. Conflict between cache and new login
- Edge Cases: Connection Problems
        1. New login into phylo database having same name as social network login